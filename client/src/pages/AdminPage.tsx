import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAdminMessages, loginAdmin, markMessageRead, deleteMessage } from '../api/contact'

type Message = {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '')
  const [messages, setMessages] = useState<Message[]>([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return
    const loadMessages = async () => {
      try {
        const response = await getAdminMessages(token)
        setMessages(response.data.messages)
      } catch {
        setError('Could not load messages.')
      }
    }
    loadMessages()
  }, [token])

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await loginAdmin({ email, password })
      const adminToken = response.data.token
      localStorage.setItem('adminToken', adminToken)
      setToken(adminToken)
      setError('')
    } catch {
      setError('Invalid credentials')
    }
  }

  const handleRead = async (id: string) => {
    try {
      await markMessageRead(id, token)
      setMessages((current) => current.map((message) => (message._id === id ? { ...message, read: true } : message)))
    } catch {
      setError('Could not mark as read.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMessage(id, token)
      setMessages((current) => current.filter((message) => message._id !== id))
    } catch {
      setError('Could not delete message.')
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    setToken('')
    navigate('/')
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(0,255,136,0.18),_transparent_32%),linear-gradient(135deg,_#02050A_0%,_#05070D_42%,_#02050A_100%)] px-6 py-16 text-slate-100">
        <div className="mx-auto max-w-md rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_0_60px_rgba(0,255,136,0.15)]">
          <h1 className="text-3xl font-semibold text-white">Admin Login</h1>
          <p className="mt-3 text-slate-400">Secure gateway to portfolio contact messages.</p>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
            <button className="w-full rounded-full bg-[#00FF88] px-4 py-3 font-semibold text-slate-950">Login</button>
          </form>
          {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(0,255,136,0.18),_transparent_32%),linear-gradient(135deg,_#02050A_0%,_#05070D_42%,_#02050A_100%)] px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#00FF88]">Dashboard</p>
            <h1 className="text-3xl font-semibold text-white">Contact Messages</h1>
          </div>
          <button onClick={logout} className="rounded-full border border-[#00FF88]/40 px-4 py-2 text-[#00FF88]">Logout</button>
        </div>
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Total</p>
            <p className="mt-2 text-3xl font-semibold text-white">{messages.length}</p>
          </div>
          <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Unread</p>
            <p className="mt-2 text-3xl font-semibold text-white">{messages.filter((message) => !message.read).length}</p>
          </div>
          <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Read</p>
            <p className="mt-2 text-3xl font-semibold text-white">{messages.filter((message) => message.read).length}</p>
          </div>
        </div>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message._id} className="rounded-[1.2rem] border border-white/10 bg-slate-950/70 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-white">{message.name}</h2>
                    {!message.read ? <span className="rounded-full bg-[#00FF88]/15 px-3 py-1 text-sm text-[#8dffbf]">New</span> : null}
                  </div>
                  <p className="mt-2 text-slate-400">{message.email}</p>
                  <p className="mt-2 font-medium text-[#00FF88]">{message.subject}</p>
                  <p className="mt-3 max-w-3xl leading-7 text-slate-300">{message.message}</p>
                </div>
                <div className="flex gap-3">
                  {!message.read ? <button onClick={() => handleRead(message._id)} className="rounded-full border border-[#00FF88]/40 px-4 py-2 text-[#00FF88]">Mark Read</button> : null}
                  <button onClick={() => handleDelete(message._id)} className="rounded-full border border-rose-400/40 px-4 py-2 text-rose-300">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
