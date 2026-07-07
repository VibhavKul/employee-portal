# Requirements Document

## Introduction

The Employee Portal is a client-side React web application that allows authenticated employees to log in, submit their personal and employment details through a form, and view those details on a confirmation page. The application uses hardcoded credentials for authentication, React context for state management, and React Router for client-side navigation. There is no backend or database; all data lives in memory or sessionStorage for the duration of the session.

## Glossary

- **App**: The Employee Portal React web application
- **AuthContext**: The React context that stores and manages the user's authenticated login state
- **AppContext**: The React context that stores and manages submitted employee form data
- **Login_Page**: The page at route `/login` where users enter credentials
- **Home_Page**: The protected page at route `/home` where users fill in the employee details form
- **Details_Page**: The protected page at route `/details` where submitted employee data is displayed
- **Header**: The shared UI component displaying the app title and a Logout button
- **ProtectedRoute**: A route wrapper component that redirects unauthenticated users to `/login`
- **Employee_Form**: The form on the Home page used to capture employee details
- **Valid_Credentials**: The hardcoded username `vibhav.kul` and password `password`

---

## Requirements

### Requirement 1: Project Setup and Technology Stack

**User Story:** As a developer, I want a Vite-based React project scaffolded in the current workspace, so that I can run the app with `npm run dev` without additional configuration.

#### Acceptance Criteria

1. THE App SHALL be scaffolded using React 18+ and Vite with JavaScript (not TypeScript) in the current workspace root directory.
2. THE App SHALL include React Router as a dependency for client-side navigation.
3. WHEN a developer runs `npm run dev`, THE App SHALL start without errors and be accessible in a browser.
4. THE App SHALL include a `README.md` file with instructions for installing dependencies and running the development server.

---

### Requirement 2: Login Page

**User Story:** As an employee, I want to log in with my username and password, so that I can access the portal securely.

#### Acceptance Criteria

1. THE Login_Page SHALL be rendered at the route `/login` and SHALL be the default landing page of the App.
2. THE Login_Page SHALL display a Username input field, a Password input field, and a Login button.
3. WHEN a user submits the login form with a Username matching `vibhav.kul` and a Password matching `password`, THE App SHALL navigate the user to the Home_Page.
4. WHEN a user submits the login form with credentials that do not match Valid_Credentials, THE Login_Page SHALL display the inline error message "Invalid username or password" without performing a page reload.
5. WHEN a user submits the login form with an empty Username field, THE Login_Page SHALL display a validation message indicating the Username field is required.
6. WHEN a user submits the login form with an empty Password field, THE Login_Page SHALL display a validation message indicating the Password field is required.
7. THE Login_Page SHALL NOT perform a page reload under any submit scenario.

---

### Requirement 3: Home Page and Employee Details Form

**User Story:** As an authenticated employee, I want to fill in my employment details and submit them, so that I can view my information on the details screen.

#### Acceptance Criteria

1. THE Home_Page SHALL be rendered at the route `/home` and SHALL only be accessible to authenticated users.
2. THE Home_Page SHALL display a Header containing the app title "Employee Portal" and a Logout button.
3. THE Home_Page SHALL display a form titled "Employee Details" containing the following fields:
   - Full Name (text input, required)
   - Employee ID (text input, required)
   - Email (email input, required, must be valid email format)
   - Department (dropdown with options: QA, Engineering, HR, Finance, Operations)
   - Date of Joining (date picker input)
   - Phone Number (text input, optional)
4. WHEN a user submits the Employee_Form with a missing required field (Full Name, Employee ID, or Email), THE Home_Page SHALL display an inline validation error message for each missing field without navigating away.
5. WHEN a user submits the Employee_Form with an Email value that does not conform to valid email format, THE Home_Page SHALL display an inline validation error for the Email field.
6. WHEN a user submits the Employee_Form with all required fields populated and valid, THE App SHALL store the form data in AppContext and navigate the user to the Details_Page.

---

### Requirement 4: Details Page

**User Story:** As an authenticated employee, I want to view all of my submitted details on a confirmation page, so that I can verify the information I entered.

#### Acceptance Criteria

1. THE Details_Page SHALL be rendered at the route `/details` and SHALL only be accessible to authenticated users.
2. WHEN the Details_Page is rendered with submitted employee data available in AppContext, THE Details_Page SHALL display a header reading "Welcome, <Full Name>" using the employee's submitted Full Name.
3. THE Details_Page SHALL display a Logout button.
4. THE Details_Page SHALL display all submitted employee fields (Full Name, Employee ID, Email, Department, Date of Joining, Phone Number) in a read-only card or table layout.
5. THE Details_Page SHALL display a "Back to Home" button.
6. WHEN a user clicks "Back to Home", THE App SHALL navigate the user to the Home_Page.
7. WHEN the Details_Page is accessed directly via URL without submitted form data present in AppContext, THE App SHALL redirect the user to the Home_Page.

---

### Requirement 5: Authentication and Navigation Rules

**User Story:** As a user, I want unauthenticated access to protected pages to be prevented, so that employee data is not accessible without logging in.

#### Acceptance Criteria

1. THE ProtectedRoute SHALL redirect any unauthenticated user who attempts to access `/home` or `/details` to the `/login` route.
2. THE AuthContext SHALL store the user's login state in memory or sessionStorage for the duration of the browser session.
3. WHEN a user clicks the Logout button from the Home_Page or the Details_Page, THE App SHALL clear the login state in AuthContext, clear the submitted employee data in AppContext, and redirect the user to `/login`.
4. WHEN an authenticated user navigates to `/login`, THE App SHALL redirect the user to the Home_Page.

---

### Requirement 6: Styling and Component Structure

**User Story:** As a developer, I want a clean, modular component structure with consistent styling, so that the application is maintainable and looks professional.

#### Acceptance Criteria

1. THE App SHALL implement separate components for: `Login`, `Home`, `Details`, `Header`, and `ProtectedRoute`.
2. THE App SHALL use plain CSS or CSS Modules for all styling — no third-party UI component libraries.
3. THE App SHALL apply consistent spacing, typography, and focus states across all pages so that the visual style is cohesive.
4. THE Employee_Form SHALL display polished styling including proper field spacing, label alignment, and visible focus states on inputs.
5. THE App SHALL contain no backend dependencies and no database interactions; all state SHALL be managed client-side.
