
const User = require('../models/Users');
const Establishment = require('../models/establishment')
const Beneficiary = require('../models/Beneficiary')
const Client = require('../models/Client')

const ROLES = require("../middlewares/auth-user/roles")
module.exports = {
  SignUpEstablishment: async (dataNewUser, callback) => {
    const { // data para creacion del usuario
      identification,
      username,
      email,
      phone, 
      password
    } = data

    const { // data para creacion de establecimiento
      establishment_name,
      establishment_type,
      city_id,
      district,
      schedule,
      qualification
    } = data
    try {
      await User.exists({ identification, username }, (error, result) => { // validando que el usuario no exista
        if(error){
          callback(error)
          
        }else if(result){// el id ya existe
          
          callback('el id ya existe en la base de datos')
        }
        const establishment = new Establishment({ // creando el objeto de establecimiento
          establishment_name,
          establishment_type,
          city_id,
          district,
          schedule,
          qualification
        })

        establishment.save((err) => {
          if(err){
            
            callback(err)
          }else{
            const user = new User({
              identification,
              username,
              email,
              phone, 
              password,
              rol : {
                rol: ROLES.ESTABLISHMENT,
                rol_id: user._id
              }
            })
            user.save((error) => {
              user.password=undefined;// se elimina el dato de contraseña 
              callback(error, user)
            })

          }
        })
        


      })
    } catch (error) {
      
    }
  },
  SignUpClient: async (dataNewUser) => {

  },
  SignUpBeneficiary: async (dataNewUser) => {

  },
}


