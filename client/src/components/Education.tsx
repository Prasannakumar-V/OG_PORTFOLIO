import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import './Education.css';

const educationData = [
  {
    id: 1,
    institution: 'IFET College',
    course: 'Bachelor of Engineering in Computer Science',
    duration: '2020 - 2024',
    desc: 'Focused on software engineering, algorithms, and full-stack web development.'
  },
  {
    id: 2,
    institution: 'St Anne Matriculation School',
    course: 'Higher Secondary Education',
    duration: '2018 - 2020',
    desc: 'Completed with a focus on Computer Science and Mathematics.'
  },
  {
    id: 3,
    institution: 'St Mary Matriculation School',
    course: 'Secondary Education',
    duration: '2016 - 2018',
    desc: 'Foundation studies.'
  }
];

export default function Education() {
  return (
    <section id="education" className="education-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-heading-container">
            <h2 className="section-title gradient-text">EDUCATION</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {educationData.map((item, index) => (
              <motion.div 
                key={item.id}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="timeline-node">
                  <div className="node-inner"></div>
                </div>
                
                <div className="timeline-content glass-panel">
                  <div className="timeline-header">
                    <div className="inst-header">
                      <GraduationCap size={20} className="inst-icon" />
                      <h3 className="institution">{item.institution}</h3>
                    </div>
                    <span className="duration">{item.duration}</span>
                  </div>
                  <h4 className="course">{item.course}</h4>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
