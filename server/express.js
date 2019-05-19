import express from 'express'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import logger from './logger'
import routesInitiator from '../routes'
import cors from 'cors'


// Initialize express app
const app = express()



const initMiddleware = () => {


  // Showing stack errors
  app.set('showStackError', true)

  // Enable jsonp
  app.enable('jsonp callback')

  app.use((req, res, next) => {
    req.logger = logger
    next()
  })

  app.use(bodyParser.json({
    extended: true
  }))
  app.use(express.static('views'))
  
  app.use(methodOverride())
  app.use(cors());
}


const initErrorRoutes  = () => {
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }
    logger.error(err.stack)
  })
}

const init = () => {
  // Initialize Express middleware
  initMiddleware()

  // Initialize modules server routes
  routesInitiator(app)

  // Initialize error routes
  initErrorRoutes()
  return app
}

export default {init};