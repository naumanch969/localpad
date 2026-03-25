import type { FC } from 'react';
import { ExternalLink, Terminal, Trash2, Edit } from 'lucide-react';
import type { Project, Port } from '../types';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const openTab = (port: Port) => {
    const url = `http://localhost:${port.number}`;
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url });
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <motion.div 
      className="project-card"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="card-header" style={{ marginBottom: '4px' }}>
        <div className="project-icon" style={{ width: '28px', height: '28px' }}>
          <Terminal size={14} />
        </div>
        <div className="project-info">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'nowrap' }}>
            <h3 style={{ fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{project.name}</h3>
            <span className="framework-badge" style={{ fontSize: '0.5rem' }}>{project.framework}</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px', alignItems: 'center' }}>
          {!project.isDefault && (
            <>
              <button 
                className="btn-card-action" 
                onClick={() => onEdit(project)}
                title="Edit project"
              >
                <Edit size={14} />
              </button>
              <button 
                className="btn-card-action" 
                style={{ color: 'var(--error)' }}
                onClick={() => onDelete(project.id)}
                title="Delete project"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      <p className="project-note" style={{ marginBottom: '8px', fontSize: '0.75rem' }}>
        {project.note || 'No description available.'}
      </p>

      <div className="port-grid">
        {project.ports.map((port: Port) => (
          <div 
            key={port.id} 
            className="port-tag status-active"
            onClick={() => openTab(port)}
          >
            <div className="status-dot"></div>
            <span>{port.name} :{port.number}</span>
            <ExternalLink size={12} style={{ opacity: 0.6 }} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
