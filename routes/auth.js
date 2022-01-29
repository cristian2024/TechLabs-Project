const express = require('express');


const auth = require('../middlewares/auth-user/auth')
const roles = require('../middlewares/auth-user/roles')

const controller = require('../controllers/authentication');
const res = require( "express/lib/response" );

const router = express.Router();

// body for return information, its just an idea, it could be improve
function returnBody(isCompleted, data, error){
  this.isCompleted = isCompleted;
  this.data = data;
  this.error = error 
}





router.post('/signup/:type', async (req, res) => {
  // funcionalidad vieja
  // const {
  //   document,
  //   name,
  //   surname,
  //   username,
  //   email,
  //   rol,
  //   password
  // } = req.body;
  

  // try {
  //   // throw new Error('Exception message');
  //   await User.exists({ username }, (error, result) => {
  //     // managing error
  //     if (error) {
  //       res.status(400)
  //       res.send(new returnBody(false, {}, `${error}`))
  //     } else {
  //       if (result) {
  //         res.status(409)
  //         res.send(new returnBody(false, { isRepeated: true}, `The user already exists`))
  //       } else {
  //         // creating the user from the body data
  //         let user = new User({
  //           document,
  //           name,
  //           surname,
  //           username, 
  //           email,
  //           rol,
  //           password
  //         });
  //         // saving the data in mongoose ant managing the possible errors
  //         user.save((err) => {
  //           if(err){
  //             res.status(400)
  //             res.send(new returnBody(false, {}, `${err}`))
  //           }else{
  //             // save was completed succesfully
  //             user.password = undefined;
  //             res.status(200)
  //             res.send(new returnBody(true, user, {}))
  //           }
  //         });  
  //       }
  //     }
  //   }).clone()
  // } catch (error) {
  //   res.status(400)
  //   res.send(new returnBody(false, {}, `${error}`))
  // } 

  // nueva funcionalidad
  const type = req.params.type
  

  const { // data para creacion del usuario
    identification,
    username,
    email,
    phone, 
    password
  } = req.body
  
  
  // validando el tipo de usuairo a ingresar
  try {
    
    if(type === roles.BENEFICIARY){
      const { // data para creacion de establecimiento
        name,
        surname,
        gender,
        address,
        birth_date,
        birth_country,
        entailment_date
      } = req.body

      result = await controller.SignUpBeneficiary({
        identification,
        username,
        email,
        phone, 
        password,
        name,
        surname,
        gender,
        address,
        birth_date,
        birth_country,
        entailment_date
      }, (error, result) => {
        if(error){
          res.status(400)
          res.send(new returnBody(false, '', error))
        }else {
          res.status(200)
          res.send(new returnBody(true, result, undefined))
        }
      })
    }else if(type === roles.CLIENT){
      const { // data para creacion de establecimiento
        name,
        surname,
        qualification,
        address
      } = req.body

      result = await controller.SignUpClient({
        identification,
        username,
        email,
        phone, 
        password,
        name,
        surname,
        qualification,
        address
      }, (error, result) => {
        if(error){
          res.status(400)
          res.send(new returnBody(false, '', error))
        }else {
          res.status(200)
          res.send(new returnBody(true, result, undefined))
        }
      })

      // result = await controller.SignUpEstablishment({
      //   identification,
      //   username,
      //   email,
      //   phone, 
      //   password,
      //   establishment_name,
      //   establishment_type,
      //   city_id,
      //   district,
      //   schedule,
      //   qualification
      // },(error, result) => {
      //   if(error){
      //     res.status(400)
      //     res.send(new returnBody(false, '', error))
      //   }else {
      //     res.status(200)
      //     res.send(new returnBody(true, result, undefined))
      //   }
      // })


      
    }else if(type === roles.ESTABLISHMENT){
      const { // data para creacion de establecimiento
        establishment_name,
        establishment_type,
        city_id,
        district,
        schedule,
        qualification
      } = req.body


      result = await controller.SignUpEstablishment({
        identification,
        username,
        email,
        phone, 
        password,
        establishment_name,
        establishment_type,
        city_id,
        district,
        schedule,
        qualification
      },(error, result) => {
        if(error){
          res.status(400)
          res.send(new returnBody(false, '', error))
        }else {
          res.status(200)
          res.send(new returnBody(true, result, undefined))
        }
      })
    }else{
      res.status(400)
      return res.send(new returnBody(false, 'No se ingreso un tipo de usuario valido', undefined))
    }
    res.status(200)
    
  }catch(error){
    res.status(400)
    res.send(new returnBody(false, 'Hubo un error con los datos ingresados', `${error}`))
  }
  
})

router.get('/list-roles', async (req, res) => {
  res.status(200)
  res.send(roles)
})

router.post('/signin', auth.setUser , async (req, res) => {
  res.status(200)
  res.send({ userData: req.userData })
})

router.post('/changePassword',auth.setUser, auth.changePassword, async (req, res) => {
  res.status(200)
  res.send({ changed: true, data: req.userData})
})





// function authApi(app) {
//   const router = express.Router();
//   app.use("/api/auth", router);

//   const usersService = new UsersService();
//   router.post(
//     "/login",
//     [
//       check("username", "Provide an username").exists(),
//       check("password", "Provide an password").exists(),
//     ],
//     async function (req, res) {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       try {
//         const { username, password } = req.body;
//         const user = await usersService.getUser({ username });
//         const flag = await bcrypt.compare(password, user.password);
//         if (user && flag) {
//           res.status(200).json({ msg: "Login successfully" });
//         } else {
//           res
//             .status(400)
//             .json({ msg: "Login unsuccessfully or user no exist" });
//         }
//       } catch (error) {
//         res
//           .status(500)
//           .json({ error: error.message, msg: "Login unsuccessfully" });
//       }
//     }
//   );
// }

module.exports = router;
