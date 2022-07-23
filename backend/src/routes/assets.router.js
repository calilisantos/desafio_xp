const { Router } = require('express');
const { getByAsset } = require('../controllers/assets.controller');

const router = Router();

router.get('/:id', getByAsset);

module.exports = router;
