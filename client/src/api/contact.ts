import axios from 'axios'
import emailjs from '@emailjs/browser'

type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function sendContactEmail(payload: ContactPayload) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID"
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID"
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"

  if (serviceId && templateId && publicKey) {
    try {
      await emailjs.send(serviceId, templateId, payload, publicKey)
    } catch (error) {
      console.error("EmailJS Error:", error)
    }
  }

  return axios.post(`${API_URL}/contact`, payload)
}

export async function loginAdmin(payload: { email: string; password: string }) {
  return axios.post(`${API_URL}/admin/login`, payload)
}

export async function getAdminMessages(token: string) {
  return axios.get(`${API_URL}/admin/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function markMessageRead(id: string, token: string) {
  return axios.patch(`${API_URL}/admin/messages/${id}/read`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function deleteMessage(id: string, token: string) {
  return axios.delete(`${API_URL}/admin/messages/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
