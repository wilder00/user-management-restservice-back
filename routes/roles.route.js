
const { Router } = require('express')
const { check } = require('express-validator')

const { existRole } = require('../helpers/db-validators')
const {
  validateJWT,
  validateFields,
} = require('../middlewares');
const { getRoles, postRole } = require('../controllers/roles.controller')

const router = Router()

router.get('/', validateJWT ,getRoles)
router.post('/',[
  validateJWT,
  check('roleName', 'El nombre no debe ser vacío').not().isEmpty(),
  check('roleName').custom(existRole),
  validateFields
],postRole)


module.exports = router