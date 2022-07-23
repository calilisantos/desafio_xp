const { Router } = require('express');
const { getByAsset, getAllAssets } = require('../controllers/assets.controller');

const router = Router();

router.get('/', getAllAssets);

router.get('/:id', getByAsset);

module.exports = router;
