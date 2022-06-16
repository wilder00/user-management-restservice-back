const { Router } = require('express');
const { check } = require('express-validator');

const { 
  postLogin } = require('../controllers/auth.controller');

const { validateFields } = require('../middlewares/validate-fields.middleware');

const router = Router();
  
router.post('/login',[
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validateFields
], postLogin);


module.exports = router;