import type { FC } from 'react';
import { Plus, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  onCreate: () => void;
}

const EmptyState: FC<EmptyStateProps> = ({ onCreate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="empty-state"
    >
      <div className="empty-icon">
        <Layout size={32} />
      </div>
      <h2>Empty Pad</h2>
      <p>No projects found here. Add your first environment or browse common ports.</p>
      <button className="btn-save-full" style={{ marginTop: '16px' }} onClick={onCreate}>
        <Plus size={16} /> New project
      </button>
    </motion.div>
  );
};

export default EmptyState;
