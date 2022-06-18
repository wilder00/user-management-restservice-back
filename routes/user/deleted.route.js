
const { Router } = require('express')
const { check } = require('express-validator')

const { existRole } = require('../../helpers/db-validators')
const {
  validateJWT,
  validateFields,
} = require('../../middlewares');
const { getDeletedUsers } = require('../../controllers/users/deleted.controller');

const router = Router()

router.get('/',[
  validateJWT,
],getDeletedUsers)

module.exports = router