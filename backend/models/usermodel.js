const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const schema = mongoose.Schema;
//schema
const userSchema = new schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  picture: {
    type: String,
    trim: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  // bio :{
  //   type: String,
  //   max: 1024,
  // },
  followers:[{type:ObjectId,ref:"User"}],
  following:[{type:ObjectId,ref:"User"}],
  // role: {
  //   type: String,
  //   enum: ['admin', 'member'],
  //   required: true
  // }
  // likes: {
  //   type: [String]
  // }

});
/**********************model***************/
// module.exports = User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);