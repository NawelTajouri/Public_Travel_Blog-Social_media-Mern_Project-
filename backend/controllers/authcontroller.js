const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '.././client/public/uploads/profile');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter });
const signUp = async (req, res) => {

  
    // const {name, lastName,username,email,password,confirmPassword}= req.body
    const name= req.body.name;
    const lastName= req.body.lastName;
    const username= req.body.username;
    const picture =  req.file.filename;
    const email= req.body.email;
    const password= req.body.password;
    const confirmPassword= req.body.confirmPassword;
    
  try {
    let user = await User.findOne({ email });
    //1- check if the user already exits
    if (user) {
      return res.status(400).json([{ msg: "This user is already exists" }]);
    }

    //2- create new  user
    user = new User({
      name,
      lastName,
      username,
    picture,
      email,
      password,
      confirmPassword,
    });

    //3- hash the passord
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    //hash the confirmedpassord
    const saltconf = await bcrypt.genSalt(10);
    user.confirmPassword = await bcrypt.hash(confirmPassword, saltconf);
    // 4- save the user
    await user.save();

    //5 - login the user (token)
    const payload = {
      userID: user._id,
    };
    console.log(user.name);
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" }); 
    // for passeport
    // const token = "Bearer " + jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });

    //6- RESPONSE
    res.send({
      token,
      user
    });
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (req, res) => {
  const {email, password } = req.body;
  try {
    //1 check if the user exist
    // let user = await User.findOne({ email,username });
    let user = await User.findOne(
      {email}
    )
  console.log(user)
    if (!user) {
      return res.status(400).json([{ msg: "bad credentials" }]);
    }
    //2 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send([{ msg: "Bad credentials (password) " }]);
    }
    //3 login user (token)4
    const payload = {
      userID: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    // const token = "Bearer " + jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    //4- RESPONSE
    res.send({
      token,
      user
    });
  } catch (error) {
    console.log(error);
  }
};



const getAuthUser=(req,res) =>{
  res.send({ user: req.user })
}


// const FollowUser = (req,res) =>{
//   User.findByIdAndUpdate(req.body.followId,{
//     $push:{followers:req.user._id}
// },{
//     new:true
// },(err,result)=>{
//     if(err){
//         return res.status(422).json({error:err})
//     }
//   User.findByIdAndUpdate(req.user._id,{
//       $push:{following:req.body.followId}
      
//   },{new:true}).select("-password").then(result=>{
//       res.send(result)
//   }).catch(err=>{
//       return res.status(422).json({error:err})
//   })

// }
// )
// }

// const UnFollowUser = (req,res) =>{
//   User.findByIdAndUpdate(req.body.unfollowId,{
//       $pull:{followers:req.user._id}
//   },{
//       new:true
//   },(err,result)=>{
//       if(err){
//           return res.status(422).json({error:err})
//       }
//     User.findByIdAndUpdate(req.user._id,{
//         $pull:{following:req.body.unfollowId}
        
//     },{new:true}).select("-password").then(result=>{
//         res.json(result)
//     }).catch(err=>{
//         return res.status(422).json({error:err})
//     })

//   }
//   )
// }
module.exports = { upload,signUp,signIn,getAuthUser };
