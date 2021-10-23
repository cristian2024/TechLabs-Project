const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const ROLES = require("../utils/roles")

// iteraciones de encriptado, entre mas mejor, aunque consume mas recursos
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  document: {
    type: Number,
    // required: true
  },
  name: {
    type: String,
    // required: true
  },
  surname: {
    type: String,
    // required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    // required: true
  },
  rol: {
    type: String,
    default: ROLES.CLIENT,
    enum: ROLES
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function(next) {
  const data = this;
  if (this.isNew || this.isModified('')) {
    bcrypt.hash(data.password, saltRounds, (error, hasshedPassword) => {
      if(error) {
        next(error);
      } else {
        // se modifica el valor de la contraseña por una contraseña encriptada
        data.password = hasshedPassword;
        next()
      }
    });
  } else {
    next();
  }
});

userSchema.method('isCorrectPassword', function (password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if(err) {
      callback(err);
    }else {
      callback(err, same);
    }
  })
})


const User = mongoose.model('User', userSchema);

module.exports = User;