# Employee Portal — Project Conventions
- React 18 + Vite, JavaScript, React Router
- Components live in src/components, one component per file
- Auth state via React context; protected routes redirect to /login
- Every new feature must preserve the existing flow: login → home form → details page
- Styling: plain CSS, consistent with existing pages
- All features require client-side validation with inline errors