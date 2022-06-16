//para que el editor de código autocomplete mejor
const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');


const getUsers = async (req = request, res = response)=>{

  //obtaining data from query params 
  const { limit = 5, from = 0 } = req.query
  const where = {state: true}
  const user  = req.user;
  try {

    const resp = await Promise.all([
      User.count({ where }),
      User.findAll({ limit, offset: from, where }),
    ])

    const [total , users] = resp

    res.json({
      total,
      count: users.length,  
      users,
      requestor: user
    });
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}


const postUser = async(req, res = response)=>{
  
  

  const {name, lastName, email, password, role} = req.body;

  try {
    //const user = new User({ firstName, lastName })
    const user = new User({name, lastName, email, password, role})
    

    //TODO: Encrypt password
    const salt = bcrypt.genSaltSync(10); // it's the number of laps to reinforce the encryption, by default it's 10
    user.password = bcrypt.hashSync(password, salt);

    //TODO: save user
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "No se pudo crear el usuario",
      message: error.message,
    })
  }
}

const putUser = async (req, res = response)=>{
  // obtaining data from the url path (it's needed that the path on the route should have /:id, then express will parse)
  const { userId } = req.params;
  const { id, password, google, email, ...rest } = req.body;

  //TODO: Validar id contra base de datos

  if(password){
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt)
  }

  try {
    //User.upsert(rest,{}) 
    const temp = await User.update(rest,{ where: { id: userId } });
    const usr = await User.findByPk(id);
    res.json({
      msg: "correct",
      user: usr
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }

}




const patchUser = (req, res = response)=>{
  res.json({
    msg: "patch API - controller"
  });
}


const deleteUser = async (req, res = response)=>{
  const { userId } = req.params;

  try {

    //borrando físico
    /* const delUser = await User.destroy({ where: { id: userId } })
    
    res.json({
      numberRowsDeleted: delUser
    }); */

    //borrado simbólico
    const user = await User.findByPk(userId);
    const removed = await user.update({state: false})
    res.json({
      message: "Se eliminó el usuario" 
    });

  } catch (error) {
    res.status(400).json({
      error,
    });
  }

  
}


module.exports = {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser
}