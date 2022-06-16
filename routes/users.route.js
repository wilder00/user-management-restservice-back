const { Router } = require('express');
const { check } = require('express-validator');

const { 
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser } = require('../controllers/users.controller');

const { isValidRole, existEmail, existUserWithId } = require('../helpers/db-validators');

const {
  validateFields,
  validateJWT,
  isAdminRole,
  hasRole,
} = require('../middlewares');

const router = Router();
  
  router.get('/', [
    validateJWT,
    //isAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE')
  ] ,getUsers);

//adding middleware, if we need to use only one, it's not required to put it in an array
router.post('/',[
  check('email', 'el correo no es válido').isEmail(), //this will send the error to the controller
  check('email').custom( existEmail ), //this will send the error to the controller
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('lastName', 'El apellido es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe ser al menos 6 caracteres').isLength({ min: 6 }),
  //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( isValidRole ),
  validateFields,
], postUser);


router.put('/:userId',[
  check('userId', 'No es un id válido').isInt().toInt(),
  check('userId').custom( existUserWithId ),
  check('role').custom( isValidRole ),
  validateFields
],putUser);


router.patch('/', patchUser);

router.delete('/:userId',[
  check('userId', 'No es un id válido').isInt().toInt(),
  check('userId').custom( existUserWithId ),
  validateFields
], deleteUser);


module.exports = router;