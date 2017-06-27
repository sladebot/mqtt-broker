const config = {
  redis: {
    host: process.env.REDIS_MASTER_SERVICE_HOST || 'localhost',
    port: 6379,
    namespace: 'vegeta::broker'
  },
  mongodb: {
    host: process.env.MONGO_MASTER_SERVICE_HOST || 'localhost',
    port: process.env.MONGO_MASTER_SERVICE_PORT || 27017,
    collection: 'vegeta'
  }
}

export { config }
