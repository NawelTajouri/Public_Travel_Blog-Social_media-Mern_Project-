const express = require('express');
const router = express.Router();
const {signUp,signIn, getAuthUser, upload} = require('../controllers/authcontroller');
const {signUpRules,signInRules,validator}= require('../middlewares/bodyvalidator');
const isAuth = require('../middlewares/authUser');
// const{ FollowUser, UnFollowUser}=require('../controllers/authcontroller')

// router.put('/unfollow',isAuth,UnFollowUser)
/**
 * @params post /auth/signUp
 * @description sign up a user
 * @access PUBLIC
 */

router.post('/signUp',upload.single('picture'),signUpRules(),validator, signUp);
/**
 * @param POST /auth/signIn
 * @description sign in user
 * @access PUBLIC
 */

 router.post("/signIn", signInRules(), validator, signIn);

 /**
 * @param POST /auth/me
 * @description Get auth user
 * @access PRIVATE
 */

  router.get("/me",isAuth, getAuthUser);

  
module.exports = router;
