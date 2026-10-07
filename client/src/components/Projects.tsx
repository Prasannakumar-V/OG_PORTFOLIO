import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Smart Helmet',
    desc: 'An IoT-based smart helmet designed to enhance rider safety with real-time accident detection and emergency alert capabilities.',
    tech: ['IoT', 'C++', 'Arduino', 'Sensors'],
    image: 'https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=1000&auto=format&fit=crop',
    github: '#',
    live: '#'
  },
  {
    id: 2,
    title: 'PR Agents',
    desc: 'A comprehensive management system for public relations tracking, client management, and campaign analytics.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
    github: '#',
    live: '#'
  },
  {
    id: 3,
    title: 'Smart Attendance',
    desc: 'Automated attendance tracking system using biometric or facial recognition data to streamline institutional record keeping.',
    tech: ['Python', 'OpenCV', 'MySQL', 'Flask'],
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop',
    github: '#',
    live: '#'
  },
  {
    id: 4,
    title: 'Role Management System',
    desc: 'An enterprise application for managing user roles, permissions, and hierarchical access control across organizations.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'React'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
    github: '#',
    live: '#'
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-heading-container">
            <h2 className="section-title gradient-text">FEATURED PROJECTS</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                className="project-card glass-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image-container">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <span className="view-details-btn">View Details <ChevronRight size={16} /></span>
                  </div>
                </div>
                
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  
                  <div className="project-tech">
                    {project.tech.slice(0, 3).map(tech => (
                      <span key={tech} className="tech-chip">{tech}</span>
                    ))}
                    {project.tech.length > 3 && <span className="tech-chip">+{project.tech.length - 3}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
            <motion.div 
              className="project-modal glass-panel"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                <X size={24} />
              </button>
              
              <div className="modal-image-container">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              
              <div className="modal-content">
                <h2 className="modal-title gradient-text">{selectedProject.title}</h2>
                
                <div className="modal-section">
                  <h3>Overview</h3>
                  <p>{selectedProject.desc}</p>
                </div>
                
                <div className="modal-section">
                  <h3>Technologies Used</h3>
                  <div className="project-tech">
                    {selectedProject.tech.map(tech => (
                      <span key={tech} className="tech-chip">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <a href={selectedProject.github} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                    <FiGithub size={18} /> View Source
                  </a>
                  {selectedProject.live !== '#' && (
                    <a href={selectedProject.live} className="btn-primary" target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
