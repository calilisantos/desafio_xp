const { Router } = require('express');
const { newBid } = require('../controllers/operations.controller');

const router = Router();

router.post('/buy', newBid);

module.exports = router;
