const { Router } = require('express');
const { newAsk, newBid } = require('../controllers/operations.controller');

const router = Router();

router.post('/buy', newBid);

router.post('/sell', newAsk);

module.exports = router;
