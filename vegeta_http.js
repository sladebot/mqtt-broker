'use strict'
import http from 'http'
import faye from 'faye'
import redis from 'faye-redis'
import { config } from './config'

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('HTTP Bayeux Broker')
})

const bayeux = new faye.NodeAdapter({
  mount: '/',
  timeout: 25,
  engine: {
    type: redis,
    host: config.redis.host,
    port: config.redis.port,
    database: 1,
    namespace: config.redis.namespace
  }
})

const port = process.env.NODE_PORT || 1338

bayeux.attach(server)
server.listen(port)

bayeux.on('subscribe', (clientId, channel) => {
  console.log(`Client ${clientId} connected on channel - ${channel}`)
})

bayeux.on('unsubscribe', (clientId, channel) => {
  console.log(`Client ${clientId} disconnected on channel - ${channel}`)
})

bayeux.getClient().subscribe('/messages', (msg) => {
  console.log('Vegeta | Got message - ' + JSON.stringify(msg.text))
})

console.log(`HTTP Broker listening on port - ${port}`)
