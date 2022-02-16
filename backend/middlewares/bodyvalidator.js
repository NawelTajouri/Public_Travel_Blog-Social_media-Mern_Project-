

const { body,check, validationResult, oneOf }=require('express-validator');


const signUpRules =(req) => [
    check("name", "name is required").notEmpty(),
    body("lastName", "last name is required").notEmpty(),
    body("username","username is required").notEmpty(),
    // body('picture', 'You must select an image.').notEmpty(),
    body("email", "email is not valid").isEmail(),
    body("password", "password must contains 6 characters").isLength({
      min: 6,
      max: 20,
    }),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        console.log(req.body.password)
            throw new Error('Password Confirmation does not match password');
       }
       return true;
  })
 
    
]


const signInRules =() => [
    
    // body("username","username is required").notEmpty(),
    // body("email","email is not valid").isEmail(),
    oneOf([
      check('username')
        .notEmpty()
        .withMessage('username is required'),


      check('email')

        .isEmail()
        .withMessage('email not valid'),
  ]),
    body("password","password must be 6 characters").isLength({min:6, max:20}),
]
const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(customError(errors.array()));
    } else next();
  };
  
  const customError = (errorsArray) =>
    errorsArray.map((err) => ({ msg: err.msg }));
module.exports= {validator,signUpRules,signInRules};