const postModel = require("../models/postmodel");
const User = require("../models/usermodel");

const UserProfile = (req,res) =>{
    User.findOne({_id:req.params.id})
    .select("-password -confirmPassword")
    .then(user=>{
         postModel.find({postedBy:req.params.id})
         .populate("postedBy","_id name picture")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).send({error:err})
             }
             res.send({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
}
const FollowUser = (req,res) =>{
    User.findByIdAndUpdate(req.body.followId,{
      $push:{followers:req.user._id}
  },{
      new:true
  },(err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }
    User.findByIdAndUpdate(req.user._id,{
        $push:{following:req.body.followId}
        
    },{new:true}).select("-password").then(result=>{
        res.send(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })
  
  }
  )
  }
const UnFollowUser = (req,res) =>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
}

module.exports = { UserProfile,FollowUser,UnFollowUser };