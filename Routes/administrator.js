/* eslint-disable no-useless-return */
/* eslint-disable newline-per-chained-call */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Users = require('../Models/Users');
const TypesOfRoles = require('../Models/TypesOfRoles');
const SubTopics = require('../Models/SubTopics');
const Repetitory = require('../Models/Repetitory');
const Topics = require('../Models/Topics');
const Questions = require('../Models/Questions');
const verifyToken = require('../Function/verifyJwtToken');
const findUserById = require('../Function/findUserById');
const addNewTypeOfUserRole = require('../Function/addNewTypeOfUserRole');
const findSubTopicByName = require('../Function/findSubTopicByName');
const deleteRepetitory = require('../Function/deleteRepetitory');
const deleteSubTopic = require('../Function/deleteSubTopic');
const checkTopicByName = require('../Function/checkTopicByName');
const deleteTopic = require('../Function/deleteTopic');
const deleteQuestion = require('../Function/deleteQuestion');

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
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(400).json({ Error: 'User doesnt exists!' }); return; }

          const addRole = await addNewTypeOfUserRole(TypesOfRoles, req.body.typeOfRole, user);
          if (addRole) {
            res.status(201).json({ Message: 'New type of user role created!' });
            return;
          } if (addRole === false) {
            res.status(400).json({ Error: 'You dont have permission!' });
            return;
          }
          res.status(400).json({ Error: 'Something went wrong!' });
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
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(400).json({ Error: 'User doesnt exists!' }); return; }
          const subTopic = await findSubTopicByName(SubTopics, req.body.subTopicName);
          if (subTopic === null) { res.status(404).json({ Error: 'Subtopic doesnt exists!' }); return; }

          const result = await deleteRepetitory(Repetitory, req.body.titleOfRepetitory,
            user, subTopic);
          if (result) {
            res.status(201).json({ Message: 'Repetitory deleted!' });
            return;
          } if (result === false) {
            res.status(400).json({ Error: 'You dont have permission!' });
            return;
          }
          res.status(400).json({ Error: 'Something went wrong!' });
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
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(400).json({ Error: 'User doesnt exists!' }); return; }
          const subTopic = await findSubTopicByName(SubTopics, req.body.subTopicName);
          if (subTopic === null) { res.status(404).json({ Error: 'Subtopic doesnt exists!' }); return; }

          const result = await deleteSubTopic(SubTopics, req.body.subTopicName, user);
          if (result) {
            res.status(201).json({ Message: 'Subtopic deleted!' });
            return;
          } if (result === false) {
            res.status(400).json({ Error: 'You dont have permission!' });
            return;
          }
          res.status(400).json({ Error: 'Something went wrong!' });
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
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(400).json({ Error: 'User doesnt exists!' }); return; }
          const topic = await checkTopicByName(Topics, req.body.topicName);
          if (topic === null) { res.status(400).json({ Error: 'Topic doesnt exists!' }); return; }

          const result = await deleteTopic(Topics, req.body.topicName, user);
          if (result) {
            res.status(201).json({ Message: 'Topic deleted!' });
            return;
          } if (result === false) {
            res.status(400).json({ Error: 'You dont have permission!' });
            return;
          }
          res.status(400).json({ Error: 'Something went wrong!' });
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
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(400).json({ Error: 'User doesnt exists!' }); return; }
          const topic = await checkTopicByName(Topics, req.body.topicName);
          if (topic === null) { res.status(400).json({ Error: 'Topic doesnt exists!' }); return; }

          const result = await deleteQuestion(Questions, req.body.topicName, req.body.question,
            user);
          if (result) {
            res.status(201).json({ Message: 'Question deleted!' });
            return;
          } if (result === false) {
            res.status(400).json({ Error: 'You dont have permission!' });
            return;
          }
          res.status(400).json({ Error: 'Something went wrong!' });
        }
      });
    }
  });

module.exports = router;
