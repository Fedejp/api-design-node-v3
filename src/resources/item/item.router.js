import { Router } from 'express'
import controllers from './item.controllers'

/**
 *  res.status('200') // set the status code for the response. Chainable (se puede concatenar con otros metodos)
 * res.send({...}) // Sends whatever you want, kind of smart, but still needs other things for more complex formats.
 * res.json({...}) // Explicitly sends json
 * res.end() // ends the response
 * res.send() == return. DO NOT write anything else after that.

 */

const router = Router()

// /api/item
router
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
