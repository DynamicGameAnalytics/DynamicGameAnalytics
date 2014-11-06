/**
* Storage.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    path: {
      type: 'string',
      required: true,
      unique: true,
      index: true
    },
    data: {
      type: 'json',
      required: true
    }
  }
};
