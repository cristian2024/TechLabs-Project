const express = require("express");

const User = require('../models/Users');
const auth = require('../middlewares/auth-user/auth')
// const UsersService = require("../services/user");
const bcrypt = require("bcrypt");
// const { check, validationResult } = require("express-validator");

// the router will receive the petitions from the user part
const router = express.Router();

// body for return information, its just an idea, it could be improve
function returnBody(isCompleted, data, error){
  this.isCompleted = isCompleted;
  this.data = data;
  this.error = error
}


router.post('/signup', async (req, res) => {
  const {
    document,
    name,
    surname,
    username,
    email,
    rol,
    password
  } = req.body;

  try {
    // throw new Error('Exception message');
    User.exists({ username }, (error, result) => {
      // managing error
      if (error) {
        res.status(400)
        res.send(new returnBody(false, {}, `${error}`))
      } else {
        if (result) {
          res.status(409)
          res.send(new returnBody(false, { isRepeated: true}, `The user already exists`))
        } else {
          // creating the user from the body data
          let user = new User({
            document,
            name,
            surname,
            username,
            email,
            rol,
            password
          });
          // saving the data in mongoose ant managing the possible errors
          user.save((err) => {
            if(err){
              res.status(400)
              res.send(new returnBody(false, {}, `${err}`))
            }else{
              // save was completed succesfully
              user.password = undefined;
              res.status(200)
              res.send(new returnBody(true, user, {}))
            }
          });  
        }
      }
    })
  } catch (error) {
    res.status(400)
    res.send(new returnBody(false, {}, `${error}`))
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
