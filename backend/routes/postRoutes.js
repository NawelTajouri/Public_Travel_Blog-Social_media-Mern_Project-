const express = require('express');
const { createPost,readPost,upload, GetAllPost, getMyPost, likePost, unlikePost, commentPost, deletePost, GetSubPost } = require('../controllers/postcontroller');
const { validator } = require('../middlewares/bodyvalidator');
const isAuth = require('../middlewares/authUser');


const router = express.Router();

// router.get('/profile',readPost());
router.post('/newpost',upload.single('picture'),isAuth,createPost);
router.get('/allpost',isAuth,GetAllPost);
router.get('/mypost/:id',isAuth,getMyPost);
router.get('/mypost',isAuth,getMyPost);
router.get('/getsubpost',isAuth,GetSubPost);

router.put('/like',isAuth,likePost);
router.put('/unlike',isAuth,unlikePost);

router.put('/comment',isAuth,commentPost);
router.delete('/deletepost/:postId',isAuth,deletePost)


module.exports = router;
// upload.single("picture"), 