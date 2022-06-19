const { Router } = require('express');

const router = Router();

router.use('/version', require('./public/version.route'))

module.exports = router;