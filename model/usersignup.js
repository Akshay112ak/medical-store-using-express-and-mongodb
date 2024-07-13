const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type:String,
    required:[true,"first name is required"]
  },
  lastname: {
    type:String,
    required:[true,"last name is required"]
  },
  email: {
    type:String,
    required:[true,"email is required"]
  },
  password: {
    type:String,
    required:[true,"password is required"],
    minlength:[6,'atleast 6 characters required']
  },
});

const User = mongoose.model('usersignup', userSchema);

module.exports = User;
