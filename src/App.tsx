import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStorage } from './services/storage';
import type { Project } from './types';
import ProjectCard from './components/ProjectCard';
import ProjectForm from './components/ProjectForm';

const COMMON_PORT_CATEGORIES = [
  { 
    name: 'Databases', 
    ports: [
      { id: '1', name: 'Postgres', number: 5432 },
      { id: '2', name: 'MySQL', number: 3306 },
      { id: '3', name: 'Redis', number: 6379 },
      { id: '4', name: 'MongoDB', number: 27017 },
      { id: '5', name: 'Cassandra', number: 9042 },
      { id: '6', name: 'Neo4j', number: 7474 },
      { id: '7', name: 'Neo4j Bolt', number: 7687 },
      { id: '8', name: 'ElasticSearch', number: 9200 },
    ] 
  },
  { 
    name: 'Infra & Messaging', 
    ports: [
      { id: '9', name: 'Docker', number: 2375 },
      { id: '10', name: 'Kafka', number: 9092 },
      { id: '11', name: 'RabbitMQ', number: 5672 },
      { id: '12', name: 'RabbitMQ UI', number: 15672 },
      { id: '13', name: 'MinIO API', number: 9000 },
      { id: '14', name: 'MinIO UI', number: 9001 },
      { id: '15', name: 'Zookeeper', number: 2181 },
    ] 
  }
];

const App: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useStorage();
  const [view, setView] = useState<'list' | 'form'>('list');
  const [tab, setTab] = useState<'pads' | 'common'>('pads');
  const [search, setSearch] = useState('');
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);

  const filteredProjects = useMemo(() => {
    return projects.filter((p: Project) => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.framework?.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

  const openForm = (project?: Project) => {
    setEditingProject(project);
    setView('form');
  };

  const handleSaveProject = (data: Omit<Project, 'id' | 'createdAt'>) => {
    if (editingProject) {
      updateProject(editingProject.id, data);
    } else {
      addProject(data);
    }
    setView('list');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Delete this pad?')) {
      deleteProject(id);
    }
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {view === 'list' ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="view-wrapper"
          >
            <header className="header">
              <div className="brand">
                <span style={{ color: 'var(--primary)' }}>Local</span>Pad
              </div>
              <button className="btn-new" onClick={() => openForm()}>
                + New Pad
              </button>
            </header>

            <div className="discovery-area">
              <div className="tabs">
                <button 
                  className={`tab-btn ${tab === 'pads' ? 'active' : ''}`}
                  onClick={() => setTab('pads')}
                >
                  My Pads
                </button>
                <button 
                  className={`tab-btn ${tab === 'common' ? 'active' : ''}`}
                  onClick={() => setTab('common')}
                >
                  Common Ports
                </button>
              </div>

              <div className="search-container">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder={tab === 'pads' ? "Search your pads..." : "Search infra ports..."}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <main style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
              {tab === 'pads' ? (
                projects.length > 0 ? (
                  <div className="project-list">
                    {filteredProjects.map((project: Project) => (
                      <ProjectCard 
                        key={project.id} 
                        project={project} 
                        onEdit={openForm}
                        onDelete={handleDeleteProject}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState onCreate={() => openForm()} />
                )
              ) : (
                <div className="project-list">
                  {COMMON_PORT_CATEGORIES.map(cat => (
                    <div key={cat.name} style={{ marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>
                        {cat.name}
                      </h4>
                      <div className="port-grid">
                        {cat.ports
                          .filter(p => search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.number.toString().includes(search))
                          .map(p => (
                            <div key={p.id} className="port-tag" onClick={() => window.open(`http://localhost:${p.number}`, '_blank')}>
                              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{p.number}</span>
                              <span style={{ opacity: 0.8 }}>{p.name}</span>
                            </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>

            <footer className="footer">
              <span className="footer-text">Click port to open</span>
              <span className="footer-text">{tab === 'pads' ? projects.length : 'Library'} Total</span>
            </footer>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="view-wrapper"
          >
            <ProjectForm 
              initialData={editingProject}
              onSave={handleSaveProject}
              onCancel={() => setView('list')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EmptyState: React.FC<{ onCreate: () => void }> = ({ onCreate }) => (
  <div className="empty-state">
    <div className="empty-icon">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" />
      </svg>
    </div>
    <h2>No Local Pads Found</h2>
    <p>Add your first project to start tracking your local development ports.</p>
    <button className="btn-new" onClick={onCreate} style={{ margin: '0 auto', padding: '10px 20px' }}>
      Create Your First Pad
    </button>
  </div>
);

export default App;
