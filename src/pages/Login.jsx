import { useState } from 'react';
import { loginAccount } from '../services/auth';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const data = await loginAccount({ username, password });
      
      // Save authentication token to localStorage
      localStorage.setItem('token', data.token);
      
      // Redirect to dashboard or home page (you can modify this)
      window.location.href = '/dashboard';
      
    } catch (error) {
      const apiErrors = error.response?.data;
      if (typeof apiErrors === 'string') {
        setErrorMessage(apiErrors);
      } else if (apiErrors?.detail) {
        setErrorMessage(apiErrors.detail);
      } else if (apiErrors?.non_field_errors?.length) {
        setErrorMessage(apiErrors.non_field_errors.join(' '));
      } else {
        setErrorMessage('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Welcome back</h1>
        <p className="login-subtitle">Sign in to access your TaskSphere account.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            autoComplete="username"
            placeholder="Enter your username"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            placeholder="Enter your password"
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <div className="login-footer">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </section>
    </main>
  );
}

export default Login;
