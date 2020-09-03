/* eslint-disable newline-per-chained-call */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const verifyToken = require('../Function/verifyJwtToken');
const findUserById = require('../Function/findUserById');
const addNewQuestion = require('../Function/addNewQuestion');
const findTopicByName = require('../Function/findTopicByName');
const updateQuestion = require('../Function/updateQuestion');
const findQuestionsByTopicId = require('../Function/findQuestionsByTopicId');
const Topics = require('../Models/Topics');
const Users = require('../Models/Users');
const Questions = require('../Models/Questions');

router.post('/addNewQuestion',
  [
    check('topicName')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 100 })
      .not().isNumeric()
      .trim(),
    check('question')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 100 })
      .not().isNumeric()
      .trim(),
    check('correctAnswer')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 50 })
      .not().isNumeric()
      .trim(),
    check('firstAnswer')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 50 })
      .not().isNumeric()
      .trim(),
    check('secondAnswer')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 50 })
      .not().isNumeric()
      .trim(),
    check('thirdAnswer')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 50 })
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
          const topic = await findTopicByName(Topics, req.body.topicName);
          if (topic === null) { res.status(400).json({ Error: 'Temat nie istnieje!' }); return; }

          const addQuestion = await addNewQuestion(Questions, req.body.question,
            req.body.correctAnswer, req.body.firstAnswer, req.body.secondAnswer,
            req.body.thirdAnswer, user, topic.id);
          if (addQuestion) {
            res.status(201).json({ Message: 'Nowe pytanie zostało dodane!' });
            return;
          } if (addQuestion === false) {
            res.status(400).json({ Error: 'Nie masz uprawnień, by to zrobić!' });
            return;
          }
          res.status(400).json({ Error: 'Coś poszło nie tak!' });
        }
      });
    }
  });

router.put('/updateQuestion',
  [
    check('topicName')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 100 })
      .not().isNumeric()
      .trim(),
    check('oldQuestion')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 100 })
      .not().isNumeric()
      .trim(),
    check('newQuestion')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 100 })
      .not().isNumeric()
      .trim(),
    check('correctAnswer')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 50 })
      .not().isNumeric()
      .trim(),
    check('firstAnswer')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 50 })
      .not().isNumeric()
      .trim(),
    check('secondAnswer')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 50 })
      .not().isNumeric()
      .trim(),
    check('thirdAnswer')
      .exists()
      .notEmpty()
      .isLength({ min: 1, max: 50 })
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
          const topic = await findTopicByName(Topics, req.body.topicName);
          if (topic === null) { res.status(400).json({ Error: 'Temat nie istnieje!' }); return; }

          const update = await updateQuestion(Questions, req.body.oldQuestion,
            req.body.newQuestion, req.body.correctAnswer, req.body.firstAnswer,
            req.body.secondAnswer, req.body.thirdAnswer, user, topic.id);
          if (update) {
            res.status(201).json({ Message: 'Pytanie zostało zaktualizowane!' });
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

router.get('/takeQuestions/:topicName',
  verifyToken, (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.send({ Error: 'Dane zostały wprowadzone niezgodnie z wymyganiami!' });
    } else {
      jwt.verify(req.token, process.env.S3_SECRETKEY, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserById(Users, authData);
          if (user === null) { res.status(404).json({ Error: 'Użytkownik nie istnieje!' }); return; }
          const topic = await findTopicByName(Topics, req.params.topicName);
          if (topic === null) { res.status(404).json({ Error: 'Temat nie istnieje!' }); return; }

          const takeQuestions = await findQuestionsByTopicId(Questions, topic.id);
          if (takeQuestions) {
            res.status(201).json(takeQuestions);
            return;
          }
          res.status(400).json({ Error: 'Coś poszło nie tak!' });
        }
      });
    }
  });

module.exports = router;
