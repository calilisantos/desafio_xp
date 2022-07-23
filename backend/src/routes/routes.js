const { Router } = require('express');
const assetsRouter = require('./assets.router');
const accountRouter = require('./accounts.router');

const router = Router();

router.use('/assets', assetsRouter);

router.use('/account', accountRouter);

module.exports = router;
