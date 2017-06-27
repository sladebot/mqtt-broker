'use strict'
import * as mosca from 'mosca'
import flash from 'express-flash'
import express, { Router } from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import path from 'path'
import helmet from 'helmet'
import gzip from 'compression'
import winston from 'winston'
import mongoose from 'mongoose'
import Models from './app/models'
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

const mongoURI = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.collection}`
logger.debug(`Connecting to ${mongoURI}`)

mongoose.connect(mongoURI)

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
expressApp.use(session({
  secret: `iwjfnijenf8723ur2u3rb32r837ur2`,
  cookie: { secure: false }
}))
expressApp.use(flash())

expressApp.set('views', path.join(__dirname, './app/views'))
expressApp.use(express.static(path.join(__dirname, './public')))
expressApp.set('view engine', 'ejs')

/**
 * Models
 */

/**
 * ROUTES
 */

router.get('/dash', (req, res) => {
  res.render('index.ejs', {
    page: 'dash'
  })
})

router.get('/home/new', (req, res) => {
  res.render('pages/home_new.ejs')
})

router.post(`/home/new`, (req, res) => {
  const { home_title } = req.body
  let home = new Models.Home({
    title: home_title
  })
  home.save((err, data) => {
    if (err) {
      req.flash('error', 'Something went wrong')
    } else {
      req.flash('info', 'Smart Home created successfully')
    }
    res.redirect('/')
  })
})

expressApp.get('/', (req, res) => {
  res.render('pages/dash.ejs')
})
expressApp.use(router)

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
