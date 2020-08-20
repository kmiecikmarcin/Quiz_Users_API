/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-shadow */
const express = require('express');

const router = express.Router();
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const Users = require('../Models/Users');
const register = require('../Function/register');
const checkUserEmail = require('../Function/checkUserEmail');
const TypesOfRoles = require('../Models/TypesOfRoles');
const login = require('../Function/login');
const checkTypeOfRole = require('../Function/checkUserRole');

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
      const nameRole = await TypesOfRoles.findOne({ where: { id_role: user.id_role } });
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
          throw new Error('Hasła sa różne!');
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
      res.stauts(400).json({ Error: error });
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

module.exports = router;
