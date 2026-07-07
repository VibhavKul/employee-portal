import { useNavigate, Navigate } from 'react-router-dom';
import { useAppData } from '../../contexts/AppDataContext';
import Header from '../../components/Header/Header';
import styles from './Details.module.css';

export default function Details() {
  const navigate = useNavigate();
  const { employee } = useAppData();

  if (employee === null) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.welcome}>Welcome, {employee.fullName}</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Full Name</span>
              <span className={styles.rowValue}>{employee.fullName}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Employee ID</span>
              <span className={styles.rowValue}>{employee.employeeId}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Email</span>
              <span className={styles.rowValue}>{employee.email}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Department</span>
              <span className={styles.rowValue}>{employee.department}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Date of Joining</span>
              <span className={styles.rowValue}>
                {employee.dateOfJoining || 'Not provided'}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Phone Number</span>
              <span className={styles.rowValue}>
                {employee.phoneNumber || 'Not provided'}
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.backBtn}
              type="button"
              onClick={() => navigate('/home')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
