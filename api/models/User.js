/**
* User.js
*
* @description :: This is the base representation for the user credentials
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    salt: {
      type: 'string',
      required: true
    },
    token: {
      type: 'string',
      unique: true,
      defaultsTo: null
    }
  }
};
