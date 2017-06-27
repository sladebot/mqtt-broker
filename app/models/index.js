'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const homeSchema = new Schema({
  title: String,
  things: [{
    type: Schema.Types.ObjectId, ref: 'Thing'
  }]
})

const thingSchema = new Schema({
  _home: {type: Schema.Types.ObjectId, ref: 'Home'},
  clientId: String
})

const Home = mongoose.model('Home', homeSchema)
const Thing = mongoose.model('Thing', thingSchema)

export default {
  Home,
  Thing
}
