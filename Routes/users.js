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
      .isString()
      .isLength({ min: 4, max: 20 })
      .isAlphanumeric()
      .trim(),

    check('userPassword', 'checkUserPassword')
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
      res.send({ Error: error });
    } else {
      const user = await checkUserName(Users, req.body.userName);
      login(res, req.body.userPassword, user.password, user.id,
        user.name, user.id_role);
    }
  });

router.post('/register',
  [
    check('userName')
      .isLength({ min: 4, max: 20 })
      .trim(),

    check('userPassword', 'checkUserPassword')
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
      .isEmail()
      .trim()
      .isLength({ min: 4 })
      .isLowercase(),

    check('userRole')
      .trim()
      .equals('Uczeń'),
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.send({ Error: error });
    } else {
      await checkUserName(Users, req.body.userName);
      await checkUserEmail(Users, req.body.userEmail);
      const typeOfRole = await checkTypeOfRole(TypesOfRoles, req.body.userRole);
      register(res, Users, req.body.userName, req.body.userPassword,
        req.body.userEmail, typeOfRole.id);
    }
  });

module.exports = router;
