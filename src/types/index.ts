export type Framework = 'Next.js' | 'React' | 'Django' | 'Vue' | 'FastAPI' | 'Flask' | 'MongoDB' | 'PostgreSQL' | 'MySQL' | 'Redis' | 'Kafka' | 'Docker' | 'RabbitMQ' | 'ElasticSearch' | 'Cassandra' | 'Zookeeper' | 'MinIO' | 'Neo4j' | 'Other';

export interface Port {
  id: string;
  name: string;
  number: number;
}

export interface Project {
  id: string;
  name: string;
  note: string;
  framework: Framework;
  ports: Port[];
  createdAt: number;
  isDefault?: boolean;
}
