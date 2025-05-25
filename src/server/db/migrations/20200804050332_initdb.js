export async function up(knex) {
  await knex.schema.createTable('users', function (table) {
    table.string('id').primary().notNullable(); // es: auth0|xyz123
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('endpoints', function (table) {
    table.increments('id').primary().notNullable();
    table.string('name').notNullable();
    table.string('url').notNullable();
    table.boolean('status').notNullable();
    table.integer('incidents').notNullable();
    table.integer('responseTime').notNullable();
    table.integer('prev_incidents').notNullable();
    table.integer('prev_responseTime').notNullable();
    table.jsonb('responseTimeArray');
    table.integer('website');
    table.integer('api');
    table.string('notes');

    // Foreign key
    table.string('user_id').notNullable();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('endpoints');
  await knex.schema.dropTableIfExists('users');
}
