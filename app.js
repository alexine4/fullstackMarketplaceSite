const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const Passport = require('./middleware/passport')
const connectionDB = require('./connection/connectionDB')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const initialilazationAll = require('./controllers/initializationDB')

const app = express()




connectionDB.sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

initialilazationAll.initialilazationAll()

app.use(passport.initialize())
Passport(passport)

app.use(require('morgan')('dev'))

app.use('/uploads', express.static('uploads'))

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)


module.exports = app