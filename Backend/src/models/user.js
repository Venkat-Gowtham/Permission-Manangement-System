//FILENAME : User.js

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Roll: {
    type: String,
    required: true
  },
  Phone: {
    type: Number,
    required: true
  },
  College: {
    type: String,
    // required: true
  },
  Batch: {
    type: String,
    // required: true
  },
  Date:{
    type :String,
    // required: true
  },
  TrainerName:{
    type:String,
  },
  TrainerId:{
    type:String,
  },
  File :{
    type:String,
    // required : true
  },
  Reason:{
    type:String,
    // required : true
  },
  Status:{
    type : String,
    default:"Pending"
  }


  }
);

// export model user with UserSchema
module.exports = mongoose.model("StudentRequests", UserSchema);