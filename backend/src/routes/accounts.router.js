const { Router } = require('express');
const { getBalanceById, newDeposit, newWithdraw } = require('../controllers/accounts.controller');

const router = Router();

router.get('/:id', getBalanceById);

router.post('/deposit', newDeposit);

router.post('/withdraw', newWithdraw);

module.exports = router;
