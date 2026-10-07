import { motion } from 'framer-motion';
import { Terminal, Lightbulb, TrendingUp } from 'lucide-react';
import './About.css';

const aboutCards = [
  {
    id: '01',
    title: 'FULL STACK DEVELOPMENT',
    icon: <Terminal size={24} />,
    desc: 'Building responsive frontends and robust, scalable backends using modern web technologies.'
  },
  {
    id: '02',
    title: 'PROBLEM SOLVING',
    icon: <Lightbulb size={24} />,
    desc: 'Approaching complex challenges logically to find efficient, elegant, and maintainable solutions.'
  },
  {
    id: '03',
    title: 'CONTINUOUS LEARNING',
    icon: <TrendingUp size={24} />,
    desc: 'Always staying up-to-date with the latest industry trends, tools, and best practices.'
  }
];

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-heading-container">
            <h2 className="section-title gradient-text">About Me</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="about-content">
            <div className="about-text glass-panel">
              <p>
                I'm a passionate developer and designer with a keen eye for aesthetics and a drive for robust engineering. With experience in creating digital products, I specialize in bridging the gap between design and technology.
              </p>
              <p>
                My approach focuses on user-centric design principles combined with clean, efficient code to build experiences that look beautiful and perform flawlessly across all devices.
              </p>
            </div>
            
            <div className="about-cards-grid">
              {aboutCards.map((card, index) => (
                <motion.div 
                  key={card.id}
                  className="about-card glass-panel"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="card-header">
                    <span className="card-id">{card.id}</span>
                    <div className="card-icon">{card.icon}</div>
                  </div>
                  <h4 className="card-title">{card.title}</h4>
                  <p className="card-desc">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
