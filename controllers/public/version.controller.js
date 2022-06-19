const {request , response} = require('express')
const constants = require('../../config/version.constants')

const getVersion = ( req = request, res = response )=>{
  
  res.json({
    version: constants.VERSION,
  });

}


module.exports = {
  getVersion,
}