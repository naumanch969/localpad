import { useState, useEffect, useCallback } from 'react';
import type { Project } from '../types';

const STORAGE_KEY = 'localpad_projects';

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'p-mongo',
    name: 'MongoDB',
    note: 'Standard document-oriented database.',
    framework: 'MongoDB',
    ports: [{ id: 'pr-mongo', name: 'DB Port', number: 27017 }],
    createdAt: Date.now(),
    isDefault: true
  },
  {
    id: 'p-pg',
    name: 'PostgreSQL',
    note: 'Robust relational database.',
    framework: 'PostgreSQL',
    ports: [{ id: 'pr-pg', name: 'DB Port', number: 5432 }],
    createdAt: Date.now(),
    isDefault: true
  },
  {
    id: 'p-redis',
    name: 'Redis',
    note: 'In-memory data structure store.',
    framework: 'Redis',
    ports: [{ id: 'pr-redis', name: 'Redis Port', number: 6379 }],
    createdAt: Date.now(),
    isDefault: true
  },

  {
    id: 'p-docker',
    name: 'Docker API',
    note: 'Docker engine management.',
    framework: 'Docker',
    ports: [{ id: 'pr-docker', name: 'API (HTTP)', number: 2375 }],
    createdAt: Date.now(),
    isDefault: true
  },
  {
    id: 'p-kafka',
    name: 'Kafka Broker',
    note: 'Distributed event streaming platform.',
    framework: 'Kafka',
    ports: [{ id: 'pr-kafka', name: 'Broker', number: 9092 }],
    createdAt: Date.now(),
    isDefault: true
  },
  {
    id: 'p-rabbitmq',
    name: 'RabbitMQ',
    note: 'Messaging broker/queueing.',
    framework: 'RabbitMQ',
    ports: [{ id: 'pr-rabbitmq', name: 'AMQP', number: 5672 }],
    createdAt: Date.now(),
    isDefault: true
  },
  {
    id: 'p-es',
    name: 'ElasticSearch',
    note: 'Search engine and analytics.',
    framework: 'ElasticSearch',
    ports: [{ id: 'pr-es', name: 'HTTP Client', number: 9200 }],
    createdAt: Date.now(),
    isDefault: true
  },
  {
    id: 'p-zk',
    name: 'ZooKeeper',
    note: 'Centralized service for config & synchronization.',
    framework: 'Zookeeper',
    ports: [{ id: 'pr-zk', name: 'Client', number: 2181 }],
    createdAt: Date.now(),
    isDefault: true
  },
  {
    id: 'p-minio',
    name: 'MinIO',
    note: 'High performance object storage.',
    framework: 'MinIO',
    ports: [{ id: 'pr-minio', name: 'API', number: 9000 }],
    createdAt: Date.now(),
    isDefault: true
  },
  {
    id: 'p-cassandra',
    name: 'Cassandra',
    note: 'Distributed NoSQL database.',
    framework: 'Cassandra',
    ports: [{ id: 'pr-cassandra', name: 'CQL', number: 9042 }],
    createdAt: Date.now(),
    isDefault: true
  },
  {
    id: 'p-neo4j',
    name: 'Neo4j',
    note: 'Graph database management system.',
    framework: 'Neo4j',
    ports: [{ id: 'pr-neo', name: 'HTTP', number: 7474 }],
    createdAt: Date.now(),
    isDefault: true
  }
];

export const useStorage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const save = useCallback(async (list: Project[]) => {
    try {
      if (typeof chrome === 'undefined' || !chrome.storage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } else {
        await chrome.storage.local.set({ [STORAGE_KEY]: list });
      }
    } catch (e) {
      console.error('Failed to save to storage', e);
    }
    setProjects(list);
  }, []);

  const load = useCallback(async () => {
    let stored: Project[] = [];
    try {
      if (typeof chrome === 'undefined' || !chrome.storage) {
        const local = localStorage.getItem(STORAGE_KEY);
        stored = local ? JSON.parse(local) : [];
      } else {
        const result = await chrome.storage.local.get([STORAGE_KEY]);
        stored = (result[STORAGE_KEY] as Project[]) || [];
      }

      if (stored.length === 0 && localStorage.getItem('localpad_seeded') !== 'true') {
        localStorage.setItem('localpad_seeded', 'true');
        stored = DEFAULT_PROJECTS;
        await save(stored);
      }
    } catch (e) {
      console.error('Failed to load storage', e);
    }

    setProjects(stored);
    setLoading(false);
  }, [save]);

  useEffect(() => {
    const init = async () => {
      await load();
    };
    init();
  }, [load]);


  const addProject = async (data: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    await save([...projects, newProject]);
  };

  const updateProject = async (id: string, data: Omit<Project, 'id' | 'createdAt'>) => {
    const updated = projects.map(p => {
      if (p.id === id) {
        return { ...p, ...data };
      }
      return p;
    });
    await save(updated);
  };

  const deleteProject = async (id: string) => {
    const filtered = projects.filter(p => p.id !== id);
    await save(filtered);
  };

  return { projects, loading, addProject, updateProject, deleteProject };
};
