'use strict';

import { assert } from 'chai';
import { Vegeta } from "../vegeta";


describe('vegeta', () => {
  describe("#export", () => {
    it("should be importable", () => {
      assert(typeof(Vegeta), "function");
    })
  })
})