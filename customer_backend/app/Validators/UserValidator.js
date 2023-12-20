// app/Validators/UserValidator.js

'use strict'

const { schema, rules } = use('@adonisjs/core/build/standalone')

class UserValidator {
  schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    full_name: schema.string(),
    // Add other fields and validation rules as needed
  })
}

module.exports = UserValidator
