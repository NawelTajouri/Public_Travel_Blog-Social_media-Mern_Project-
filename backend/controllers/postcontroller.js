const postModel = require("../models/postmodel");
const User = require("../models/usermodel");
// const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

// const readPost = (req, res) => {
//   PostModel.find((err, docs) => {
//     if (!err) res.send(docs);
//     else console.log("Error to get data : " + err);
//   }).sort({ createdAt: -1 });
// };
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ".././client/public/uploads/posts");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

const createPost = (req, res) => {
  const title = req.body.title;
  const message = req.body.message;
  const keyword = req.body.keyword;
  const picture = req.file.filename;
  // const user= User.findById(req.params._id)
  if (!title || !message || !picture) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }

  const post = new postModel({
    title,
    message,
    keyword,
    picture,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};
//All posts of all users
const GetAllPost = (req, res) => {
  postModel
    .find()
    .populate("postedBy", "_id name lastName username picture")
    .then((posts) => {
      res.send({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
};


//get sub post (posts of subscribed user)
const GetSubPost = (req, res) => {
  postModel
    .find({postedBy:{$in:req.user.following}})
    .populate("postedBy", "_id name lastName username picture")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then((posts) => {
      res.send({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
};
// get all posts for one user
// const getMyPost=async(req,res)=>{
//     const idpost=req.params.id
//   try {
//     const post=await postModel.find({postedBy:req.user._id})
//     if(!post){ return res.status(400).json([{ msg: "no post" }]); }
//   const onepost=  post.find((el)=>el.id==idpost)
//     res.send(onepost)
//   } catch (error) {
//       console.log(error)
//   }

// }
//get all posts for one user
const getMyPost = async (req, res) => {
  postModel
    .find({ postedBy: req.user._id })
    .populate("postedBy", "_id name picture")
    .then((mypost) => {
      res.send({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
};

//like a post
const likePost = async (req, res) => {
  postModel
    .findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
    .exec((err, result) => {
      if (err) {
        return res.status(422).send({ error: err });
      } else {
        res.send(result);
      }
    });
};
//unlike a post
const unlikePost = async (req, res) => {
  postModel
    .findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};
//Comment a post
const commentPost = async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  postModel
    .findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

//Delete a post by the user
const deletePost = async (req, res) => {
    postModel.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
};

module.exports = {
  upload,
  createPost,
  GetAllPost,
  getMyPost,
  likePost,
  unlikePost,
  commentPost,
  deletePost,
  GetSubPost,
};
