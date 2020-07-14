const express = require('express');
const router = express.Router();

router.get('/loginUserInApplication', (req,res) => {
    res.json({'jakis tekst': 2});
})

module.exports = router;