const express = require('express');
const { UserProfile,FollowUser, UnFollowUser } = require('../controllers/usercontroller');
const isAuth = require('../middlewares/authUser');

const router = express.Router();
router.get('/profileuser/:id',isAuth,UserProfile)
router.put('/follow',isAuth,FollowUser)
router.put('/unfollow',isAuth,UnFollowUser)
module.exports = router;