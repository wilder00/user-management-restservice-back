const {request , response} = require('express');
const Webhook = require('../../models/webhook.model');


const postWebhook = async ( req = request, res = response )=>{
  const body = req.body;
  try {
    
    const response = await Webhook.create({
      feedback: body,
    })

    res.status(201).json({
      feedback: response,
    });

  } catch (error) {
    
    res.json({
      message: "no se pudo guardar el json",
      error
    });
  }
  

}


module.exports = {
  postWebhook,
}