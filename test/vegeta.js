'use strict';

import { assert } from 'chai';
import { Vegeta } from "../vegeta";

/**
 * Vegeta Rises !
 */
describe('vegeta', () => {
  describe("#export", () => {
    it("should be importable", () => {
      assert(typeof(Vegeta), "function");
    })
  })
})