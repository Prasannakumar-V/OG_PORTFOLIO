const express = require('express')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const Message = require('../models/Message')

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email' })
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Message service is unavailable. Please start MongoDB and try again.' })
  }

  try {
    const newMessage = await Message.create({ name, email, subject, message })

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVER_EMAIL || 'prasanna.maanvizhi18@gmail.com',
        subject: `New portfolio message: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      })
    }

    res.status(201).json({ message: 'Message saved successfully', data: newMessage })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message })
  }
})

module.exports = router
