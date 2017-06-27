'use strict'
import * as mosca from 'mosca'
import express from 'express'
import { Router } from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import flash from 'express-flash'
import gzip from 'compression'
import winston from 'winston'
import BrokerServer from './bin/broker'
import { config } from './config'
import * as redis from 'redis'
import { getASCIIofString } from './util'

winston.emitErrs = true

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
})


const ascoltatore = {
  type: 'redis',
  redis: redis,
  port: config.redis.port,
  host: config.redis.host
}

const settings = {
  port: process.env.NODE_PORT || 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Redis,
    port: config.redis.port,
    host: config.redis.host
  }
}

const mqttBrokerServer = new BrokerServer(settings)
const vegeta = mqttBrokerServer.getBroker()



/**
 * HTTP Server for UI & Routes
 */
const expressApp = express()
const router = Router()

if (process.env.NODE_ENV === 'production') {
  expressApp.use(gzip())
  expressApp.use(helmet())
}

expressApp.use(bodyParser.json())
expressApp.use(bodyParser.urlencoded({
  extended: true
}))


expressApp.set('views', path.join(__dirname, '/views'));
expressApp.use(express.static(path.join(process.cwd(), 'public')))
expressApp.set('view engine', 'ejs')
/**
 * ROUTES
 */

router.get('/home', (req, res) => {
  res.render('home.ejs')
})

expressApp.get('/', (req, res) => {
  res.render('index.ejs')
})
expressApp.use('/api/v1', router)


expressApp.set('port', (process.env.PORT || 3000))


expressApp.listen(expressApp.get('port'), () => {
  logger.info('--------------------------')
  logger.info('----------  HTTP ------------')
  logger.info('===> 😊  Starting Server . . .')
  logger.info(`===>  Environment: ${process.env.ENV}`)
  logger.info(`===>  Listening on port: ${expressApp.get('port')}`)
  logger.info('--------------------------')
  logger.info('--------------------------')
  logger.info('--------------------------')
})


/**
 * MQTT BROKER
 */

vegeta.on('ready', () => {
  logger.info('')
  logger.info('')
  logger.info('')
  logger.info('')
  logger.info('--------------------------')
  logger.info('----------  MQTT ------------')
  logger.info('===> 😊  Starting MQTT Broker . . .')
  logger.info('--------------------------')
  logger.info('--------------------------')
  logger.info('--------------------------')

  logger.info('MQTT Broker listening on port - ', process.env.NODE_PORT || 1883)
})

vegeta.on('clientConnected', (client) => {
  logger.info('Client connected with id - ' + client.id)
})

vegeta.on('published', (packet, client) => {
  if (packet.topic.indexOf('$SYS') === 0) return
  let cpuCalculate = getASCIIofString(packet.payload.toString()) + Math.floor(Math.random() * 100)
  logger.info('CPU Calculated sum of ASCII of string - ' + cpuCalculate)
  logger.info('TOPIC / CHANNEL -  ' + packet.topic)
  logger.info('Message received from - ' + client.id.toString() + ' || Payload - ' + packet.payload.toString())
  logger.info('Broker Relaying ! ', packet.payload.toString(), 'on topic', packet.topic)
})
