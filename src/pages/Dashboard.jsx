import { useState } from 'react';
import { logoutAccount } from '../services/auth';
import './Dashboard.css';

function Dashboard() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Clear authentication token
    logoutAccount();
    
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <h1>TaskSphere Dashboard</h1>
        <button 
          onClick={handleLogout} 
          disabled={isLoggingOut}
          className="logout-button"
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </header>
      
      <section className="dashboard-content">
        <h2>Welcome to TaskSphere!</h2>
        <p>You have successfully logged in to your account.</p>
        <div className="dashboard-placeholder">
          <p>Dashboard content will be implemented here.</p>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
