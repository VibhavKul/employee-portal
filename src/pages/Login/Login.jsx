import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '', credentials: '' });
  const [showForgotModal, setShowForgotModal] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Clear previous errors
    const newErrors = { username: '', password: '', credentials: '' };

    // Validate fields
    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    // Stop if any field is empty
    if (!username || !password) {
      setErrors(newErrors);
      return;
    }

    // Check credentials
    if (username === 'vibhav.kul' && password === 'password') {
      login();
      navigate('/home');
    } else {
      newErrors.credentials = 'Invalid username or password';
      setErrors(newErrors);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Employee Portal</h2>
        <p className={styles.subheading}>Sign In</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              type="text"
              className={`${styles.input}${errors.username ? ` ${styles.inputError}` : ''}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-describedby={errors.username ? 'username-error' : undefined}
            />
            {errors.username && (
              <p id="username-error" className={styles.error} role="alert">
                {errors.username}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`${styles.input}${errors.password ? ` ${styles.inputError}` : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <p id="password-error" className={styles.error} role="alert">
                {errors.password}
              </p>
            )}
            {errors.credentials && (
              <p className={styles.error} role="alert">
                {errors.credentials}
              </p>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Login
          </button>

          <button
            type="button"
            className={styles.forgotLink}
            onClick={() => setShowForgotModal(true)}
          >
            Forgot Password?
          </button>
        </form>
      </div>

      {showForgotModal && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgot-modal-msg"
        >
          <div className={styles.modal}>
            <p id="forgot-modal-msg" className={styles.modalMessage}>
              The functionality is not yet implemented...!
            </p>
            <button
              type="button"
              className={styles.modalBtn}
              onClick={() => setShowForgotModal(false)}
              autoFocus
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
