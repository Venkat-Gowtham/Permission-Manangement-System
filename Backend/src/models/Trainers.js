const mongoose = require("mongoose")

const TrainerSchema = mongoose.Schema({
    TrainerName: {
      type: String,
      required: true
    },
    TrainerId:{
        type:String,
        required:true
    }
    ,
    Password:{
        type:String,
        required:true
    }
    }
  );
  
  // export model user with UserSchema
  module.exports = mongoose.model("TrainerCredentials", TrainerSchema);