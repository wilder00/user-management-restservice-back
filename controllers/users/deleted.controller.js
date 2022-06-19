
const { request, response } = require('express')
const { Op, json } = require('sequelize')
const User = require('../../models/user.model')
const DeletedUser = require('../../models/deletedUser.model')

const getDeletedUsers = async ( req = request, res = response) =>{
  const { q, limit = 20, page = 1 } = req.query;
  let offset = limit * (page < 1? 0 : (page - 1));
  let where = {  }

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
      DeletedUser.findAll({ 
        limit, offset, 
        include: [
          { model: User, required: true, source: 'id', foreignKey: 'userId', as: "deletedUser", where },
          { model: User, required: true, source: 'id', foreignKey: 'byUserId', as: "deletingUser", attributes:['id', 'name','lastName']},
        ],
        attributes: ['id','asRole', ['createdAt', 'date']]
      }),
      DeletedUser.count()
    ])
    const [users , usersQuantity] = dbResp;
    res.json({
      currentPage: parseInt(page),
      pages: Math.ceil( usersQuantity / limit ),
      usersQuantity,
      users
    })  
  } catch (error) {
    res.status(400).json({
      message: "no se pudo obtener la lista de usuarios"
    })
  }
}

const postDeletedUser = async (req = request, res = response) =>{
  const { deletedUserId } = req.params;

  try {
    const deletedUser = await DeletedUser.findByPk(deletedUserId);
    const user = await User.findByPk(deletedUser.userId);

    await user.update({isActive: true});
    await deletedUser.destroy();
    res.json({
      message: `Se ha restaurado a ${user.name} ${user.lastName}.`
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Ocurrió en problema al momento de restaurar al usuario.`
    })
  }
}

module.exports = {
  getDeletedUsers,
  postDeletedUser
}