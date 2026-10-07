import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        
        {/* Left Side */}
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="availability-badge">
              <span className="pulse-dot"></span>
              AVAILABLE FOR OPPORTUNITIES
            </div>
            
            <h2 className="greeting">Hi, I'm Prasanna Kumar V</h2>
            <h1 className="hero-title gradient-text">
              Full Stack Developer
            </h1>
            <p className="hero-subtitle">
              I build modern, scalable and user-focused web applications using frontend, backend and database technologies.
            </p>
            
            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                View My Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn-secondary">
                Download Resume <Download size={18} />
              </a>
            </div>

            <div className="hero-socials">
              <a href="#" className="social-icon" aria-label="GitHub"><FiGithub size={20} /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><FiLinkedin size={20} /></a>
            </div>
          </motion.div>
        </div>
        
        {/* Right Side - Creative Visual */}
        <div className="hero-visual">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="abstract-visual-container"
          >
            {/* Glowing Backdrop */}
            <div className="glow-sphere main-glow"></div>
            <div className="glow-sphere secondary-glow"></div>

            {/* Floating Terminal/Code interface */}
            <motion.div 
              className="code-window glass-panel"
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >


            </motion.div>

            {/* Orbiting Elements */}
            <div className="orbital-ring"></div>
            
            {/* Floating Tech Cards */}
            <motion.div className="floating-card tech-java animate-float" style={{ animationDelay: '0s' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" />
              <span>Java</span>
            </motion.div>
            
            <motion.div className="floating-card tech-react animate-float" style={{ animationDelay: '1s' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
              <span>React</span>
            </motion.div>
            
            <motion.div className="floating-card tech-node animate-float" style={{ animationDelay: '2s' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
              <span>Node.js</span>
            </motion.div>
            
            <motion.div className="floating-card tech-mongo animate-float" style={{ animationDelay: '1.5s' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
              <span>MongoDB</span>
            </motion.div>

            {/* Particles */}
            <div className="particles-container">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`particle p-${i % 10}`}></div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
