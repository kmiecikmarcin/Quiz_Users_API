/* eslint-disable newline-per-chained-call */
const express = require('express');

const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
const verifyToken = require('../Function/verifyJwtToken');

router.post('/addNewTypeOfRole', verifyToken, (req, res) => {
  res.send();
});
router.delete('/deleteRepetitory', verifyToken, (req, res) => {
  res.send();
});
router.delete('/deleteSubtopic', verifyToken, (req, res) => {
  res.send();
});
router.delete('/deleteTopic', verifyToken, (req, res) => {
  res.send();
});
router.delete('/deleteQuestion', verifyToken, (req, res) => {
  res.send();
});

module.exports = router;
