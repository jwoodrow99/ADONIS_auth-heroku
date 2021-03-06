'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddPasswordResetToUsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
        table.string('reset_token').nullable().default(null);
        table.dateTime('resetAt').nullable().default(null);
    })
  }

  down () {
    this.alter('users', (table) => {
        table.dropColumn('reset_token');
        table.dropColumn('resetAt');
    })
  }
}

module.exports = AddPasswordResetToUsersSchema
