import { useState } from 'react';
import { registerAccount } from '../services/auth';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const data = await registerAccount({ username, password });
      setSuccessMessage(`Account created for ${data.username}. You can now sign in.`);
      setUsername('');
      setPassword('');
    } catch (error) {
      const apiErrors = error.response?.data;
      if (typeof apiErrors === 'string') {
        setErrorMessage(apiErrors);
      } else if (apiErrors?.username?.length) {
        setErrorMessage(`Username: ${apiErrors.username.join(' ')}`);
      } else if (apiErrors?.password?.length) {
        setErrorMessage(`Password: ${apiErrors.password.join(' ')}`);
      } else if (apiErrors?.detail) {
        setErrorMessage(apiErrors.detail);
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <h1>Create your account</h1>
        <p className="register-subtitle">Register to securely access TaskSphere.</p>

        <form onSubmit={handleSubmit} className="register-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            autoComplete="username"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="new-password"
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </section>
    </main>
  );
}

export default Register;
