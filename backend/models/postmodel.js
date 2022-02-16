const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema(
  {

    postedBy:{
      type:ObjectId,
      ref:"User"
   },
   title:{
    type:String,
    required:true
},
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    keyword:{type: String},
    picture: {
      type: String,
      trim: true,
    },
    likes:[{type:ObjectId,ref:"User"}],

    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('postModel', PostSchema);