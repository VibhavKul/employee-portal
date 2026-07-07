import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAppData } from '../../contexts/AppDataContext';
import styles from './Header.module.css';

export default function Header() {
  const { logout } = useAuth();
  const { clearEmployee } = useAppData();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    clearEmployee();
    navigate('/login');
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Employee Portal</h1>
      <button className={styles.logoutBtn} onClick={handleLogout} type="button">
        Logout
      </button>
    </header>
  );
}
