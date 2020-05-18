import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router() // En routing, router == app. Pero router tiene esta funcion exclusivamente. Permite subdividir el app en distintas ramas

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// es necesario montar el router a la app:
app.use('/api', router)
// Cualquier ruta que comience con /api, la va a manejar las rutas que defini en mi router.

const myLogger = (req, res, next) => {
  // Esto es un middleware, una funcion que te permite trabajar con la response antes de devolverla
  console.log('middleware logging')
  next() // llama a la funcion que pasa en el argumento 'next'. Literalmente, lo siguiente que pasa cuando esta funcion termina
}

// app.use(mylogger)
// De esta forma, la app usa el middleware antes de devolver cada ruta.

app.get('/', [myLogger, myLogger], (req, res) => {
  // En este caso, antes de la ruta /, el middleware myLogger se va a ejecutar 2 veces en orden
  // get request for index
  // Diferentes matches en la ruta:
  // '/*' <- Cualquier cosa despues de slach
  //   '/:id <-igual al parametro id
  res.send({ message: 'Hello baby' })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'ok' })
})

app.put('/data', (req, res) => {
  res.send({ message: 'putty' })
})

app.get('/data', (req, res) => {
  res.send({ message: 'This is what youve sent on the get' })
})
app.post('/data', (req, res) => {
  console.log(req.body)
  res.send({ ok: true })
})

export const start = () => {
  app.listen(3000, () => {
    console.log('Server started on 3k')
  })
}
