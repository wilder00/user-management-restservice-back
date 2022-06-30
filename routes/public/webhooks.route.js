const { Router } = require('express');
const { postWebhook } = require('../../controllers/public/webhook.controller');

const router = Router();
  
router.post('/', postWebhook);


module.exports = router;