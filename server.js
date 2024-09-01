#!/usr/bin/env node
import Fastify from 'fastify'
import lib from './lib.js';
const fastify = Fastify()
fastify.get('/mydrivers', async (request, reply) => {
    return await lib.fetchFilter()
})
await fastify.listen({ port: 12081, host: '::' })
