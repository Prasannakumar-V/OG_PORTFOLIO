import { motion } from 'framer-motion';
import { Layout, Server, Database, Wrench } from 'lucide-react';
import './Skills.css';

const skillCategories = [
  {
    title: 'Frontend',
    icon: <Layout size={20} />,
    skills: [
      { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
    ]
  },
  {
    title: 'Backend',
    icon: <Server size={20} />,
    skills: [
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' }
    ]
  },
  {
    title: 'Database',
    icon: <Database size={20} />,
    skills: [
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' }
    ]
  },
  {
    title: 'Tools',
    icon: <Wrench size={20} />,
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invertDark: true },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'REST API', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/network/network-original.svg' } // Using network as placeholder for REST API
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-heading-container">
            <h2 className="section-title gradient-text">TECH STACK</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="skills-grid">
            {skillCategories.map((category, catIndex) => (
              <motion.div 
                key={category.title}
                className="skill-category glass-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.15 }}
              >
                <div className="category-header">
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.title}</h3>
                </div>
                
                <div className="skills-list">
                  {category.skills.map(skill => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-img-container">
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className={skill.invertDark ? 'invert-on-dark' : ''}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
                        />
                      </div>
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-indicator"></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
