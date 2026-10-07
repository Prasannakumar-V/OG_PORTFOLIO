import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

emailjs.init({
  publicKey: 'ee3We8cq6FiGL9-Er',
});
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage('All fields are required');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please provide a valid email');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('submitting');
    
    try {
      await emailjs.send(
        'service_9gelm6m',
        'template_rr9zy3m',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setErrorMessage('Failed to send message. Please try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-heading-container">
            <h2 className="section-title gradient-text">LET'S BUILD SOMETHING</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="contact-wrapper glass-panel">
            <div className="contact-info-panel">
              <h3 className="contact-heading">Have an idea or opportunity?</h3>
              <p className="contact-subheading">Let's connect and create something extraordinary.</p>
              
              <div className="contact-details">
                <a href="mailto:hello@portfolio.com" className="contact-item">
                  <div className="contact-icon"><Mail size={20} /></div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>hello@portfolio.com</p>
                  </div>
                </a>
                
                <div className="contact-item">
                  <div className="contact-icon"><MapPin size={20} /></div>
                  <div className="contact-text">
                    <h4>Location</h4>
                    <p>India</p>
                  </div>
                </div>
              </div>
              
              <div className="contact-socials">
                <h4>Follow Me</h4>
                <div className="social-links">
                  <a href="#" className="social-circle"><FiGithub size={20} /></a>
                  <a href="#" className="social-circle"><FiLinkedin size={20} /></a>
                </div>
              </div>
            </div>
            
            <div className="contact-form-panel">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="form-control"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required 
                    placeholder="Subject of your message"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    className="form-control"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    placeholder="Tell me about your project or opportunity..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className={`submit-btn ${status === 'success' ? 'btn-success' : status === 'error' ? 'btn-error' : 'btn-primary'}`}
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <span className="loader"></span>
                  ) : status === 'success' ? (
                    <><CheckCircle2 size={18} /> Message sent successfully!</>
                  ) : status === 'error' ? (
                    <><AlertCircle size={18} /> {errorMessage || 'Failed, try again'}</>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
