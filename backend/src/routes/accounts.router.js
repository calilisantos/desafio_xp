const { Router } = require('express');
const { getBalanceById } = require('../controllers/accounts.controller');

const router = Router();

router.get('/:id', getBalanceById);

module.exports = router;
