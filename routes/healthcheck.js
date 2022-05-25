"use strict";

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {}
    handler: async (request, reply) => {
      return { root: true };
    },
  });
  next();
  // fastify.get('/', async function (request, reply) {
  //     return { root: true }
  // })
};
