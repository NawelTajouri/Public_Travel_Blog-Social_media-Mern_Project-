const User = require('../models/usermodel');
var jwt = require('jsonwebtoken');

const isAuth = async(req,res,next) => {
     const token =req.headers.authorization;
     try {
     var decoded = jwt.verify(token, process.env.SECRET);
    //  console.log(decoded);
    const user = await User.findById(decoded.userID).select("-password -confirmPassword");
    if (!user) {
        return res.status(401).json({msg:"UnAuthorized"})
    }
    req.user = user;
    next();
    
 }
catch (error) {
    res.status(401).send([{ msg: "UnAuthorized" }]);
  }
}


module.exports = isAuth;