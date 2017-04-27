'use strict'
// import * as Mqtt from 'mqtt'
import Server from './bin/server'
import { config } from './config'
import * as redis from 'redis'

console.log(config)


const ascoltatore = {
  type: 'redis',
  redis: redis,
  port: config.redis.port,
  host: config.redis.host
}

const settings = {
  port: process.env.NODE_PORT || 1337,
  backend: ascoltatore
}

const server = new Server(settings)
const vegeta = server.getBroker()

vegeta.on('published', (packet, client) => {
  if (packet.topic.indexOf('$SYS') === 0) return
  debugger;
  console.log('Client -   ', client.id.toString(), ' Payload - ' , packet.payload.toString(), 'on topic', packet.topic)
})

vegeta.on('ready', () => {
  console.log('MQTT Broker listening on port - ', process.env.NODE_PORT || 1337)
})
