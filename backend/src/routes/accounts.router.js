const { Router } = require('express');
const { getBalanceById, newDeposit } = require('../controllers/accounts.controller');

const router = Router();

router.get('/:id', getBalanceById);

router.post('/deposit', newDeposit);

module.exports = router;
