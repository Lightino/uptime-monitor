import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

import knexFile from './knexfile.js';
import knexInit from 'knex';
import bookshelfInit from 'bookshelf';
import jsonColumns from 'bookshelf-json-columns';
import modelBaseInit from 'bookshelf-modelbase';

console.log(`Environment ${process.env.NODE_ENV}`);

const dbConfig = knexFile[process.env.NODE_ENV];

const knex = knexInit(dbConfig);
const bookshelf = bookshelfInit(knex);
bookshelf.plugin(jsonColumns);
const ModelBase = modelBaseInit(bookshelf);

function connectToDb() {
  // The easiest way to check for valid connection is a basic select
  return knex
    .raw('select 1+1 as result')
    .then(() => {
      console.log('✅\tConnected to DB');
    })
    .catch((error) => {
      console.log(`❌\tError connecting to DB: ${JSON.stringify(error)}`);
      throw new Error(error);
    });
}

function migrateToLatest() {
  return knex.migrate
    .latest(dbConfig.migrations)
    .then((result) => {
      console.log(`✅\tMigration of DB completed: ${JSON.stringify(result)}`);
    })
    .catch((error) => {
      console.log(`❌\tError migrating DB: ${JSON.stringify(error)}`);
      throw new Error(error);
    });
}

export {
  knex,
  bookshelf,
  ModelBase,
  migrateToLatest,
  connectToDb
};
