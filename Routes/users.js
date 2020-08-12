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
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.send({ Error: error });
    }
    const user = await checkUserName(Users, req.body.userName);
    if (user !== null) { res.json({ Resposne: 'User with this nickname exists!'}); }
    const email = await checkUserEmail(Users, req.body.userEmail);
    if (email !== null) { res.json({ Resposne: 'User with this email exists!'}); }
    const typeOfRole = await checkTypeOfRole(TypesOfRoles, req.body.userRole);
    const result = await register(res, Users, req.body.userName, req.body.userPassword,
      req.body.userEmail, typeOfRole.id);
    res.json(result);
  });

module.exports = router;
