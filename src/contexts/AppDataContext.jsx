import { createContext, useContext, useState } from 'react';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [employee, setEmployeeState] = useState(null);

  function setEmployee(data) {
    setEmployeeState(data);
  }

  function clearEmployee() {
    setEmployeeState(null);
  }

  return (
    <AppDataContext.Provider value={{ employee, setEmployee, clearEmployee }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === null) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
