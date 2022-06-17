const {request , response} = require('express')

const bcrypt = require('bcryptjs');

const User = require('../models/user.model')
const { generateJWT } = require('../helpers/jwt-generator')

const postLogin = async (req = request, res = response) => {

  const { email, password } = req.body  

  try {

    //verify if the email exits
    const user = await User.findOne({ where: { email }})
    if( !user ){
      res.status(400).json({
        message: 'Usuario / Password no son correctos'
      })
    }
     
    // verify if user is active
    if( !user.state ){
      res.status(400).json({
        message: 'Usuario / Password no son correctos'
      })
    }

    // verify the password 
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if(!isValidPassword){
      res.status(400).json({
        message: 'Usuario / Password no son correctos'
      })
    }

    // generate JWT
    const token = await generateJWT( user.id ) 

    res.json({
      access_token: token,
      user
    })
    
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}



const getLoggedUser = async ( req = request, res = response )=>{
  
  const user = req.user;
  res.json({user});

}


module.exports = {
  postLogin,
  getLoggedUser,
}