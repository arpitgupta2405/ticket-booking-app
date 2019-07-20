/**
 * TokenService

 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

const jwt = require('jsonwebtoken');

// Generates a token from supplied payload
module.exports.issue = function(payload) {
  return jwt.sign(
    payload,
    sails.config.custom.jwtSecretKey, {
      expiresIn: '365d'
    }
  );
};

// Verifies token on a request
module.exports.verify = function(token, callback) {
  return jwt.verify(
    token,
    sails.config.custom.jwtSecretKey, {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback // Pass errors or decoded token to callback
  );
};

module.exports.BookingIdOpts = function() {
  let passwordOpts;

  passwordOpts = {};
  passwordOpts.length = 10;
  passwordOpts.numbers = true;
  passwordOpts.uppercase = true;

  return passwordOpts;
};
