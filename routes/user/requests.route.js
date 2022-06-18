
const { Router } = require('express')
const { check } = require('express-validator')

const { existRole } = require('../../helpers/db-validators')
const {
  validateJWT,
  validateFields,
} = require('../../middlewares');
const { getUserRequests } = require('../../controllers/users/requests.controller');

const router = Router()

router.get('/',[
  validateJWT,
],getUserRequests)

module.exports = router