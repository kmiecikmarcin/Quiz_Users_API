/* eslint-disable newline-per-chained-call */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Users = require('../Models/Users');
const TypesOfRoles = require('../Models/TypesOfRoles');
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

router.get('/takeListOfSubject', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user = await findUserByIdAndName(Users, authData);
      if (user === null) { res.json({ Error: 'User doesnt exists!' }); }

      const subjects = await findAllSubjects(Subjects);
      res.json(subjects);
    }
  });
});

router.get('/takeListOfTopics', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user = await findUserByIdAndName(Users, authData);
      if (user === null) { res.json({ Error: 'User doesnt exists!' }); }

      const topics = await findAllTopics(Topics);
      res.json({ topics });
    }
  });
});

router.get('/takeListOfSubTopics', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user = await findUserByIdAndName(Users, authData);
      if (user === null) { res.json({ Error: 'User doesnt exists!' }); }

      const subTopics = await findAllSubTopics(SubTopics);
      res.json({ subTopics });
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
      res.send({ Error: error });
    } else {
      jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserByIdAndName(Users, authData);
          if (user === null) { res.json({ Error: 'User doesnt exists!' }); }

          const subject = await findSubjectByName(Subjects, req.body.subject);
          if (subject === null) { res.json({ Error: 'Subject doesnt exists!' }); }

          const newTopic = await addNewTopic(Topics, req.body.topicName, user.id, subject.id);
          res.json({ newTopic });
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
      res.send({ Error: error });
    } else {
      jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserByIdAndName(Users, authData);
          if (user === null) { res.json({ Error: 'User doesnt exists!' }); }

          const updateTopic = await updateTopicName(Topics, req.body.oldTopicName,
            req.body.newTopicName, user.id);
          res.json({ updateTopic });
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
      res.send({ Error: error });
    } else {
      jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user = await findUserByIdAndName(Users, authData);
          if (user === null) { res.json({ Error: 'User doesnt exists!' }); }

          const addSubTopic = await addNewSubTopic(SubTopics, Topics, req.body.topicName,
            req.body.subTopicName, user.id);
          res.json({ addSubTopic });
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
          await findUserByIdAndName(Users, authData);
          const updateSubTopic = await updateSubTopicName(SubTopics, req.body.oldSubTopicName,
            req.body.newSubTopicName);
          res.json({ updateSubTopic });
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
      jwt.verify(req.token, process.env.secretKey, (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          SubTopics.findOne({ where: { name: req.body.subTopicName } })
            .then((subTopic) => {
              if (subTopic !== null) {
                Repetitory.findOne({ where: { title: req.body.titleOfRepetitory } })
                  .then((title) => {
                    if (title === null) {
                      TypesOfRoles.findOne({ where: { id: authData.id_role } })
                        .then((roles) => {
                          if (roles.name === 'Nauczyciel') {
                            Repetitory.create({
                              title: req.body.titleOfRepetitory,
                              data: req.body.data,
                              id_user: authData.id,
                              id_subtopic: subTopic.id,
                            })
                              .then(() => {
                                res.json({ Komunikat: 'Poprawnie dodano nowe repetytorium!' });
                              })
                              .catch((catchError) => res.json({ catchError }));
                          } else {
                            res.json({ Komunikat: 'Nie masz odpowiednich uprawnień!' });
                          }
                        })
                        .catch((catchError) => res.json({ catchError }));
                    } else {
                      res.json({ Komunikat: 'Repetytorium już istnieje!' });
                    }
                  })
                  .catch((catchError) => res.json({ catchError }));
              }
            })
            .catch((catchError) => res.json({ catchError }));
        }
      });
    }
  });

module.exports = router;
