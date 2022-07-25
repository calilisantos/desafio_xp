const { Router } = require('express');
const assetsRouter = require('./assets.router');
const accountRouter = require('./accounts.router');
const operationRouter = require('./operations.router');

const router = Router();

router.use('/assets', assetsRouter);

router.use('/account', accountRouter);

router.use('/operations', operationRouter);

module.exports = router;
