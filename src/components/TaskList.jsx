import { useState, useEffect } from 'react';
import { getTasks, updateTask } from '../services/tasks';
import TaskForm from './TaskForm';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

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

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTask(taskId, { status: newStatus });
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      setOpenDropdown(null);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleTaskEdit = (task) => {
    setEditingTask(task);
  };

  const handleTaskUpdate = async (taskId, taskData) => {
    try {
      const updatedTask = await updateTask(taskId, taskData);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleEditCancel = () => {
    setEditingTask(null);
  };

  const toggleDropdown = (taskId) => {
    setOpenDropdown(openDropdown === taskId ? null : taskId);
  };

  const getStatusText = (status) => {
    const statusMap = {
      'todo': 'To Do',
      'in_progress': 'In Progress',
      'completed': 'Completed'
    };
    return statusMap[status] || status;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.status-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              <div className="task-status">
                <div className="status-container" style={{ position: 'relative' }}>
                  <div 
                    className={`status-badge ${task.status}`}
                    onClick={() => toggleDropdown(task.id)}
                  >
                    {getStatusText(task.status)}
                  </div>
                  {openDropdown === task.id && (
                    <div className="status-dropdown show">
                      <div 
                        className={`status-option todo ${task.status === 'todo' ? 'selected' : ''}`}
                        onClick={() => handleStatusChange(task.id, 'todo')}
                      >
                        To Do
                      </div>
                      <div 
                        className={`status-option in_progress ${task.status === 'in_progress' ? 'selected' : ''}`}
                        onClick={() => handleStatusChange(task.id, 'in_progress')}
                      >
                        In Progress
                      </div>
                      <div 
                        className={`status-option completed ${task.status === 'completed' ? 'selected' : ''}`}
                        onClick={() => handleStatusChange(task.id, 'completed')}
                      >
                        Completed
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="task-card-content">
                <div className="task-header">
                  <h3 className="task-title">{task.title}</h3>
                </div>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                
                <div className="task-footer">
                  <span className="task-meta">
                    {new Date(task.created_at).toLocaleDateString()}
                  </span>
                  <button 
                    className="edit-button-clean" 
                    onClick={() => handleTaskEdit(task)}
                    title="Edit task"
                  >
                    <span>✏️</span> Edit
                  </button>
                </div>
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

      {editingTask && (
        <div className="modal-overlay" onClick={handleEditCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Task</h3>
              <button className="modal-close" onClick={handleEditCancel}>×</button>
            </div>
            <TaskForm 
              task={editingTask}
              onTaskCreated={(updatedTask) => handleTaskUpdate(editingTask.id, updatedTask)}
              isEdit={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
