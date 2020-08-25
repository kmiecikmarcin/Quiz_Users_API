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
const findUserByIdAndEmail = require('../Function/findUserByIdAndEmail');
const deleteUserAccount = require('../Function/deleteUserAccount');
const changeUserPassword = require('../Function/changeUserPassword');

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
      res.status(400).json({ Error: error });
    } else {
      const user = await checkUserEmail(Users, req.body.userEmail);
      if (user === null) { res.status(404).json({ Error: 'User doesnt exists!' }); return; }
      const nameRole = await TypesOfRoles.findOne({ where: { id_role: user.id_role } });
      if (nameRole === null) { res.status(404).json({ Error: 'This role doesnt exists!' }); return; }

      login(res, req.body.userPassword, user.password, user.id,
        user.email, user.id_role, nameRole.name);
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
      .isLength({ min: 6 })
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
      res.status(400).json({ Error: error });
    }
    const email = await checkUserEmail(Users, req.body.userEmail);
    if (email !== null) { res.status(400).json({ Error: 'Users with this email exists!' }); return; }

    const typeOfRole = await checkTypeOfRole(TypesOfRoles, req.body.userRole);
    const result = await register(res, Users, req.body.userEmail, req.body.userPassword,
      typeOfRole.id);
    if (result) {
      res.status(201).json({ Message: 'Registration successful!' });
    } else {
      res.status(400).json({ Message: 'Registration process failed' });
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
      res.status(400).json({ Error: error });
    } else {
      jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserByIdAndEmail(Users, authData);
          if (user === null) { res.status(400).json({ Error: 'User doesnt exists!' }); return; }

          const deleteAccount = await deleteUserAccount(Users, authData);
          if (deleteAccount) {
            res.status(201).json({ Message: 'Account deleted!' });
            return;
          }
          res.status(400).json({ Message: 'Something went wrong!' });
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
          throw new Error('Passwords are different!');
        } else {
          return value;
        }
      })
      .trim(),
  ],
  verifyToken, (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ Error: error });
    } else {
      jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserByIdAndEmail(Users, authData);
          if (user === null) { res.status(400).json({ Error: 'User doesnt exists!' }); return; }

          const changePassword = await changeUserPassword(Users, user, req.body.oldUserPassword,
            req.body.newUserPassword);
          if (changePassword) {
            res.status(201).json({ Message: 'Password changed!' });
            return;
          } if (changePassword === false) {
            res.status(400).json({ Message: 'Old password is incorrect' });
            return;
          }
          res.status(400).json({ Message: 'Something went wrong!' });
        }
      });
    }
  });

module.exports = router;
