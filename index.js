const express = require('express')
const Contenedor = require('./Contenedor')
const contenedor = new Contenedor('./producto.txt');

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    const htmlBody = `
    <p><strong>Desafio coderhouse 32120</strong></p>
    <ul>      
      <li><a href="/productos" target="_blank">Productos</a></li>
      <li><a href="/productoRandom" target="_blank">Producto Random</a></li>
    </ul>`
    res.send(htmlBody)
  })

app.get('/productos', async (req, res) => {    
  try {
      const productos = await contenedor.getAll()
      res.status(STATUS_CODE.OK).json(productos)
    } catch (error) {
      console.log(error.message)
      res.status(STATUS_CODE.NOT_FOUND).end()
    }    
})

app.get('/productoRandom', async (req, res) => {    
  try {
      let id = Math.ceil(Math.random() * 3)
      console.log(`id aleatorio ${id}`)
      const producto = await contenedor.getById(id)
      res.status(STATUS_CODE.OK).json(producto)
    } catch (error) {
      console.log(error.message)
      res.status(STATUS_CODE.NOT_FOUND).end()
    }    
})


const server = app.listen(PORT, async () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)    
  await contenedor.init()
})

server.on("error", error => console.log(`Error en servidor ${error}`))