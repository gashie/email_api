const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

const schema = {
 payment: Joi.object({
    donarid:Joi.number().required().label('DonarID'),
    amount: Joi.number().required().label("Amount"),
    ft: Joi.string().required().label("Ft"),
    deceasedid: Joi.number().required().label("DeceasedID"),
    currency: Joi.number().min(1).max(14).label("Currency"),
    // dte: Joi.date().format('YYYY-MM-DD').utc().required().label('Date'),
    // tme: Joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/).required().label('CreatedTime'),
    // status: Joi.string().valid('PROCESSED','REVERSED').required().label("Status"),
    // ismomo:Joi.string().required().label('Is Momo?').valid('YES','NO'),
    // momo: Joi.string().allow(null, '').label('Momo Number'),
      // .min(10)
      // .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
      // .message("Invalid momo number"),
      // moddte: Joi.date().format('YYYY-MM-DD').utc().required(),
      // modtme: Joi.string().regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/),
      // momotid: Joi.string().label("MomoID"),
      // momostatus: Joi.string().valid('PROCESSED').label("Momo Status"),
      // companyid:Joi.number().required().label('CompanyID'),
      iscalpay: Joi.string().valid('YES','NO').valid('YES','NO').label("Is CALYPAY"),
      calpayinvoice: Joi.string().label("CALYPAY Invoice Message"),
      calpayresponse: Joi.string().label("CALYPAY Response Message"),
      t24ft: Joi.string().label("T24 FT"),
      t24response: Joi.string().label("T24 Response Message"),
      // digitrans: Joi.string().required().valid('YES','NO').label("DigiTrans"),
      // pstatus: Joi.string().required().label("Payment Status"),

   
  }),
};

module.exports = schema;
