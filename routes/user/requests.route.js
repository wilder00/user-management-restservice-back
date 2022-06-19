
const { Router } = require('express')
const { check } = require('express-validator')

const { existRole, existUserWithId } = require('../../helpers/db-validators')
const {
  validateJWT,
  validateFields,
} = require('../../middlewares');
const { getUserRequests, postUserRequest } = require('../../controllers/users/requests.controller');

const router = Router()

router.get('/', [
  validateJWT,
], getUserRequests )

router.post('/:userId', [
  validateJWT,
  check('userId', 'No es un id válido').isInt().toInt(),
  check('userId').custom( existUserWithId ),
  validateFields
], postUserRequest )

module.exports = router