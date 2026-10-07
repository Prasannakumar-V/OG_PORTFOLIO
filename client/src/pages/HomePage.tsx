import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaDownload, FaRocket, FaBrain, FaShieldAlt, FaCode, FaServer, FaTools, FaBookOpen } from 'react-icons/fa'
import { BsCpu, BsLightningChargeFill } from 'react-icons/bs'
import { RiSendPlaneFill } from 'react-icons/ri'
import { gsap } from 'gsap'
import Lenis from 'lenis'
import SectionHeading from '../components/SectionHeading'
import { sendContactEmail } from '../api/contact'
import profileImage from '../assets/profile.png'

type ContactFormValues = {
  name: string
  email: string
  subject: string
  message: string
}

const skillGroups = [
  {
    title: 'Frontend',
    items: ['React', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
    icon: <FaCode className="text-[#00FF88]" />,
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB'],
    icon: <FaServer className="text-[#00FF88]" />,
  },
  {
    title: 'Programming',
    items: ['Python', 'Java', 'C'],
    icon: <BsCpu className="text-[#00FF88]" />,
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux'],
    icon: <FaTools className="text-[#00FF88]" />,
  },
]

const projects = [
  {
    title: 'AI Chat Assistant',
    description: 'An adaptive AI assistant with a polished chat experience, smart memory, and secure conversations.',
    tags: ['React', 'Node.js', 'OpenAI', 'Tailwind'],
    github: 'https://github.com/Prasannakumar-V',
    demo: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Blockchain Voting System',
    description: 'A transparent voting platform built for secure and tamper-resistant decision making.',
    tags: ['Solidity', 'React', 'MongoDB', 'Express'],
    github: 'https://github.com/Prasannakumar-V',
    demo: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Network Simulation',
    description: 'An interactive networking lab for packet flow, routing basics, and Cisco Packet Tracer inspired scenarios.',
    tags: ['Cisco', 'Networking', 'Python', 'UI'],
    github: 'https://github.com/Prasannakumar-V',
    demo: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Quantum Learning Platform',
    description: 'A premium study portal for quantum computing concepts, visual explainers, and hands-on learning.',
    tags: ['React', 'Three.js', 'Education', 'AI'],
    github: 'https://github.com/Prasannakumar-V',
    demo: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
  },
]

const experience = [
  { year: '2024 — Present', title: 'Full Stack Developer', description: 'Building production-grade SaaS products with React, Node.js, and modern cloud integrations.' },
  { year: '2023 — 2024', title: 'AI & Blockchain Explorer', description: 'Crafted AI-first automation tools and decentralized web experiences for growing teams.' },
  { year: '2022 — 2023', title: 'Web Developer', description: 'Delivered polished websites and interactive dashboards optimized for performance and accessibility.' },
]

const certifications = [
  { title: 'Advanced React', detail: 'Modern patterns, hooks, and scalable architecture.' },
  { title: 'Cybersecurity Essentials', detail: 'Threat modeling, secure development, and defense principles.' },
  { title: 'Blockchain Basics', detail: 'Smart contracts, consensus, and decentralized product design.' },
]

export default function HomePage() {
  const [status, setStatus] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>()

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  useEffect(() => {
    gsap.from('.reveal', {
      opacity: 0,
      y: 28,
      duration: 1,
      stagger: 0.16,
      ease: 'power3.out',
      delay: 0.1,
    })
  }, [])

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await sendContactEmail(data)
      setStatus('Your message was sent successfully. I will reply shortly.')
      reset()
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setStatus(error.response.data.message)
      } else {
        setStatus('The form could not be submitted right now. Please email me directly.')
      }
    }
  }

  return (
    <div className="portfolio-shell min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(0,255,136,0.18),_transparent_32%),linear-gradient(135deg,_#02050A_0%,_#05070D_42%,_#02050A_100%)] text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-16 h-64 w-64 rounded-full bg-[#00FF88]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <header className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <a href="#home" className="text-lg font-semibold tracking-[0.3em] text-[#00FF88]">PRASANNA</a>
        <nav className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 sm:gap-6 sm:text-sm">
          <a href="#about" className="transition hover:text-[#00FF88]">About</a>
          <a href="#projects" className="transition hover:text-[#00FF88]">Projects</a>
          <a href="#contact" className="transition hover:text-[#00FF88]">Contact</a>
          <a href="/admin" className="rounded-full border border-[#00FF88]/40 px-4 py-2 text-[#00FF88] transition hover:bg-[#00FF88]/10">Admin</a>
        </nav>
      </header>

      <main id="home" className="mx-auto flex max-w-7xl flex-col gap-20 px-6 pb-16 lg:px-10">
        <section className="grid items-center gap-12 rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-[0_0_80px_rgba(0,255,136,0.12)] backdrop-blur-2xl lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 px-3 py-2 text-sm text-[#8dffbf]">
              <BsLightningChargeFill /> Premium Full Stack Developer
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
                Prasanna Kumar
              </h1>
              <p className="text-2xl font-medium text-[#8dffbf] sm:text-3xl">Full Stack Developer</p>
              <p className="text-xl text-slate-300">AI Enthusiast • Blockchain Learner • Builder of real-world systems</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/Prasanna-Kumar-Resume.pdf" download className="inline-flex items-center gap-2 rounded-full bg-[#00FF88] px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]">
                <FaDownload /> Download Resume
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-[#00FF88]/40 px-6 py-3 font-semibold text-[#00FF88] transition hover:bg-[#00FF88]/10">
                <FaRocket /> Hire Me
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-2"><FaShieldAlt /> Cybersecurity Mindset</span>
              <span className="flex items-center gap-2"><FaBrain /> AI-First Thinking</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 rounded-[2rem] bg-[#00FF88]/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-[0_0_60px_rgba(0,255,136,0.18)]">
              <img src={profileImage} alt="Prasanna Kumar" className="h-[380px] w-full rounded-[1.4rem] object-cover object-top" />
              <div className="mt-4 flex items-center justify-between rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-sm text-slate-400">Availability</p>
                  <p className="font-semibold text-white">Open for freelance & full-time work</p>
                </div>
                <div className="rounded-full bg-[#00FF88]/20 px-3 py-1 text-sm text-[#8dffbf]">Available</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
          <SectionHeading eyebrow="About" title="Passionate Developer, Curious Builder" description="I am a full stack developer from India who loves turning ideas into polished products. I am driven by AI, blockchain, networking, and quantum computing, and I enjoy building secure, high-impact applications with modern user experiences." />
          <div className="grid gap-4 text-slate-300">
            <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-lg leading-8">I create clean, scalable, and accessible digital experiences that blend strong engineering foundations with premium visuals. From backend APIs to polished frontend interfaces, I enjoy building products that feel fast, elegant, and reliable.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/70 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-[#00FF88]">Focus</p>
                <p className="mt-2 text-lg text-white">AI systems, secure architectures, and blockchain products.</p>
              </div>
              <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/70 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-[#00FF88]">Philosophy</p>
                <p className="mt-2 text-lg text-white">Build with speed, clarity, and long-term maintainability.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl lg:p-10">
          <SectionHeading eyebrow="Skills" title="Technologies I Work With" description="I blend front-end craftsmanship, back-end engineering, and modern developer tooling to deliver dependable products." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group) => (
              <motion.div whileHover={{ y: -6, scale: 1.01 }} key={group.title} className="rounded-[1.2rem] border border-white/10 bg-slate-950/70 p-6">
                <div className="mb-4 flex items-center gap-3 text-lg font-semibold text-white">{group.icon}<span>{group.title}</span></div>
                <ul className="space-y-2 text-slate-300">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#00FF88]" />{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl lg:p-10">
          <SectionHeading eyebrow="Projects" title="Selected Work With Premium Craft" description="Each project reflects thoughtful product design, polished visuals, and a strong engineering backbone." />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <motion.article whileHover={{ y: -8, scale: 1.01 }} key={project.title} className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950/70">
                <img src={project.image} alt={project.title} className="h-52 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#00FF88]/25 bg-[#00FF88]/10 px-3 py-1 text-sm text-[#8dffbf]">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={project.github} target="_blank" rel="noreferrer" className="rounded-full border border-[#00FF88]/40 px-4 py-2 text-sm text-[#00FF88] transition hover:bg-[#00FF88]/10">GitHub</a>
                    <a href={project.demo} target="_blank" rel="noreferrer" className="rounded-full bg-[#00FF88] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:shadow-[0_0_24px_rgba(0,255,136,0.35)]">Live Demo</a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl lg:p-10">
          <SectionHeading eyebrow="Experience" title="Career Timeline" description="A steady path building modern products with a deep interest in AI, cloud, and secure systems." />
          <div className="mt-10 space-y-6">
            {experience.map((item, index) => (
              <motion.div initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} key={item.title} className="rounded-[1.2rem] border border-white/10 bg-slate-950/70 p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#00FF88]">{item.year}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="max-w-2xl text-slate-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <SectionHeading eyebrow="Education" title="Academic Foundation" description="A strong technical base rooted in computer science, engineering, and constant self-learning." />
            <div className="mt-8 rounded-[1.2rem] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[#00FF88]">College</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Computer Science & Engineering</h3>
              <p className="mt-3 text-slate-300">Academic foundation in software engineering, systems, and emerging technologies.</p>
              <p className="mt-2 text-slate-300">Focused on practical projects, continuous learning, and responsible technology.</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Certifications" title="Credentials & Growth" description="Continuously sharpening my skills with modern tools and emerging technologies." />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {certifications.map((cert) => (
                <motion.div whileHover={{ y: -6 }} key={cert.title} className="rounded-[1.2rem] border border-white/10 bg-slate-950/70 p-5">
                  <div className="flex items-center gap-2 text-[#00FF88]"><FaBookOpen /><span className="font-semibold text-white">{cert.title}</span></div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{cert.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl lg:p-10">
          <SectionHeading eyebrow="Contact" title="Let’s Build Something Exceptional" description="Whether it’s a startup idea, a freelance build, or an ambitious product, I’d love to connect." />
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[#00FF88]">Reach me</p>
              <div className="mt-6 space-y-4 text-slate-300">
                <a href="mailto:prasanna.maanvizhi18@gmail.com" className="flex items-center gap-3 transition hover:text-[#00FF88]"><FaEnvelope /> prasanna.maanvizhi18@gmail.com</a>
                <a href="tel:+917305674328" className="flex items-center gap-3 transition hover:text-[#00FF88]"><FaPhone /> +91 73056 74328</a>
                <a href="https://github.com/Prasannakumar-V" target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-[#00FF88]"><FaGithub /> GitHub</a>
                <a href="https://www.linkedin.com/in/v-prasanna-kumar-817301386?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-[#00FF88]"><FaLinkedin /> LinkedIn</a>
                <a href="https://www.instagram.com/pr-as-an-na" target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-[#00FF88]"><FaInstagram /> Instagram</a>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-[1.4rem] border border-white/10 bg-slate-950/70 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-300">
                  Name
                  <input {...register('name', { required: 'Name is required' })} className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0" />
                  {errors.name && <span className="mt-1 block text-sm text-rose-400">{errors.name.message}</span>}
                </label>
                <label className="text-sm text-slate-300">
                  Email
                  <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' } })} className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0" />
                  {errors.email && <span className="mt-1 block text-sm text-rose-400">{errors.email.message}</span>}
                </label>
              </div>
              <label className="mt-4 block text-sm text-slate-300">
                Subject
                <input {...register('subject', { required: 'Subject is required' })} className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0" />
                {errors.subject && <span className="mt-1 block text-sm text-rose-400">{errors.subject.message}</span>}
              </label>
              <label className="mt-4 block text-sm text-slate-300">
                Message
                <textarea rows={5} {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message should be at least 10 characters' } })} className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0" />
                {errors.message && <span className="mt-1 block text-sm text-rose-400">{errors.message.message}</span>}
              </label>
              <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#00FF88] px-6 py-3 font-semibold text-slate-950 transition hover:shadow-[0_0_24px_rgba(0,255,136,0.35)] disabled:opacity-70">
                <RiSendPlaneFill /> {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {status ? <p className="mt-4 text-sm text-[#8dffbf]">{status}</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/70 px-6 py-8 text-center text-sm text-slate-400 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Prasanna Kumar. Crafted for a premium digital presence.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="https://github.com/Prasannakumar-V" target="_blank" rel="noreferrer" className="transition hover:text-[#00FF88]"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/v-prasanna-kumar-817301386?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="transition hover:text-[#00FF88]"><FaLinkedin /></a>
            <a href="https://www.instagram.com/pr-as-an-na" target="_blank" rel="noreferrer" className="transition hover:text-[#00FF88]"><FaInstagram /></a>
            <a href="mailto:prasanna.maanvizhi18@gmail.com" className="transition hover:text-[#00FF88]"><FaEnvelope /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
