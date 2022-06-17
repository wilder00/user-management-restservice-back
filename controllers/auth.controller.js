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
    if( !user.isActive ){
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

const postRegister = async (req = request, res = response ) => {

    const {name, lastName, email, password, role} = req.body;
  
    try {
      //const user = new User({ firstName, lastName })
      const user = new User({name, lastName, email, password})
      
  
      //TODO: Encrypt password
      const salt = bcrypt.genSaltSync(10); // it's the number of laps to reinforce the encryption, by default it's 10
      user.password = bcrypt.hashSync(password, salt);
  
      //TODO: save user
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "No se pudo crear el usuario",
      })
    }
  
}

const getLoggedUser = async ( req = request, res = response )=>{
  
  const user = req.user;
  res.json({user});

}


module.exports = {
  postLogin,
  postRegister,
  getLoggedUser,
}