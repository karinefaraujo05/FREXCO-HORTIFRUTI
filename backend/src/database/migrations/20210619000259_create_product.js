
exports.up = function(knex) {
  return knex.schema.createTable('products', function(table){
    table.increments();
    table.string('name').notNullable();
    table.string('date').notNullable();
    table.string('crop').notNullable(); /* safra */
    table.string('validity').notNullable();
    table.string('quantity').notNullable();
    table.decimal('value').notNullable();
    
    table.string('store_id').notNullable();
    table.foreign('store_id').references('id').inTable('store');
    
});
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};

