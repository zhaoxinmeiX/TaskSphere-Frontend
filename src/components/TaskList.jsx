import { useState, useEffect } from 'react';
import { getTasks } from '../services/tasks';
import TaskForm from './TaskForm';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
        setLoading(false);
      } catch {
        setError('Failed to load tasks. Please try again later.');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <button className="create-task-button" onClick={openModal}>
          + Create Task
        </button>
      </div>

      {loading ? (
        <div className="task-list-loading">
          <div className="loading-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : error ? (
        <div className="task-list-error">
          <p>{error}</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="task-list-empty">
          <h3>No tasks found</h3>
          <p>You don't have any tasks yet. Start by creating a new task!</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3 className="task-title">{task.title}</h3>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              <div className="task-meta">
                <small>Created: {new Date(task.created_at).toLocaleDateString()}</small>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Task</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
