'use strict';

const Lucid = use('Lucid');
const guarded = require('./guard-mixin');

class User extends Lucid {
  apiTokens() {
    return this.hasMany('App/Model/Token');
  }

  static get fillable() {
    return [
      'email',
      'password',
    ];
  }
}

guarded(User);

module.exports = User;
