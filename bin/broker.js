'use strict'

import * as mosca from 'mosca'

export default class Broker {
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
