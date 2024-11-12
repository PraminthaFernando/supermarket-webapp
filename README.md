# Supermarket Web Application

This project is a full-stack supermarket management web application that enables the management of customers, employees, stock, vendors, and orders. The application features a user-friendly interface for managing supermarket operations and a secure backend API for data management and authentication.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- **Dashboard Management**: Monitor various entities like customers, employees, orders, items, stock, and vendors.
- **Authentication**: User login and admin authentication with token-based security.
- **CRUD Operations**: Add, edit, view, and delete records for customers, employees, items, and vendors.
- **Billing and Orders**: Create bills and manage order processes.
- **Database**: Uses SQLite for data storage with Prisma ORM integration.
- **Electron Compatibility**: The application can be packaged as an Electron app for desktop use.

## Project Structure

```plaintext
supermarket-webapp/
├─ .git/                    # Git version control
├─ Images/                  # Image assets
│  └─ login.jpg             # Login page image
├─ backend/                 # Backend server code and database
│  ├─ database.sqlite       # SQLite database
│  ├─ db.js                 # Database connection setup
│  ├─ jwtUtils.js           # JWT utilities for token generation and verification
│  ├─ server.js             # Express server configuration
│  ├─ SQLiteDB.js           # SQLite database configuration
│  └─ userStore.js          # User storage and management
├─ client/                  # Frontend code
│  ├─ electron/             # Electron configuration files
│  │  ├─ electron-env.d.ts  # Electron environment types
│  │  ├─ main.ts            # Electron main process
│  │  └─ preload.ts         # Electron preload script
│  ├─ src/                  # React application source files
│  │  ├─ components/        # Components for the dashboard, modules, and styles
│  │  ├─ hooks/             # Custom React hooks
│  │  ├─ stylesAssets/      # Stylesheets for components
│  │  ├─ App.tsx            # Main React application component
│  │  └─ secureStorage.ts   # Secure storage for sensitive data
├─ README.md                # Project documentation
├─ supermarket.sql          # SQL schema for database setup
└─ electron-builder.json5   # Electron configuration for app packaging
```

## Technologies Used

### Frontend

- React: User interface and component-based structure.
- TypeScript: Type safety for React and Node.js.
- Tailwind CSS: Styling and layout.
- Electron: Cross-platform desktop application.

### Backend

- Node.js and Express.js: Server and API.
- SQLite: Lightweight database for storage.
- JWT: Authentication using JSON Web Tokens.
- Prisma: ORM for managing SQLite database.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/supermarket-webapp.git
   cd supermarket-webapp
   ```
2. Install dependencies:

   - Backend

   ```bash
   cd backend
   npm install
   ```

   - Frontend

   ```bash
   cd client
   npm install
   ```

3. Database Setup:

   - The project includes an SQLite database file (database.sqlite) for initial data. You can also initialize it using the provided supermarket.sql file.

4. Environment Variables:

   - Create an .env file in both backend and client directories and set the required environment variables.

5. Run the Application:

   - Start the backend server:

   ```bash
   cd backend
   npm start
   ```

   - Start the frontend development server:

   ```bash
   cd client
   npm run dev
   ```

6. Run Electron App:

   - To start the Electron app in development:

   ```bash
   npm run electron:serve
   ```

## Usage

- Access the frontend of the application at http://localhost:3000 by default.
- The Electron desktop version can be launched from the client directory for a standalone experience.
- Login using admin credentials or create a new user to explore the application features.

## Contributing

Contributions are welcome! Please create a fork and submit a pull request with any improvements or bug fixes.
