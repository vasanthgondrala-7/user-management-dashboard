# User Management Dashboard

A React + Vite user management dashboard built for the JavaScript Basics assessment. It uses JSONPlaceholder's `/users` endpoint and supports viewing, adding, editing, deleting, searching, sorting, filtering, and paginating users.

## 🚀 Live Demo
🔗 **[View Live Application](https://user-dashboard-hub.netlify.app/)**

## Features

- Fetch users from `https://jsonplaceholder.typicode.com/users`
- Show ID, first name, last name, email, and department
- Add, edit, and delete users with modal dialogs
- Client-side validation for required fields and email format
- Search by name, email, or department
- Filter popup for first name, last name, email, and department
- Sort table columns in ascending or descending order
- Pagination with 10, 25, 50, and 100 rows per page
- Loading, empty, and error states
- Responsive layout for desktop, tablet, and mobile screens

## Tech Stack

- React.js
- Vite
- JavaScript
- Axios
- HTML5
- CSS3

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:5173` in the browser.

## Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
user-management-dashboard/
|
|-- public/
|
|-- src/
|   |
|   |-- api/
|   |   |-- userService.js        # Dedicated layer for Axios configurations
|   |
|   |-- components/
|   |   |-- Header.jsx            # Top-bar application branding
|   |   |-- UserTable.jsx         # Full Grid Layout
|   |   |-- UserRow.jsx           # Individual user item actions
|   |   |-- UserForm.jsx          # Input modal for Add & Edit
|   |   |-- SearchBar.jsx         # Query input component
|   |   |-- FilterPopup.jsx       # Multi-criteria filtering options
|   |   |-- Pagination.jsx        # Navigation controls
|   |   |-- ConfirmDelete.jsx     # Safety check modal
|   |
|   |-- hooks/
|   |   |-- useUsers.js           # Custom hook for data fetching
|   |
|   |-- utils/
|   |   |-- validators.js         # Input validation utility functions
|   |   |-- constants.js          # Shared constant properties
|   |   |-- helpers.js            # General utility helper functions
|   |
|   |-- styles/                   # Application styling files
|   |
|   |-- App.jsx                   # Root layout containing shared state
|   |-- main.jsx                  # Application entry point
|
|-- README.md                     # Documentation file
```

## Data Assumptions

JSONPlaceholder gives each user a single `name` field, so the app splits it into first name and last name. For example, `Leanne Graham` becomes `Leanne` and `Graham`.

The API does not include a real department field, so the app uses the user's company name as the department for fetched records. For newly added users, the department entered in the form is kept in local state.

JSONPlaceholder does not permanently save `POST`, `PUT`, or `DELETE` changes. The app updates React state after successful API responses so the dashboard behaves like a real CRUD interface.

## Challenges Faced

- The API data shape did not fully match the assignment fields.
- JSONPlaceholder simulates write operations but does not persist them.
- Search, filters, sorting, and pagination all needed to work together without breaking the current page state.

## Future Improvements

- Add a real backend with database persistence.
- Add authentication for admin users.
- Add unit tests for helpers and form validation.
- Add advanced filters and export options.
