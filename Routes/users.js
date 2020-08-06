/* eslint-disable no-shadow */
const express = require('express');

const router = express.Router();
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Users = require('../Models/Users');
const register = require('../Function/register');
const login = require('../Function/login');
const verifyToken = require('../Function/verifyJwtToken');
const TypesOfRoles = require('../Models/TypesOfRoles');
const Subjects = require('../Models/Subjects');
const Topics = require('../Models/Topics');
const SubTopics = require('../Models/SubTopics');

router.get('/loginToken', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ Message: 'Create', authData });
    }
  });
});

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
  (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.send({ Error: error });
    } else {
      Users.findOne({ where: { name: req.body.userName } })
        .then((users) => {
          if (users == null) {
            res.json({ Komunikat: 'Użytkownik nie istnieje!' });
          } else {
            login(res, req.body.userPassword, users.password, users.publicId, users.name,
              users.id_role);
          }
        })
        .catch((err) => res.json({ err }));
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
  (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.send({ Error: error });
    } else {
      Users.findOne({ where: { name: req.body.userName } })
        .then((users) => {
          if (users == null) {
            Users.findOne({ where: { email: req.body.userEmail } })
              .then((users) => {
                if (users == null) {
                  TypesOfRoles.findOne({ where: { name: req.body.userRole } })
                    .then((users) => {
                      register(res, Users, req.body.userName, req.body.userPassword,
                        req.body.userEmail, users.id);
                    });
                } else {
                  res.json({ Komunikat: 'Podanym e-mail jest już przypisany do użytkownika!' });
                }
              })
              .catch((err) => res.json({ err }));
          } else {
            res.json({ Komunikat: 'Użytkownik o podanej nazwie już istnieje!' });
          }
        })
        .catch((err) => res.json({ err }));
    }
  });

router.get('/takeListOfSubject', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Users.findOne({ where: { publicId: authData.publicId, name: authData.name } })
        .then((users) => {
          if (users !== null) {
            Subjects.findAll({ attributes: ['name'] })
              .then((subjects) => {
                res.json(subjects);
              })
              .catch((err) => res.json({ err }));
          } else {
            res.json({ Komunikat: 'Użytkownik nie istnieje!' });
          }
        });
    }
  });
});

router.get('/takeListOfTopics', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Users.findOne({ where: { publicId: authData.publicId, name: authData.name } })
        .then((users) => {
          if (users !== null) {
            Topics.findAll({ attributes: ['name'] })
              .then((topics) => {
                res.json(topics);
              })
              .catch((err) => res.json({ err }));
          } else {
            res.json({ Komunikat: 'Użytkownik nie istnieje!' });
          }
        });
    }
  });
});

router.get('/takeListOfSubTopics', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Users.findOne({ where: { publicId: authData.publicId, name: authData.name } })
        .then((users) => {
          if (users !== null) {
            SubTopics.findAll({ attributes: ['name'] })
              .then((subTopics) => {
                res.json(subTopics);
              })
              .catch((err) => res.json({ err }));
          } else {
            res.json({ Komunikat: 'Użytkownik nie istnieje!' });
          }
        });
    }
  });
});

module.exports = router;
