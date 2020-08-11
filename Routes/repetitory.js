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
              .catch((catchError) => res.json({ catchError }));
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
              .catch((catchError) => res.json({ catchError }));
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
              .catch((catchError) => res.json({ catchError }));
          } else {
            res.json({ Komunikat: 'Użytkownik nie istnieje!' });
          }
        });
    }
  });
});

router.post('/addNewTopic',
  [
    check('subject')
      .isLength({ min: 4 })
      .exists()
      .isString()
      .trim(),
    check('topicName')
      .isLength({ max: 30 })
      .trim()
      .exists()
      .isString(),
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
          Users.findOne({ where: { id: authData.id, name: authData.name } })
            .then((users) => {
              if (users !== null) {
                Subjects.findOne({ where: { name: req.body.subject } })
                  .then((subjects) => {
                    Topics.findOne({ where: { name: req.body.topicName } })
                      .then((topic) => {
                        if (topic !== null) {
                          res.json({ Komunikat: 'Temat już istnieje!' });
                        } else {
                          Topics.create({
                            name: req.body.topicName,
                            id_subject: subjects.id,
                          })
                            .then(() => {
                              res.json({ Komunikat: 'Pomyślnie dodano nowy temat!' });
                            })
                            .catch((catchError) => res.json({ catchError }));
                        }
                      })
                      .catch((catchError) => res.json({ catchError }));
                  })
                  .catch((catchError) => res.json({ catchError }));
              } else {
                res.json({ Komunikat: 'Użytkownik nie istnieje!' });
              }
            });
        }
      });
    }
  });

router.put('/updateTopic',
  [
    check('subject')
      .isLength({ min: 4 })
      .exists()
      .isString()
      .trim(),
    check('oldTopicName')
      .isLength({ min: 4 })
      .exists()
      .isString()
      .trim(),
    check('topicName')
      .isLength({ max: 30 })
      .trim()
      .exists()
      .isString(),
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
          Users.findOne({ where: { id: authData.id, name: authData.name } })
            .then((users) => {
              if (users !== null) {
                Topics.findOne({ where: { name: req.body.oldTopicName } })
                  .then((topic) => {
                    if (topic !== null) {
                      Topics.update({
                        name: req.body.topicName,
                      }, {
                        where: { id_topic: topic.id },
                      })
                        .then(() => {
                          res.json({ Komunikat: 'Pomyślnie zaktualizowano dane!' });
                        })
                        .catch((catchError) => res.json({ catchError }));
                    } else {
                      res.json({ Komunikat: 'Temat nie istnieje!' });
                    }
                  })
                  .catch((catchError) => res.json({ catchError }));
              } else {
                res.json({ Komunikat: 'Użytkownik nie istnieje!' });
              }
            });
        }
      });
    }
  });

router.post('/addNewSubTopic',
  [
    check('topicName')
      .isLength({ max: 30 })
      .trim()
      .exists()
      .isString(),
    check('subTopicName')
      .isLength({ max: 30 })
      .trim()
      .exists()
      .isString(),
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
          Users.findOne({ where: { id: authData.id, name: authData.name } })
            .then((users) => {
              if (users !== null) {
                Topics.findOne({ where: { name: req.body.topicName } })
                  .then((topics) => {
                    if (topics !== null) {
                      SubTopics.create({
                        name: req.body.subTopicName,
                        id_user: users.id,
                        id_topic: topics.id,
                      })
                        .then(() => {
                          res.json({ Komunikat: 'Pomyślnie dodano nowy rozdział!' });
                        })
                        .catch((catchError) => res.json({ catchError }));
                    } else {
                      res.json({ Komunikat: 'Rozdział nie istnieje!' });
                    }
                  })
                  .catch((catchError) => res.json({ catchError }));
              } else {
                res.json({ Komunikat: 'Użytkownik nie istnieje!' });
              }
            });
        }
      });
    }
  });

router.put('/updateSubTopic',
  [
    check('topicName')
      .isLength({ max: 30 })
      .trim()
      .exists()
      .isString(),
    check('oldSubTopicName')
      .isLength({ max: 30 })
      .trim()
      .exists()
      .isString(),
    check('newSubTopicName')
      .isLength({ max: 30 })
      .trim()
      .exists()
      .isString(),
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
          Users.findOne({ where: { id: authData.id, name: authData.name } })
            .then((users) => {
              if (users !== null) {
                SubTopics.findOne({ where: { name: req.body.oldSubTopicName } })
                  .then((subTopics) => {
                    if (subTopics !== null) {
                      SubTopics.update({
                        name: req.body.newSubTopicName,
                      }, {
                        where: { id_subtopic: subTopics.id },
                      })
                        .then(() => {
                          res.json({ Komunikat: 'Pomyślnie zaktualizowano dane!' });
                        })
                        .catch((catchError) => res.json({ catchError }));
                    } else {
                      res.json({ Komunikat: 'Rozdział nie istnieje!' });
                    }
                  })
                  .catch((catchError) => res.json({ catchError }));
              } else {
                res.json({ Komunikat: 'Użytkownik nie istnieje!' });
              }
            });
        }
      });
    }
  });

router.post('/addNewRepetitory',
  [
    check('subTopicName')
      .isLength({ max: 30 })
      .trim()
      .exists()
      .isString(),
    check('titleOfRepetitory')
      .isLength({ max: 30 })
      .trim()
      .exists()
      .isString(),
    check('data')
      .isLength({ max: 300 })
      .trim()
      .exists()
      .isString(),
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

router.put('/updateNewRepetitory',
  [
    check('oldTitleOfRepetitory')
      .isLength({ max: 30 })
      .trim()
      .exists()
      .isString(),
    check('titleOfRepetitory')
      .isLength({ max: 30 })
      .trim()
      .exists()
      .isString(),
    check('data')
      .isLength({ max: 300 })
      .trim()
      .exists()
      .isString(),
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
          res.json();
        }
      });
    }
  });

module.exports = router;
