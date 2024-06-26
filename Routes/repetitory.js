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
const findUserById = require('../Function/findUserById');
const findAllTopics = require('../Function/findAllTopics');
const findAllSubTopics = require('../Function/findAllSubTopics');
const findSubjectByName = require('../Function/findSubjectByName');
const addNewTopic = require('../Function/addNewTopic');
const updateTopicName = require('../Function/updateTopicName');
const addNewSubTopic = require('../Function/addNewSubTopic');
const updateSubTopicName = require('../Function/updateSubTopicName');
const findSubTopicByName = require('../Function/findSubTopicByName');
const addNewRepetitory = require('../Function/addNewRepetitory');
const findRepetitoryBySubtopicId = require('../Function/findRepetitoryBySubtopicId');
const updateRepetitory = require('../Function/updateRepetitory');

router.get('/takeListOfSubjects', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user = await findUserById(Users, authData);
      if (user === null) { res.status(404).json({ Error: 'Użytkownik nie istnieje!' }); return; }

      const subjects = await findAllSubjects(Subjects);
      if (subjects) {
        res.status(200).json(subjects);
        return;
      }
      res.status(400).json({ Error: 'Coś poszło nie tak!' });
    }
  });
});

router.get('/takeListOfTopics', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user = await findUserById(Users, authData);
      if (user === null) { res.status(404).json({ Error: 'Użytkownik nie istnieje!' }); return; }

      const topics = await findAllTopics(Topics);
      if (topics) {
        res.status(200).json(topics);
        return;
      }
      res.status(400).json({ Error: 'Coś poszło nie tak!' });
    }
  });
});

router.get('/takeListOfSubTopics', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user = await findUserById(Users, authData);
      if (user === null) { res.status(404).json({ Error: 'Użytkownik nie istnieje!' }); return; }

      const subTopics = await findAllSubTopics(SubTopics);
      if (subTopics) {
        res.status(200).json(subTopics);
        return;
      }
      res.status(400).json({ Error: 'Coś poszło nie tak!' });
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
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(400).json({ Error: 'Użytkownik nie istnieje!' }); return; }

          const subject = await findSubjectByName(Subjects, req.body.subject);
          if (subject === null) { res.status(400).json({ Error: 'Przedmiot nie istnieje' }); return; }

          const newTopic = await addNewTopic(Topics, req.body.topicName, user, subject.id);
          if (newTopic) {
            res.status(201).json({ Message: 'Nowy temat został dodany' });
            return;
          } if (newTopic === false) {
            res.status(400).json({ Error: 'Nie masz uprawnień, by to zrobić!' });
            return;
          }
          res.status(400).json({ Error: 'Coś poszło nie tak!' });
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
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(404).json({ Error: 'Użytkownik nie istnieje!' }); return; }

          const updateTopic = await updateTopicName(Topics, req.body.oldTopicName,
            req.body.newTopicName, user);
          if (updateTopic) {
            res.status(201).json({ Message: 'Temat został zaktualizowany!' });
            return;
          } if (updateTopic === false) {
            res.status(400).json({ Error: 'Nie masz uprawnień, by to zrobić!' });
            return;
          }
          res.status(400).json({ Error: 'Coś poszło nie tak!' });
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
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(404).json({ Error: 'Użytkownik nie istnieje!' }); return; }

          const addSubTopic = await addNewSubTopic(SubTopics, Topics, req.body.topicName,
            req.body.subTopicName, user);
          if (addSubTopic) {
            res.status(201).json({ Message: 'Nowy rozdział został dodany!' });
            return;
          } if (addSubTopic === false) {
            res.status(400).json({ Error: 'Nie masz uprawnień, by to zrobić!' });
            return;
          }
          res.status(400).json({ Error: 'Coś poszło nie tak!' });
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
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(404).json({ Error: 'Użytkownik nie istnieje!' }); return; }

          const updateSubTopic = await updateSubTopicName(SubTopics, req.body.oldSubTopicName,
            req.body.newSubTopicName, user);
          if (updateSubTopic) {
            res.status(201).json({ Message: 'Rodzdział został zaktualizowany!' });
            return;
          } if (updateSubTopic === false) {
            res.status(400).json({ Error: 'Nie masz uprawnień, by to zrobić!' });
            return;
          }
          res.status(400).json({ Error: 'Coś poszło nie tak!' });
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
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(404).json({ Error: 'Użytkownik nie istnieje!' }); return; }
          const subTopic = await findSubTopicByName(SubTopics, req.body.subTopicName);
          if (subTopic === null) { res.status(404).json({ Error: 'Rozdział nie istnieje!' }); return; }

          const addRepetitory = await addNewRepetitory(Repetitory, req.body.titleOfRepetitory,
            req.body.data, user, subTopic.id);
          if (addRepetitory) {
            res.status(201).json({ Message: 'Repetytorium zostało dodane!' });
            return;
          } if (addRepetitory === false) {
            res.status(400).json({ Error: 'Nie masz uprawnień, by to zrobić!' });
            return;
          }
          res.status(400).json({ Error: 'Coś poszło nie tak!' });
        }
      });
    }
  });

router.put('/updateRepetitory',
  [
    check('subTopicName')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
      .trim(),
    check('oldTitleOfRepetitory')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .not().isNumeric()
      .trim(),
    check('newTitleOfRepetitory')
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
      res.status(400).json({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(404).json({ Error: 'Użytkownik nie istnieje!' }); return; }
          const subTopic = await findSubTopicByName(SubTopics, req.body.subTopicName);
          if (subTopic === null) { res.status(404).json({ Error: 'Rozdział nie istnieje!' }); return; }

          const update = await updateRepetitory(Repetitory, req.body.oldTitleOfRepetitory,
            req.body.newTitleOfRepetitory, req.body.data, user);
          if (update) {
            res.status(201).json({ Message: 'Repetytorium zostało zaktualizowane!' });
            return;
          } if (update === false) {
            res.status(400).json({ Error: 'Nie masz uprawnień, by to zrobić!' });
            return;
          }
          res.status(400).json({ Error: 'Coś poszło nie tak!' });
        }
      });
    }
  });

router.get('/takeRepetitory/:subTopicName',
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
          if (user === null) { res.status(404).json({ Error: 'Użytkownik nie istnieje!' }); return; }
          const subTopic = await findSubTopicByName(SubTopics, req.params.subTopicName);
          if (subTopic === null) { res.status(404).json({ Error: 'Rozdział nie istnieje!' }); return; }

          const takeRepetitory = await findRepetitoryBySubtopicId(Repetitory, subTopic.id);
          if (takeRepetitory) {
            res.status(201).json(takeRepetitory);
            return;
          }
          res.status(400).json({ Error: 'Coś poszło nie tak!' });
        }
      });
    }
  });

module.exports = router;
