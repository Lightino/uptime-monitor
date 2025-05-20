export async function up(knex) {
  await knex.schema.createTable('endpoints', function (table) {
    table.increments('id').primary().notNull();
    table.string('name').notNull();
    table.string('url').notNull();
    table.boolean('status').notNull();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTable('endpoints');
}
