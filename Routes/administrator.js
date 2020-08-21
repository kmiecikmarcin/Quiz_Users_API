/* eslint-disable no-useless-return */
/* eslint-disable newline-per-chained-call */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Users = require('../Models/Users');
const verifyToken = require('../Function/verifyJwtToken');
const findUserByIdAndEmail = require('../Function/findUserByIdAndEmail');

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
        }
      });
    }
  });

router.delete('/deleteRepetitory',
  [

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
