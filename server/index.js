const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio', {
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  console.log('MongoDB connected')
}).catch((error) => {
  console.error('Mongo connection error', error)
})

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' })
})

app.use('/api/contact', require('./routes/contact'))
app.use('/api/admin', require('./routes/admin'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
