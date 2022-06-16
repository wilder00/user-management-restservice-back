const {request , response} = require('express')
const Role = require('../models/role.model')

const getRoles = async (req = request, res = response) => {
  try {
    const roles = await Role.findAll();
    res.json({
      roles
    });
  } catch (error) {
    
  }
}

const postRole = async (req = request, res = response) => {
  const { id, ...rest } = req.body;
  try {
    const role = new Role(rest)
    const savedRole = await role.save()
    res.json({
      role: savedRole
    });
  } catch (error) {
    res.status(400).json({
      error
    })
  }
}

module.exports = {
  getRoles,
  postRole
}