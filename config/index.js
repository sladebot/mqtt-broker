const config = {
  redis: {
    host: process.env.REDIS_MASTER_SERVICE_HOST || 'localhost',
    port: 6379,
    namespace: 'vegeta::broker'
  }
}

export { config }
