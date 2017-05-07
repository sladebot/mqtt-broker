'use strict'
import * as mosca from 'mosca'
import Server from './bin/server'
import { config } from './config'
import * as redis from 'redis'

const ascoltatore = {
  type: 'redis',
  redis: redis,
  port: config.redis.port,
  host: config.redis.host
}

const settings = {
  port: process.env.NODE_PORT || 1337,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Redis,
    port: config.redis.port,
    host: config.redis.host
  }
}

const server = new Server(settings)
const vegeta = server.getBroker()


function ascii (a) { return a.charCodeAt(0); }

function getASCIIofString(string) {
  return string.split("").map(ascii).reduce((a, b) => a + b, 0)
}

vegeta.on('ready', () => {
  console.log('MQTT Broker listening on port - ', process.env.NODE_PORT || 1337)
})

vegeta.on('clientConnected', (client) => {
  console.log('Client connected with id - ' + client.id)
})

vegeta.on('published', (packet, client) => {
  if (packet.topic.indexOf('$SYS') === 0) return
  let cpuCalculate = getASCIIofString(packet.payload.toString()) + Math.floor(Math.random()*100)
  console.log('CPU Calculated sum of ASCII of string - ' + cpuCalculate)
  console.log('TOPIC / CHANNEL -  ' + packet.topic)
  console.log('Message received from - ' + client.id.toString() + ' || Payload - ' + packet.payload.toString())
  console.log('Broker Relaying ! ', packet.payload.toString(), 'on topic', packet.topic)
})
