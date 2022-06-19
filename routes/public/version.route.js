const { Router } = require('express');
const { getVersion } = require('../../controllers/public/version.controller');

const router = Router();
  
router.get('/', getVersion);


module.exports = router;