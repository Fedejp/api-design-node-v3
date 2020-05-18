import { Router } from 'express'
import { crudControllers } from '../../utils/crud'

const router = Router()

router
  .route('/')
  .get(crudControllers.getOne)
  .post(crudControllers.createOne)

router
  .route('/:id')
  .get(crudControllers.getOne)
  .put(crudControllers.updateOne)
  .delete(crudControllers.deletOne)

export default router
