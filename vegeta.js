'use strict'
// import * as Mqtt from 'mqtt'
import Server from './bin/server'
import * as redis from 'redis'

const ascoltatore = {
  type: 'redis',
  redis: redis,
  db: 12,
  port: 6379,
  host: process.env.REDIS_HOST || 'localhost'
}

const settings = {
  port: process.env.NODE_PORT || 1337,
  backend: ascoltatore
}

const server = new Server(settings)
const vegeta = server.getBroker()

vegeta.on('published', (packet, client) => {
  if (packet.topic.indexOf('$SYS') === 0) return
  console.log('ON PUBLISHED ', packet.payload.toString(), 'on topic', packet.topic)
})

vegeta.on('ready', () => {
  console.log('MQTT Broker listening on port - ', process.env.NODE_PORT || 1337)
})
