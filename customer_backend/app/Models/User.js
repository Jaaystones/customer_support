'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  supportRequests() {
    return this.hasMany('App/Models/SupportRequest', 'id', 'user_id')
  }
}

module.exports = User
