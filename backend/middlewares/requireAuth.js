

var jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token =req.headers.authorization;
  console.log(token)
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          
          res.send(200).json('no token')
        } else {
          console.log(decodedToken.id);
          next();
        }
      });
    } 
    else {
      console.log('No token');
    }
  };
  

module.exports = requireAuth;