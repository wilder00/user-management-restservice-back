const { Router } = require('express');

const router = Router();

router.use('/version', require('./public/version.route'))
router.use('/webhooks', require('./public/webhooks.route'))

module.exports = router;