import path from 'path'
import router from '../server/router'
import HomeController from '@controllers/Home'

const initRoutes = app => {
  router.get('/api/initialvalues', HomeController.index)
  router.post('/api/initialvalues', HomeController.update)
  app.use(router)
}

export default initRoutes
