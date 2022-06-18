
const User = require('../../models/user.model');
const { Op } = require('sequelize')

const getFilteredUser = async ( params ) => {
  try {
    const { q } = params;
    const users = await User.findAll({ 
      where:{
        [Op.or]:[
          { 
            name : {
              [ Op.like ] : `%${ q }`
            } 
          },
          {
            lastName: {
              [ Op.like ] : `%${ q }`
            }
          },
          {
            email: {
              [ Op.like ] : `%${ q }`
            }
          }
        ]
        
      } 
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  getFilteredUser,
}