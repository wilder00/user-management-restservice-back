
const { Router } = require('express')
const { check } = require('express-validator')

const { existRole } = require('../helpers/db-validators')
const { validateFields } = require('../middlewares/validate-fields.middleware')
const { getRoles, postRole } = require('../controllers/roles.controller')

const router = Router()

router.get('/', getRoles)
router.post('/',[
  check('roleName', 'El nombre no debe ser vacío').not().isEmpty(),
  check('roleName').custom(existRole),
  validateFields
],postRole)


module.exports = router