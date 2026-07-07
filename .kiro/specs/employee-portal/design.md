# Design Document: Employee Portal

## Overview

The Employee Portal is a fully client-side single-page application built with React 18+ and Vite (JavaScript). It provides a login screen, an employee details form, and a read-only confirmation page. All state is managed in-memory via React Context; there is no backend, API, or database. Navigation is handled by React Router v6 with protected routes enforcing authentication.

The application has three main routes:
- `/login` — unauthenticated entry point
- `/home` — protected; employee details form
- `/details` — protected; read-only display of submitted data

---

## Architecture

### State Flow

```
User submits login
  → AuthContext.login() sets isAuthenticated = true
  → Router navigates to /home

User submits employee form
  → AppContext.setEmployee() stores form data
  → Router navigates to /details

User clicks Logout
  → AuthContext.logout() sets isAuthenticated = false
  → AppContext.clearEmployee() clears employee data
  → Router navigates to /login
```

---

## Components and Interfaces

### Component Hierarchy

```
App
├── AuthProvider (context)
│   └── AppDataProvider (context)
│       └── BrowserRouter
│           └── Routes
│               ├── Route path="/login" → <Login />
│               ├── Route path="/home" → <ProtectedRoute> → <Home />
│               ├── Route path="/details" → <ProtectedRoute> → <Details />
│               └── Route path="*" → Navigate to /login
```

### Component Descriptions

#### AuthProvider / useAuth
- Holds: { isAuthenticated: boolean, login: fn, logout: fn }
- login() — sets isAuthenticated = true; optionally persists to sessionStorage
- logout() — sets isAuthenticated = false; removes from sessionStorage
- On mount, initialize isAuthenticated from sessionStorage

#### AppDataProvider / useAppData
- Holds: { employee: EmployeeData | null, setEmployee: fn, clearEmployee: fn }
- setEmployee(data) — stores the full EmployeeData object
- clearEmployee() — resets employee to null

#### ProtectedRoute
- If isAuthenticated === false: renders Navigate to /login replace
- Otherwise: renders Outlet

#### Login
- Local state: { username, password, errors: { username?, password?, credentials? } }
- On submit: validate fields, check hardcoded credentials (vibhav.kul / password)
- If already authenticated: redirect to /home

#### Header
- Displays "Employee Portal" title (left), Logout button (right)
- Logout: calls AuthContext.logout(), navigates to /login

#### Home
- Local state: { formData: EmployeeData, errors: FieldErrors }
- Renders Header, form titled "Employee Details"
- On submit: validate required fields and email, then setEmployee and navigate to /details

#### Details
- Reads employee from AppContext
- If employee === null: redirect to /home
- Shows "Welcome, {employee.fullName}" heading, all fields in card, Back to Home button

---

## Data Models

### EmployeeData

```js
{
  fullName: string,        // required
  employeeId: string,      // required
  email: string,           // required, valid email format
  department: string,      // one of: "QA" | "Engineering" | "HR" | "Finance" | "Operations"
  dateOfJoining: string,   // ISO date string (YYYY-MM-DD) or empty string
  phoneNumber: string      // optional, may be empty string
}
```

---

## File Structure

```
/                          ← workspace root
├── public/
│   └── vite.svg
├── src/
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── AppDataContext.jsx
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.module.css
│   │   └── ProtectedRoute/
│   │       └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.module.css
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   └── Details/
│   │       ├── Details.jsx
│   │       └── Details.module.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## Routing Design

React Router v6 BrowserRouter with nested routes:

```jsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route element={<ProtectedRoute />}>
    <Route path="/home" element={<Home />} />
    <Route path="/details" element={<Details />} />
  </Route>
  <Route path="*" element={<Navigate to="/login" replace />} />
</Routes>
```

Auth redirect logic:
- Unauthenticated → /home or /details: Redirect to /login
- Authenticated → /login: Redirect to /home
- /details with no employee data: Redirect to /home
- Any unknown path: Redirect to /login

---

## Styling Approach

- CSS Modules per component for scoped styles
- index.css for global resets and CSS custom properties
- Design tokens: --color-primary, --color-error, --color-surface, --color-text, --color-border
- Layout: centered cards using flexbox; max-width ~480px for forms
- No third-party UI component libraries
