import express from './express'
import logger from './logger'

const start = () => {
  const appStartMessage = () => {
    const env = process.env.NODE_ENV
    logger.debug(`Initializing API`)
    logger.info(`Server Name : Mean test`)
    logger.info(`Environment  : ${env || 'development'}`)
    logger.info(`App Port : 3000`)
    logger.info(`Process Id : ${process.pid}`)
  }

  const app = express.init()
  app.listen(3000, appStartMessage)
}

export default start
