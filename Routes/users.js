/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-shadow */
const express = require('express');

const router = express.Router();
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Users = require('../Models/Users');
const TypesOfRoles = require('../Models/TypesOfRoles');
const register = require('../Function/register');
const checkUserEmail = require('../Function/checkUserEmail');
const login = require('../Function/login');
const checkTypeOfRole = require('../Function/checkUserRole');
const verifyToken = require('../Function/verifyJwtToken');
const findUserById = require('../Function/findUserById');
const deleteUserAccount = require('../Function/deleteUserAccount');
const changeUserPassword = require('../Function/changeUserPassword');
const changeUserEmailAdress = require('../Function/changeUserEmailAdress');
const sendEmailToUserWithPassword = require('../Function/sendEmailToUserWithPassword');

router.post('/login',
  [
    check('userEmail')
      .exists()
      .notEmpty()
      .isEmail()
      .isLength({ min: 4 })
      .trim(),
    check('userPassword')
      .exists()
      .notEmpty()
      .isLength({ min: 6 })
      .trim(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      const user = await checkUserEmail(Users, req.body.userEmail);
      if (user === null) { res.status(404).json({ Error: 'Użytkownik nie istnieje!' }); return; }
      const nameRole = await TypesOfRoles.findOne({ where: { id_role: user.id_role } });
      if (nameRole === null) { res.status(404).json({ Error: 'Ta role użytkownika nie istnieje!' }); return; }

      login(res, req.body.userPassword, user.password, user.id,
        user.id_role, nameRole.name);
    }
  });

router.post('/register',
  [
    check('userEmail')
      .exists()
      .notEmpty()
      .isEmail()
      .trim()
      .isLength({ min: 4 })
      .isLowercase(),
    check('userPassword', 'checkUserPassword')
      .exists()
      .notEmpty()
      .isLength({ min: 6, max: 16 })
      .custom((value, { req }) => {
        if (value !== req.body.checkUserPassword) {
          throw new Error('Passwords are different');
        } else {
          return value;
        }
      })
      .trim(),
    check('userRole')
      .exists()
      .notEmpty()
      .trim()
      .equals('Uczeń'),
  ],
  async function (req, res) {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    }
    const email = await checkUserEmail(Users, req.body.userEmail);
    if (email !== null) { res.status(400).json({ Error: 'Użytkownik z tym loginem już istnieje!' }); return; }

    const typeOfRole = await checkTypeOfRole(TypesOfRoles, req.body.userRole);
    const result = await register(res, Users, req.body.userEmail, req.body.userPassword,
      typeOfRole.id);
    if (result) {
      res.status(201).json({ Message: 'Rejestracja przebiegła pomyślnie!' });
    } else {
      res.status(400).json({ Error: 'Rejestracja nie powiodła się!' });
    }
  });

router.delete('/deleteAccount',
  [
    check('userPassword', 'checkUserPassword')
      .exists()
      .notEmpty()
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.checkUserPassword) {
          throw new Error('Hasła sa różne!');
        } else {
          return value;
        }
      })
      .trim(),
  ],
  verifyToken, (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(400).json({ Error: 'Użytkownik nie istnieje!' }); return; }

          const deleteAccount = await deleteUserAccount(Users, authData);
          if (deleteAccount) {
            res.status(201).json({ Message: 'Konto zostało usunięte!' });
            return;
          }
          res.status(400).json({ Error: 'Coś poszło nie tak!' });
        }
      });
    }
  });

router.put('/changePassword',
  [
    check('oldUserPassword')
      .exists()
      .notEmpty()
      .isLength({ min: 6 })
      .trim(),
    check('newUserPassword', 'checkNewUserPassword')
      .exists()
      .notEmpty()
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.checkNewUserPassword) {
          throw new Error('Hasła są różne!');
        } else {
          return value;
        }
      })
      .trim(),
  ],
  verifyToken, (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(400).json({ Error: 'Użytkownik nie istnieje!' }); return; }

          const changePassword = await changeUserPassword(Users, user, req.body.oldUserPassword,
            req.body.newUserPassword);
          if (changePassword) {
            res.status(201).json({ Message: 'Hasło zostało zmienione!' });
            return;
          } if (changePassword === false) {
            res.status(400).json({ Error: 'Stare hasło jest nieprawidłowe' });
            return;
          }
          res.status(400).json({ Error: 'Coś poszło nie tak!' });
        }
      });
    }
  });

router.put('/changeEmailAdress',
  [
    check('oldUserEmailAdress')
      .exists()
      .notEmpty()
      .isEmail()
      .trim()
      .isLength({ min: 4 })
      .isLowercase(),
    check('newUserEmailAdress')
      .exists()
      .notEmpty()
      .isEmail()
      .trim()
      .isLength({ min: 4 })
      .isLowercase(),
    check('userPassword', 'checkUserPassword')
      .exists()
      .notEmpty()
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.checkUserPassword) {
          throw new Error('Passwords are different');
        } else {
          return value;
        }
      })
      .trim(),
  ],
  verifyToken, (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(400).json({ Error: 'Użytkownik nie istnieje!' }); return; }

          const changeEmail = await changeUserEmailAdress(Users, user, req.body.oldUserEmailAdress,
            req.body.newUserEmailAdress, req.body.userPassword);
          if (changeEmail) {
            res.status(201).json({ Message: 'Email został zmieniony!' });
            return;
          } if (changeEmail === false) {
            res.status(400).json({ Error: 'Hasło jest niepoprawne!' });
            return;
          }
          res.status(400).json({ Error: 'Coś poszło nie tak!' });
        }
      });
    }
  });

router.post('/forgotPassword',
  [
    check('userEmail')
      .exists()
      .notEmpty()
      .isEmail()
      .trim()
      .isLength({ min: 4 })
      .isLowercase(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      const sendEmail = await sendEmailToUserWithPassword(Users, req.body.userEmail);
      if (sendEmail == null) {
        res.status(400).json({ Error: 'Użytkownik nie istnieje!' });
        return;
      } if (sendEmail === true) {
        res.status(200).json({ Message: 'Email został wysłany!' });
        return;
      }
      res.status(404).json({ Error: 'Coś poszło nie tak!' });
    }
  });

module.exports = router;
