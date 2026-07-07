import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../../contexts/AppDataContext';
import Header from '../../components/Header/Header';
import styles from './Home.module.css';

export default function Home() {
  const { setEmployee } = useAppData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    email: '',
    department: 'QA',
    dateOfJoining: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    employeeId: '',
    email: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = { fullName: '', employeeId: '', email: '' };

    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.employeeId) {
      newErrors.employeeId = 'Employee ID is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (newErrors.fullName || newErrors.employeeId || newErrors.email) {
      setErrors(newErrors);
      return;
    }

    setEmployee(formData);
    navigate('/details');
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Employee Details</h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className={`${styles.input}${errors.fullName ? ` ${styles.inputError}` : ''}`}
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className={styles.error}>{errors.fullName}</p>
              )}
            </div>

            {/* Employee ID */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="employeeId">
                Employee ID
              </label>
              <input
                id="employeeId"
                name="employeeId"
                type="text"
                required
                className={`${styles.input}${errors.employeeId ? ` ${styles.inputError}` : ''}`}
                value={formData.employeeId}
                onChange={handleChange}
              />
              {errors.employeeId && (
                <p className={styles.error}>{errors.employeeId}</p>
              )}
            </div>

            {/* Email */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`${styles.input}${errors.email ? ` ${styles.inputError}` : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email}</p>
              )}
            </div>

            {/* Department */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="department">
                Department
              </label>
              <select
                id="department"
                name="department"
                className={styles.select}
                value={formData.department}
                onChange={handleChange}
              >
                <option value="QA">QA</option>
                <option value="Engineering">Engineering</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            {/* Date of Joining */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="dateOfJoining">
                Date of Joining
              </label>
              <input
                id="dateOfJoining"
                name="dateOfJoining"
                type="date"
                className={styles.input}
                value={formData.dateOfJoining}
                onChange={handleChange}
              />
            </div>

            {/* Phone Number */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="phoneNumber">
                Phone Number
                <span className={styles.optionalHint}>(Optional)</span>
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                className={styles.input}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
