const pool = require('../config/db');
let nsawadb = {};

nsawadb.create = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO cash SET ?', [postData], (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};


  module.exports = nsawadb;