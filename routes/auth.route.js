const { Router } = require('express');
const { check } = require('express-validator');

const { 
  postLogin,
  getLoggedUser,
  postRegister
} = require('../controllers/auth.controller');
const { existEmail, isValidRole } = require('../helpers/db-validators');

const {
  validateFields,
  validateJWT,
} = require('../middlewares');

const router = Router();
  
router.post('/login',[
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validateFields
], postLogin);

router.post('/register',[
  check('email', 'el correo no es válido').isEmail(), //this will send the error to the controller
  check('email').custom( existEmail ), //this will send the error to the controller
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('lastName', 'El apellido es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe ser al menos 6 caracteres').isLength({ min: 6 }),
  validateFields,
], postRegister);    

router.get('/user',[
  validateJWT,
], getLoggedUser);


module.exports = router;