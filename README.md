# React CRUD App with MockAPI

This React application provides a full CRUD (Create, Read, Update, Delete) interface for managing user data fetched from a MockAPI endpoint. It features a responsive navbar, a home page with user cards, a detailed user directory with edit/delete options, pages for creating and editing users, and a footer, all powered by React Router and Axios.

## Features
- **Create**: Add new users via the `/create` page with a detailed form.
- **Read**: 
  - View a grid of user cards on the home page (`/`) with contact, address, and company details.
  - Browse a detailed table of users on the `/users` page with edit/delete actions.
- **Update**: Edit user details via dynamic routes (`/edit/:id`) with a pre-filled form.
- **Delete**: Remove users from the `/users` page with immediate UI updates.
- Responsive navbar with links to Home, Users, and Create pages.
- Footer with dynamic copyright year on all pages.
- Success messages on the `/users` page after create/update/delete operations (auto-dismiss after 3 seconds).
- Loading and error states for all API interactions.

## Tech Stack
- **Frontend**: React (Hooks), React Router
- **API**: MockAPI (RESTful mock API)
- **HTTP Client**: Axios
- **Styling**: Bootstrap (used across components for layout and UI)
- **Deployment**: Netlify-compatible

## Prerequisites
- Node.js (v16+ recommended)
- npm (v8+)
- MockAPI account and project
