const express = require('express')
const session = require('express-session')

require('dotenv').config()
const app = express()

const { SERVER_PORT, SESSION_SECRET } = process.env

const { isAdmin, isAuthenticated, requestTime } = require('./middlewares')

app.use(express.json())

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365
  }
}))

app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  next()
})

app.use(express.static(`${__dirname}/../assets`))

app.post('/api/cart', isAuthenticated, (req, res) => {
  req.session.cart.push(req.body)
  res.send('successfully added item to cart')
})

app.get('/api/cart', isAuthenticated, (req, res) => {
  res.send(req.session.cart)
})

app.use(isAdmin)

app.get('/admin/products', (req, res) => {
  res.send('you are an admin!!!!!!!!!!!!!!!!!!!!!!!!')
})
app.post('/admin/products', (req, res) => {
  res.send('you are an admin!!!!!!!!!!!!!!!!!!!!!!!!')
})
app.put('/admin/products', (req, res) => {
  res.send('you are an admin!!!!!!!!!!!!!!!!!!!!!!!!')
})
app.delete('/admin/products', (req, res) => {
  res.send('you are an admin!!!!!!!!!!!!!!!!!!!!!!!!')
})


app.listen(SERVER_PORT, () => console.log('listening on port', SERVER_PORT))