const {
  payment
} = require('../validation/bolt.schema');

module.exports = {

  payment: async (req, res, next) => {
    const value = await payment.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: 0,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  }



 
};
