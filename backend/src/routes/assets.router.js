const { Router } = require('express');
const { getAllAssets, getByAsset, getByClient } = require('../controllers/assets.controller');

const router = Router();

router.get('/', getAllAssets);

router.get('/:id', getByAsset);

router.get('/client/:id', getByClient);

module.exports = router;
