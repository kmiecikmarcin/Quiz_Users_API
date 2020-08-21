/* eslint-disable no-useless-return */
/* eslint-disable newline-per-chained-call */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Users = require('../Models/Users');
const verifyToken = require('../Function/verifyJwtToken');
const findUserByIdAndEmail = require('../Function/findUserByIdAndEmail');
const addNewTypeOfUserRole = require('../Function/addNewTypeOfUserRole');
const TypesOfRoles = require('../Models/TypesOfRoles');

router.post('/addNewTypeOfRole',
  [
    check('typeOfRole')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
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

          const addRole = await addNewTypeOfUserRole(TypesOfRoles, req.body.typeOfRole, user);
          if (addRole) {
            res.status(201).json({ Message: 'New type of user role created!' });
            return;
          } if (addRole === false) {
            res.status(400).json({ Message: 'You dont have permission!' });
            return;
          }
          res.status(400).json({ Message: 'Something went wrong!' });
        }
      });
    }
  });

router.delete('/deleteRepetitory',
  [
    check('subTopicName')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
      .trim(),
    check('titleOfRepetitory')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
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
        }
      });
    }
  });

router.delete('/deleteSubtopic',
  [
    check('subTopicName')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
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
        }
      });
    }
  });

router.delete('/deleteTopic',
  [
    check('topicName')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
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
        }
      });
    }
  });

router.delete('/deleteQuestion',
  [
    check('topicName')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
      .trim(),
    check('question')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
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
        }
      });
    }
  });

module.exports = router;
