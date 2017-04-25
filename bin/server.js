'use strict'

import * as mosca from 'mosca'

export default class Server {
  constructor (settings) {
    let done = () => {}
    this.settings = settings
    let broker = new mosca.Server(settings, done)
    this.broker = broker
  }
  getBroker () {
    return this.broker
  }
}
