/* eslint-disable newline-per-chained-call */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Users = require('../Models/Users');
const Subjects = require('../Models/Subjects');
const Topics = require('../Models/Topics');
const SubTopics = require('../Models/SubTopics');
const Repetitory = require('../Models/Repetitory');
const verifyToken = require('../Function/verifyJwtToken');
const findAllSubjects = require('../Function/findAllSubjects');
const findUserByIdAndName = require('../Function/findUserByIdAndName');
const findAllTopics = require('../Function/findAllTopics');
const findAllSubTopics = require('../Function/findAllSubTopics');
const findSubjectByName = require('../Function/findSubjectByName');
const addNewTopic = require('../Function/addNewTopic');
const updateTopicName = require('../Function/updateTopicName');
const addNewSubTopic = require('../Function/addNewSubTopic');
const updateSubTopicName = require('../Function/updateSubTopicName');
const findSubTopicByName = require('../Function/findSubTopicByName');
const addNewRepetitory = require('../Function/addNewRepetitory');

router.get('/takeListOfSubject', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user = await findUserByIdAndName(Users, authData);
      if (user === null) { res.status(404).json({ Error: 'User doesnt exists!' }); }

      const subjects = await findAllSubjects(Subjects);
      if (subjects) {
        res.status(200).json(subjects);
      } else {
        res.status(400).json({ Message: 'Something went wrong!' });
      }
    }
  });
});

router.get('/takeListOfTopics', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user = await findUserByIdAndName(Users, authData);
      if (user === null) { res.status(404).json({ Error: 'User doesnt exists!' }); }

      const topics = await findAllTopics(Topics);
      if (topics) {
        res.status(200).json(topics);
      } else {
        res.status(400).json({ Message: 'Something went wrong!' });
      }
    }
  });
});

router.get('/takeListOfSubTopics', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user = await findUserByIdAndName(Users, authData);
      if (user === null) { res.status(404).json({ Error: 'User doesnt exists!' }); }

      const subTopics = await findAllSubTopics(SubTopics);
      if (subTopics) {
        res.status(200).json(subTopics);
      } else {
        res.status(400).json({ Message: 'Something went wrong!' });
      }
    }
  });
});

router.post('/addNewTopic',
  [
    check('subject')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
      .trim(),
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
          const user = await findUserByIdAndName(Users, authData);
          if (user === null) { res.status(400).json({ Error: 'User doesnt exists!' }); }

          const subject = await findSubjectByName(Subjects, req.body.subject);
          if (subject === null) { res.status(400).json({ Error: 'Subject doesnt exists!' }); }

          const newTopic = await addNewTopic(Topics, req.body.topicName, user.id, subject.id);
          if (newTopic) {
            res.status(201).json({ Message: 'New topic created!' });
          } else {
            res.status(400).json({ Message: 'Something went wrong!' });
          }
        }
      });
    }
  });

router.put('/updateTopic',
  [
    check('subject')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
      .trim(),
    check('oldTopicName')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
      .trim(),
    check('newTopicName')
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
          const user = await findUserByIdAndName(Users, authData);
          if (user === null) { res.status(404).json({ Error: 'User doesnt exists!' }); }

          const updateTopic = await updateTopicName(Topics, req.body.oldTopicName,
            req.body.newTopicName, user.id);
          res.status(201).json({ updateTopic });
        }
      });
    }
  });

router.post('/addNewSubTopic',
  [
    check('topicName')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
      .trim(),
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
          const user = await findUserByIdAndName(Users, authData);
          if (user === null) { res.status(404).json({ Error: 'User doesnt exists!' }); }

          const addSubTopic = await addNewSubTopic(SubTopics, Topics, req.body.topicName,
            req.body.subTopicName, user.id);
          res.status(201).json({ addSubTopic });
        }
      });
    }
  });

router.put('/updateSubTopic',
  [
    check('topicName')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
      .trim(),
    check('oldSubTopicName')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
      .trim(),
    check('newSubTopicName')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
      .trim(),
  ],
  verifyToken, (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.send({ Error: error });
    } else {
      jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserByIdAndName(Users, authData);
          if (user === null) { res.status(404).json({ Error: 'User doesnt exists!' }); }

          const updateSubTopic = await updateSubTopicName(SubTopics, req.body.oldSubTopicName,
            req.body.newSubTopicName, user.id);
          res.status(201).json({ Response: updateSubTopic });
        }
      });
    }
  });

router.post('/addNewRepetitory',
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
    check('data')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 300 })
      .trim(),
  ],
  verifyToken, (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.send({ Error: error });
    } else {
      jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserByIdAndName(Users, authData);
          if (user === null) { res.status(404).json({ Error: 'User doesnt exists!' }); }
          const subTopic = await findSubTopicByName(SubTopics, req.body.subTopicName);
          if (subTopic === null) { res.status(404).json({ Error: 'Subtopic doesnt exists!' }); }

          const addRepetitory = await addNewRepetitory(Repetitory, req.body.titleOfRepetitory,
            req.body.data, user, subTopic.id);
          res.status(201).json({ Resposne: addRepetitory });
        }
      });
    }
  });

module.exports = router;
