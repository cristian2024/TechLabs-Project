const express = require("express");


const auth = require('../middlewares/auth-user/auth')
const roles = require('../middlewares/auth-user/roles')

const controller = require('../controllers/authentication')

const router = express.Router();

// body for return information, its just an idea, it could be improve
function returnBody(isCompleted, data, error){
  this.isCompleted = isCompleted;
  this.data = data;
  this.error = error
}
'/api/authentication/signup'



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
  // validando el tipo de usuairo a ingresar
  try {
    let result
    if(type === roles.BENEFICIARY)
      result = await controller.SignUpBeneficiary()
    else if(type === roles.CLIENT)
      result = await controller.SignUpClient()
    else if(type === roles.ESTABLISHMENT)
      result = await controller.SignUpEstablishment((error, result) => {
        if(error){
          res.status(400)
          res.send(new returnBody(false, '', error))
        }else {
          res.status(200)
          res.send(new returnBody(true, result, undefined))
        }
      })
    else{
      res.status(400)
      return res.send(new returnBody(false, 'No se ingreso un tipo de usuario valido', undefined))
    }
    res.status(200)
    
  }catch(error){
    res.status(400)
    res.send(new returnBody(false, 'Hubo un error con los datos ingresados', error))
  }
  
})


router.post('/signin', auth.setUser , async (req, res) => {
  res.status(200)
  res.send({ userData: req.userData })
})

router.post('/changePassword',auth.setUser, auth.changePassword, async (req, res) => {
  res.status(200)
  res.send({ changed: true, data: req.userData})
})


router.get('/list-roles', async (req, res) => {
  res.status(200)
  res.send(roles)
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
