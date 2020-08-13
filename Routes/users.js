/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-shadow */
const express = require('express');

const router = express.Router();
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const Users = require('../Models/Users');
const register = require('../Function/register');
const checkUserName = require('../Function/checkUserName');
const checkUserEmail = require('../Function/checkUserEmail');
const TypesOfRoles = require('../Models/TypesOfRoles');
const login = require('../Function/login');
const checkTypeOfRole = require('../Function/checkUserRole');

router.post('/login',
  [
    check('userName')
      .exists()
      .notEmpty()
      .isLength({ min: 4, max: 20 })
      .isAlphanumeric()
      .trim(),
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
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ Error: error });
    } else {
      const user = await checkUserName(Users, req.body.userName);
      login(res, req.body.userPassword, user.password, user.id,
        user.name, user.id_role);
    }
  });

router.post('/register',
  [
    check('userName')
      .exists()
      .notEmpty()
      .isLength({ min: 4, max: 20 })
      .trim(),

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

    check('userEmail')
      .exists()
      .notEmpty()
      .isEmail()
      .trim()
      .isLength({ min: 4 })
      .isLowercase(),

    check('userRole')
      .exists()
      .notEmpty()
      .trim()
      .equals('Uczeń'),
  ],
  async function (req, res) {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.stauts(400).json({ Error: error });
    }
    const user = await checkUserName(Users, req.body.userName);
    if (user !== null) { res.status(400).json({ Error: 'Users with this nickname exists!' }); return; }
    const email = await checkUserEmail(Users, req.body.userEmail);
    if (email !== null) { res.status(400).json({ Error: 'Users with this email exists!' }); return; }

    const typeOfRole = await checkTypeOfRole(TypesOfRoles, req.body.userRole);
    const result = await register(res, Users, req.body.userName, req.body.userPassword,
      req.body.userEmail, typeOfRole.id);
    if (result) {
      res.status(201).json({ Message: 'Registration successful!' });
    } else {
      res.status(400).json({ Message: 'Registration process failed' });
    }
  });

module.exports = router;
