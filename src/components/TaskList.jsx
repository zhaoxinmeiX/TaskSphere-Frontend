import { useState, useEffect } from 'react';
import { getTasks } from '../services/tasks';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getStatusColor = (status) => {
    if (!status) return 'status-default'; // Handle undefined or null status
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'in progress':
        return 'status-in-progress';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-default';
    }
  };

  if (loading) {
    return (
      <div className="task-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list-error">
        <p>{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <h3>No tasks found</h3>
        <p>You don't have any tasks yet. Start by creating a new task!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      <div className="task-grid">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              <span className={`task-status ${getStatusColor(task.status)}`}>
                {task.status || 'No Status'}
              </span>
            </div>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            {task.due_date && (
              <div className="task-due-date">
                <small>Due: {new Date(task.due_date).toLocaleDateString()}</small>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
