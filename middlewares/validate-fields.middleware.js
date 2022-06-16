
const { validationResult }= require('express-validator');


const validateFields = ( req, res, next ) =>{

  const errors = validationResult(req);
  
  if(!errors.isEmpty()){
    return res.status(400).json({
      message: errors.array().map(err=>err.msg),
    });
  }
  next();
}

module.exports = {
  validateFields
}