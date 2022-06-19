//para que el editor de código autocomplete mejor
const { request, response } = require('express');
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const DeletedUser = require('../models/deletedUser.model');


const getUsers = async (req = request, res = response)=>{

  //obtaining data from query params 
  const { q, limit = 20, page = 1 } = req.query;
  let offset = limit * (page < 1? 0 : (page - 1));
  let where = { acceptedRequest: true, isActive: true }
  if(q){
    where = {
      ...where,
      [Op.or]:[
        { name:     { [ Op.iLike ] : `%${ q }%` } },
        { lastName: { [ Op.iLike ] : `%${ q }%` } },
        { email:    { [ Op.iLike ] : `%${ q }%` } },
      ]
    }
  }

  try {
    const dbResp = await Promise.all([
      User.findAll({ where , limit, offset}),
      User.count({ where })
    ])
    const [users , usersQuantity] = dbResp;
    res.json({
      currentPage: parseInt(page),
      pages: Math.ceil( usersQuantity / limit ),
      usersQuantity,
      users
    })  
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
  const deletingUser = req.user;
  try {
    //borrado simbólico
    const deletedUser = await User.findByPk(userId);

    if(deletedUser.role === 'SUPER_ADMIN_ROLE'){
      if(deletingUser.role !== 'SUPER_ADMIN_ROLE'){
        return res.status(403).json({
          message: 'Este usuario solo puede ser eliminado por otro del mismo rol.'
        })
      }
    }

    if(deletedUser.id === deletingUser.id){

      return res.status(403).json({
        message: 'No se puede eliminar a si mismo.'
      })
    }

    await deletedUser.update({isActive: false})
    await DeletedUser.create({
      userId: deletedUser.id,
      asRole: deletingUser.role,
      byUserId: deletingUser.id,
    })


    res.json({
      message: `Has eliminado a ${deletedUser.name} ${deletedUser.lastName}.`
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