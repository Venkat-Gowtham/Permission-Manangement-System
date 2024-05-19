// UserController.js
const User = require("../models/user");

const Trainers = require("../models/Trainers")
const addUser = async (req, res, next) => {
  console.log(req.body)
  const { Name, Roll, Phone, College, Batch, Date, File, Reason , TrainerName , TrainerId } = req.body;
  try {
    const user = new User({
      Name,
      Roll,
      Phone,
      College,
      Batch,
      File,
      Date,
      Reason,
      TrainerName,
      TrainerId
    });
    await user.save();
    res.status(200).json({ message: "Request Sent Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUsersByDate = async (req, res, next) => {
  const { date } = req.body;
  console.log(req.body)
  console.log("hello world")
  const val = "e45678"
  try {
    const users = await User.find({ Roll: val });
    if (!users || users.length === 0) {
      console.log("HWLLW")
      return res.status(404).json({ msg: "No users found for the given date" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getPending = async(req,res,next ) =>{
  

  try{
      const dataa = await User.find({Status:"Pending"})
      if(!dataa) {
        return res.status(404).json({msg:"No pending requests found"});
      }
      return res.status(200).json({data:dataa})
  }
  catch(err){
      return res.status(500).send("Error")
  }
  
}

const getAllPermissionsData = async (req, res, next) => {
  try {
    const counts = await User.aggregate([
      { $group: { _id: "$Status", count: { $sum: 1 } } }
    ]);

    let pendingCount = 0;
    let deniedCount = 0;

    // Iterate through the counts to find the count for each status
    counts.forEach(statusCount => {
      if (statusCount._id === "Pending") {
        pendingCount = statusCount.count;
      } else if (statusCount._id === "Denied") {
        deniedCount = statusCount.count;
      }
    });

    // If both counts are zero, return no pending requests found
    if (pendingCount === 0 && deniedCount === 0) {
      return res.status(404).json({ msg: "No pending or denied requests found" });
    }

    return res.status(200).json({ pendingCount, deniedCount });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error");
  }
};


const AllStatus = async(req,res,next) =>{
    
    try{
      const data = await User.find();
      if(!data){
        return res.status(404).json({ msg: "No pending or denied requests found" });
      }
      return res.status(200).json({ data: data});
      
    }
    catch(err){
      console.log(err);
      return res.status(500).send("Error");
    }
}
// updating to accept or deny 
const ChangeStatus = async (req, res, next) => {
  try {
    const { Roll, flag } = req.body;
      console.log(Roll,flag)
    // Find the user by Roll number
    const user = await User.findOne({ Roll });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update the status based on the flag value
    if (flag === 1) {
      user.Status = "Accepted";
    } else {
      user.Status = "Denied";
    }

    // Save the changes
    await user.save();

    return res.status(200).json({ msg: "Status updated successfully", data: user });
  } catch (err) {
    console.error("Error changing status:", err);
    return res.status(500).send("Error");
  }
};

// accepted list
const getAcceptorDeniedList = async(req,res,next) =>{
  
    const {flag} = req.body
    if(flag === 1){
      console.log("1")
      try{
        const dataa = await User.find({Status:"Accepted"})
        if(!dataa) {
          return res.status(404).json({msg:"No Accepted requests found"});
        }
        return res.status(200).json({data:dataa})
    }
      catch(err){
          return res.status(500).send("Error")
      }
    }
    else{
      try{
        const dataa = await User.find({Status:"Denied"})
        if(!dataa) {
          return res.status(404).json({msg:"No Denied requests found"});
        }
        return res.status(200).json({data:dataa})
    }
      catch(err){
          return res.status(500).send("Error")
      }
    }
}

///
// trainers Credentials

const requestLogin = async(req,res,next) =>{

    // const dataa = req.body
    const {TrainerId , Password} = req.body;

    console.log(req.body)
    try{
        const val = await Trainers.find({TrainerId:TrainerId ,Password:Password})
        if(!val){

          return res.status(404).json({msg:"No details found"});
        }
        return res.status(200).json({data:val})
    }
    catch(err){
      return res.status(500).send("Error")
    }

}

  const createUser = async(req,res,next) =>{

    console.log(req.body)
    const { TrainerName , TrainerId , Password} = req.body;
    try {
      const user = new Trainers({
        TrainerName,
        TrainerId,
        Password

      });
      await user.save();
      res.status(200).json({ message: "Request Sent Successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }

  }
// denied list

module.exports = {
  addUser,
  getUsersByDate,
  getPending,
  getAllPermissionsData,
  ChangeStatus,
  AllStatus,
  getAcceptorDeniedList,
  requestLogin,
  createUser
};
