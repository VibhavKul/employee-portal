# Implementation Plan: Employee Portal

## Overview

Scaffold a React 18 + Vite (JavaScript) single-page application in the current workspace root. Implement AuthContext and AppDataContext for in-memory session state, React Router v6 for navigation with protected routes, three pages (Login, Home, Details), a shared Header component, and CSS Modules for scoped styling.

## Tasks

- [x] 1. Scaffold the Vite + React project and install dependencies
  - Run `npm create vite@latest . -- --template react` in the workspace root
  - Install React Router: `npm install react-router-dom`
  - Install testing tools: `npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom fast-check`
  - Add test configuration to `vite.config.js`: set `test.environment = "jsdom"` and `test.globals = true`
  - Add `"test": "vitest --run"` script to `package.json`
  - Verify `npm run dev` starts without errors
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2. Set up global styles and CSS design tokens
  - Replace `src/index.css` with a global reset and CSS custom properties
  - _Requirements: 6.2, 6.3_

- [x] 3. Implement AuthContext
  - Create `src/contexts/AuthContext.jsx`
  - Export `AuthProvider` component with state: `{ isAuthenticated, login, logout }`
  - Export `useAuth` custom hook
  - _Requirements: 5.2_

- [x] 4. Implement AppDataContext
  - Create `src/contexts/AppDataContext.jsx`
  - Export `AppDataProvider` component with state: `{ employee: null, setEmployee, clearEmployee }`
  - Export `useAppData` custom hook
  - _Requirements: 3.6, 4.4_

- [x] 5. Implement ProtectedRoute component
  - Create `src/components/ProtectedRoute/ProtectedRoute.jsx`
  - If not authenticated: Navigate to /login replace
  - Otherwise: render Outlet
  - _Requirements: 5.1_

- [x] 6. Wire up App.jsx with providers and routes
  - Wrap all routes in AuthProvider and AppDataProvider
  - Set up BrowserRouter with all routes
  - _Requirements: 1.1, 5.1, 5.4_

- [x] 7. Implement Header component
  - Create `src/components/Header/Header.jsx` and `Header.module.css`
  - Display "Employee Portal" title and Logout button
  - _Requirements: 3.2, 4.3, 5.3_

- [x] 8. Implement Login page
  - Create `src/pages/Login/Login.jsx` and `Login.module.css`
  - Hardcoded credentials: vibhav.kul / password
  - Client-side validation, no page reload
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [x] 9. Implement Home page with employee details form
  - Create `src/pages/Home/Home.jsx` and `Home.module.css`
  - 6 fields: Full Name, Employee ID, Email, Department, Date of Joining, Phone Number
  - Client-side validation
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 6.4_

- [x] 10. Implement Details page
  - Create `src/pages/Details/Details.jsx` and `Details.module.css`
  - Show "Welcome, {fullName}" heading
  - Display all fields in read-only card
  - Redirect to /home if no employee data
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 11. Polish styling for consistency across pages
  - Ensure consistent CSS variables, spacing, focus states
  - _Requirements: 6.3, 6.4_

- [x] 12. Add README.md
  - Project overview, prerequisites, install and run instructions
  - Include hardcoded credentials for testing
  - _Requirements: 1.4_

- [x] 13. Final verification — run build and confirm no errors
  - Run `npm run build` and confirm it succeeds
  - _Requirements: 1.3_
