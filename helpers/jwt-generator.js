
const jwt = require('jsonwebtoken')

// uid unique identification
const generateJWT = ( uid = '' )=>{
  return new Promise( (resolve, reject)=>{
    //it's possible to add user, name or whatever we want
    const payload = { uid } 
    jwt.sign( payload, process.env.SING_JWT_TOKEN_KEY,{
      expiresIn: '24h'
    }, (err, token)=>{
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(token)
      }
    })

  })
}

module.exports = {
  generateJWT
}