const { Router } = require('express');
const { check } = require('express-validator');

const { 
  postLogin,
  getLoggedUser
 } = require('../controllers/auth.controller');

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

router.get('/user',[
  validateJWT,
], getLoggedUser);


module.exports = router;