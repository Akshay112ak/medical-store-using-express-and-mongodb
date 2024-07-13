const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
  uniqueid: {
    type: String,
    required: [true, "si no must be unique"],
    unique: [true, "si no must be unique"],
  },
  medicinename: {
    type: String,
    required: [true, "name is required"]
  },
  company: {
    type: String,
    required: [true, "company is required"]
  },
  expirydate: {
    type: Date,
    required: [true, "expiry date is required"],
  },
  addedtime: {
    type: Date,
  },
  price:
  {
    type:Number,
    min:[0,"price cannot be negative"]
  },
  stock: {
    type: Number,
    required: [true, 'stock is required'],
    min: [0, "stock cannot be negative"]
  },
  userid: {
    type: String,
    required: true,
  }
});

userSchema.plugin(mongoosePaginate);

// Pre-save middleware to enforce the limit of 5 medicines per user
userSchema.pre('save', async function (next) {
  try {
    const User = mongoose.model('usermedicine');
    const userMedicinesCount = await User.countDocuments({ userid: this.userid });
    console.log(`User ${this.userid} already has ${userMedicinesCount} medicines`); // Debug log

    if (userMedicinesCount >= 5) {
      const error = new Error('User can only have up to 5 medicines');
      return next(error);
    }
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('usermedicine', userSchema);

module.exports = User;
