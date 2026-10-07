const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Message = require('../models/Message')

const router = express.Router()

const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('admin123', 10)

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET || 'portfolio-secret', (error) => {
    if (error) return res.status(401).json({ message: 'Unauthorized' })
    next()
  })
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const isValid = email === adminEmail && bcrypt.compareSync(password, adminPasswordHash)

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'portfolio-secret', { expiresIn: '1h' })
  res.json({ token })
})

router.get('/messages', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.json({ messages })
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch messages' })
  }
})

router.patch('/messages/:id/read', verifyToken, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    res.json({ message })
  } catch (error) {
    res.status(500).json({ message: 'Unable to update message' })
  }
})

router.delete('/messages/:id', verifyToken, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete message' })
  }
})

module.exports = router
