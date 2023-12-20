'use strict'

const UserSchema = require('./1702979689213_user_schema')

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerRequestsSchema extends Schema {
  up () {
    this.create('customer_requests', (table) => {
      table.increments()
      table.string('first_name', 80).notNullable()
      table.string('last_name', 80).notNullable()
      table.string('email_address', 254).notNullable()
      table.string('title', 255).notNullable()
      table.text('message_text', 1000).defaultTo('').notNullable()
      table.string('file').nullable() // Assuming the file path or name is stored
      table.integer('user_id').unsigned() 
      table.foreign('user_id').references('users.id').onDelete('cascade') 
      table.timestamps()
    })
  }

  down () {
    this.drop('customer_requests')
  }
}

module.exports = CustomerRequestsSchema


