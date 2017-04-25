'use strict'

import { assert } from 'chai'
// import { Vegeta } from '../vegeta'
import * as Mqtt from 'mqtt'

/**
 * Vegeta Rises !
 */
describe('vegeta', () => {
  describe('export', () => {
    // it('should be importable', () => {
    //   assert(typeof (Vegeta), 'function')
    // })

    it('should be able to import mqtt', () => {
      assert(Mqtt !== undefined)
    })
  })
})
