
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
    } = dataNewUser
    console.log("Hola mundo")
    const { // data para creacion de establecimiento
      establishment_name,
      establishment_type,
      city_id,
      district,
      schedule,
      qualification
    } = dataNewUser
    try {
      const query = User.find()
      query.or([{ identification }, {username}]) // primero se valida que el usuario y el id no existan
      query.exec((error, result) => {
        if(error)
          callback(error)
        else if(!result || result.length === 0){
          
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
                  rol_id: establishment._id
                }
              })
              user.save((error) => {
                user.password=undefined;// se elimina el dato de contraseña 
                callback(error, user)
              })
  
            }
          })
          // console.log(result)
          
        }else{
          callback('el id o el usuario ya existen en la base de datos')
        }
      })
    } catch (error) {
      callback(error)
    }
  },
  SignUpClient: async (dataNewUser, callback) => {
    const { // data para creacion del usuario
      identification,
      username,
      email,
      phone, 
      password
    } = dataNewUser

    const { // data para creacion de usuario
      name,
      surname,
      qualification,
      address
    } = dataNewUser
    try {
      const query = User.find()
      query.or([{ identification }, {username}]) // primero se valida que el usuario y el id no existan
      query.exec((error, result) => {
        if(error)
          callback(error)
        else if(!result || result.length === 0){
          
          // callback(error, {})
          const client = new Client({
            name,
            surname,
            qualification,
            address
          })

          client.save((error) => {
            if(error)
              callback(error)
            else{
              const user = new User({
                identification,
                username,
                email,
                phone, 
                password,
                rol : {
                  rol: ROLES.CLIENT,
                  rol_id: client._id
                }
              })

              user.save((err) => {
                if(err)
                  callback(err)
                else{
                  user.password=undefined;// se elimina el dato de contraseña 
                  callback(error, user)
                }
              })
            }
          })
          // console.log(result)
          
        }else{
          callback('el id o el usuario ya existen en la base de datos')
        }
      })
    } catch (error) {
      callback(error)
    }
  },  
  SignUpBeneficiary: async (dataNewUser, callback) => {
    const { // data para creacion del usuario
      identification,
      username,
      email,
      phone, 
      password
    } = dataNewUser

    const { // data para creacion de beneficiario
      name,
      surname,
      gender,
      address,
      birth_date,
      birth_country,
      entailment_date
    } = dataNewUser
    try {
      const query = User.find()
      query.or([{ identification }, {username}]) // primero se valida que el usuario y el id no existan
      query.exec((error, result) => {
        if(error)
          callback(error)
        else if(!result || result.length === 0){
          
          // callback(error, {})
          const beneficiary = new Beneficiary({
            name,
            surname,
            gender,
            address,
            birth_date,
            birth_country,
            entailment_date
          })

          beneficiary.save((error) => {
            if(error)
              callback(error)
            else{
              const user = new User({
                identification,
                username,
                email,
                phone, 
                password,
                rol : {
                  rol: ROLES.CLIENT,
                  rol_id: beneficiary._id
                }
              })

              user.save((err) => {
                if(err)
                  callback(err)
                else{
                  user.password=undefined;// se elimina el dato de contraseña 
                  callback(error, user)
                }
              })
            }
          })
          // console.log(result)
          
        }else{
          callback('el id o el usuario ya existen en la base de datos')
        }
      })
    } catch (error) {
      callback(error)
    }
  },
}


