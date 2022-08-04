// const fastify = require("fastify")();

const appConfig = "../config/appConfig.js";
const pgp = require('pg-promise')();
const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts, next) {
  // fastify.log.info(process.env.POSTGRES_URI);
  const db = pgp(process.env.POSTGRES_URI);

  fastify.decorate('db', db);
  next();
});

