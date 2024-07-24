const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const jwt = require('jsonwebtoken');
module.exports = {
  checkToken: (req, res, next) => {
    {
      let token = req.get('authorization');

      if (!token) {
         res
          .status(401)
          .json({
            success: false,
            message: 'Access Denied, No Token Provided',
          });
      }

      token = token.slice(7);
      jwt.verify(token, process.env.jwtPrivateKey, (err, decoded) => {
        if (err) {
          res.status(401).json({ success: false, message: 'Invalid Token' });
          
        }else{
        next()
      }
      });
    }
  },
  checkActivation: (req, res, next) => {
    {
      let token = req.get('authorization');

      if (!token) {
         res.status(401).send('Access Denied. No token provided');
      } else {
        token = token.slice(7);
        jwt.verify(token, process.env.jwtPrivateKey, (err, decoded) => {
          if (err) {
             res
              .status(401)
              .json({ success: false, message: 'Invalid Token' });
          }

          if (decoded.id.status === 'activated') {
            next();
          }
          res
            .status(403)
            .json({ success: false, message: 'Account not Activated' });
        });
      }
    }
  },
};
