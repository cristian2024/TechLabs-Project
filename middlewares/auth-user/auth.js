const ROLES = require('./roles')
const User = require('../../models/Users');

// La idea de este middleware es medir los permisos de los usuarios

// se consulta el usuario con los parametros 'username' y 'password'
// si esos datos no se encuentran en req, se procedera a enviar error
async function setUser(req, res, next) {
  const {
    username,
    password
  } = req.body;
  try {
    // primero se validara que los datos hallan sido ingresados
    if(username && password){
      // consultando el dato en mongoDb 
      User.findOne({ user: username }, async (error, result) => {
        // Zona de validación de resultados

        if(error) { // validando posible error
          res.status(400); // codigo 400 dado un error en la solicitud
          res.send({ message: `${error}`});
        } else if(result){ // validando que se halla recibido algo desde la base
          // Dado que se encontro un resultado, se procede a comprobar la contraseña
          
          await result.isCorrectPassword(password, (errorPassword, correct) => {
            console.log(correct)
            if(errorPassword){ // validando posible error al verificar contraseña
              res.status(400); // codigo 400 dado un error en la solicitud
              res.send({ message: `${errorPassword}`});
            } else if(correct){ // validando que el resultado de la confirmación sea positivo
              // llegados a este punto, ya se pueden agregar los datos al req para poder continuar con la ejecución
              // antes que nada, y por motivos de seguridad, toca eliminar la llave password del result
              const user = result;
              user.password = undefined; // eliminando la llave
              req.userData = user;// se agrega al req para que este disponible para los siguientes pasos
              // para continuar la ejecución, solo hace falta llamar al 'next'
              next();
            } else { // caso en el que la contraseña es incorrecta
              res.status(401); // codigo 401 para recurso no autorizado
              res.send({ message: 'La contraseña es erronea'})
            }
          })
        } else { // caso sin errores pero sin devolución de informacion desde la base
          res.status(404); // codigo 404 para recurso no encontrado
          res.send({ message: 'No se ha encontrado el usuario solicitado'})
        }
      }).clone()
    }else {
      // en este punto no se tiene alguno de los dos datos, por lo que no se puede proceder
      res.status(401); // codigo 401 por no poder ser autorizado
      res.send({ message: 'Son necesarios los datos de username y password'});
    }
    
  } catch (error) {
    res.status(400); // codigo 400 dado un error en la solicitud
    res.send({ message: `${error}`});
  }
}

// middleware que verificara los niveles de permisos y definira si el usuario en cuestion puede o no ejecutar la ruta
// cuando se llame, se le debe de pasar un array de Roles, asi sea solo un dato
function authRole(roles){
  return (req, res, next) => {
    try {
      //validando que el dato del usuario 'userData' halla sido cargado (vease el middleware 'setUser')
      if(req.userData === undefined || req.userData === null ) {
        res.status(401);
        return res.send('No se encuentra logueado');
      } else {
        if (roles.includes(userData.rol)){ // validando que el usuario en cuestion tenga los permisos necesarios
          // si los posee, se podra continuar con la ejecución normal
          next();
        } else { // el usuario no tiene los permisos para acceder
          res.status(403); // codigo 403 acceso no permitido
          return res.send({ message: 'El usuario no tiene los permisos necesarios'});
        }
      }
      
    } catch (error) {
      res.status(400);
      return res.send({ message: `${error}`});
    }
  }
}


module.exports = {
  setUser,
  authRole
}