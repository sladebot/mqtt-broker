'use strict'

import * as mosca from 'mosca'
// import * as authorizer from './authorizer'

export default class Server {
  constructor (settings) {
    let done = () => {}
    this.settings = settings
    let broker = new mosca.Server(settings, done)
    this.broker = broker
    // broker.on('ready', () => {
    //   this.broker.authenticate
    //   this.broker.authorizePublish
    //   this.broker.authorizeSubscribe
    // })
  }
  getBroker () {
    return this.broker
  }
}
