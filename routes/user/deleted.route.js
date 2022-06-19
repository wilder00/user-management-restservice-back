
const { Router } = require('express')
const { check } = require('express-validator')

const { existRole, isUserDeleted } = require('../../helpers/db-validators')
const {
  validateJWT,
  validateFields,
  isRootRole,
} = require('../../middlewares');
const { getDeletedUsers, postDeletedUser } = require('../../controllers/users/deleted.controller');

const router = Router()

router.get('/',[
  validateJWT,
],getDeletedUsers)

router.post('/:deletedUserId',[
  validateJWT,
  isRootRole,
  check('deletedUserId', 'No es un id válido').isInt().toInt(),
  check('deletedUserId').custom( isUserDeleted ),
  validateFields,
],postDeletedUser)

module.exports = router