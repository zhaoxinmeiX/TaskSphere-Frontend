import { useState } from 'react';
import { createTask } from '../services/tasks';
import './TaskForm.css';

function TaskForm({ onTaskCreated, task = null, isEdit = false }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (isEdit) {
        onTaskCreated(formData);
      } else {
        const newTask = await createTask(formData);
        onTaskCreated(newTask);
        setFormData({
          title: '',
          description: ''
        });
      }
    } catch (err) {
      setError(isEdit ? 'Failed to update task. Please try again.' : 'Failed to create task. Please try again.');
      console.error('Task error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows="3"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button
            type="submit"
            disabled={isSubmitting || !formData.title}
            className={`submit-button ${isEdit ? 'edit-mode' : 'create-mode'}`}
          >
            {isSubmitting ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Task' : 'Create Task')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
