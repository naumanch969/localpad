import { useState } from 'react';
import type { FC } from 'react';
import { ArrowLeft, Plus, Trash2, Globe } from 'lucide-react';
import type { Project, Port, Framework } from '../types';

interface ProjectFormProps {
  initialData?: Project | null;
  onSave: (data: Omit<Project, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const ProjectForm: FC<ProjectFormProps> = ({ initialData, onSave, onCancel }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [note, setNote] = useState(initialData?.note || '');
  const [framework, setFramework] = useState<Framework>(initialData?.framework || 'Other');
  const [ports, setPorts] = useState<Port[]>(initialData?.ports || [
    { id: crypto.randomUUID(), name: 'Dev', number: 3000 }
  ]);

  const addPort = () => {
    setPorts([...ports, { id: crypto.randomUUID(), name: '', number: 8000 }]);
  };

  const removePort = (id: string) => {
    if (ports.length === 1) return;
    setPorts(ports.filter((p: Port) => p.id !== id));
  };

  const updatePort = (id: string, field: keyof Port, value: string | number) => {
    setPorts(ports.map((p: Port) => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name,
      note,
      framework,
      ports: ports.filter((p: Port) => p.number > 0),
      isDefault: initialData?.isDefault || false
    });
  };

  return (
    <div className="form-view">
      <header className="header" style={{ marginBottom: '16px', border: 'none' }}>
        <button className="btn-back" onClick={onCancel}>
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
          {initialData ? 'Edit Pad' : 'New Pad'}
        </h2>
        <div style={{ width: 32 }} />
      </header>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name</label>
          <input 
            autoFocus
            placeholder="e.g. Portfolio"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Context / Note</label>
          <textarea 
            placeholder="What is this environment for?"
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={2}
            className="form-textarea"
            style={{ resize: 'none' }}
          />
        </div>

        <div className="form-group">
          <label>Technology</label>
          <select 
            value={framework} 
            onChange={e => setFramework(e.target.value as Framework)}
            className="form-select"
          >
            <option value="Next.js">Next.js</option>
            <option value="React">React</option>
            <option value="Django">Django</option>
            <option value="FastAPI">FastAPI</option>
            <option value="Vue">Vue</option>
            <option value="Flask">Flask</option>
            <option value="MongoDB">MongoDB</option>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="MySQL">MySQL</option>
            <option value="Redis">Redis</option>
            <option value="Kafka">Kafka</option>
            <option value="Docker">Docker</option>
            <option value="RabbitMQ">RabbitMQ</option>
            <option value="ElasticSearch">ElasticSearch</option>
            <option value="Cassandra">Cassandra</option>
            <option value="Zookeeper">Zookeeper</option>
            <option value="MinIO">MinIO</option>
            <option value="Neo4j">Neo4j</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="ports-section" style={{ padding: '10px' }}>
          <div className="ports-header">
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Endpoints</span>
            <button type="button" className="btn-add-inline" onClick={addPort}>
              <Plus size={12} /> Add
            </button>
          </div>
          
          <div className="port-coll">
            {ports.map((port: Port) => (
              <div key={port.id} className="port-row-item">
                <div style={{ position: 'relative', flex: 1 }}>
                  <Globe size={12} style={{ position: 'absolute', left: '8px', top: '10px', opacity: 0.4 }} />
                  <input 
                    placeholder="Name" 
                    value={port.name}
                    className="form-input"
                    style={{ paddingLeft: '28px', fontSize: '0.8rem' }}
                    onChange={e => updatePort(port.id, 'name', e.target.value)}
                  />
                </div>
                <input 
                  type="number"
                  className="form-input port-input-num"
                  style={{ width: '90px', fontSize: '0.85rem' }}
                  placeholder="Port" 
                  value={port.number || ''}
                  onChange={e => updatePort(port.id, 'number', parseInt(e.target.value) || 0)}
                />
                {ports.length > 1 && (
                  <button 
                    type="button" 
                    className="btn-remove-port" 
                    onClick={() => removePort(port.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-save-full">
          {initialData ? 'Update Project' : 'Launch Pad'}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
