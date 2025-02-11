# Read-Vault

Read-Vault is a library kind of  management system designed to  manage books, users, loan records, and settings. This repository contains both the backend and frontend components of the application.

## Features

### Backend
- **User Authentication**: Secure user authentication using JWT.
- **Role-Based Access Control**: Different access levels for admin and regular users.
- **Book Management**: Add, update, delete, and search for books.
- **User Management**: Manage user accounts and roles.
- **Loan Records**: Track book loans and returns.
- **Settings**: Configure application settings.

### Frontend
- **Dashboard**: Overview of the library's status, including total books, active members, ongoing loans, and most borrowed books.
- **Books**: View, search, and manage books in the library.
- **Users**: Manage user accounts and roles (admin only).
- **Loan Records**: Track and manage book loans and returns (admin only).
- **Settings**: Configure application settings.

### Admin Features
- **Dashboard**: Access to a comprehensive dashboard with statistics and insights.
- **Manage Books**: Add, update, delete, and search for books.
- **Manage Users**: Create, update, and delete user accounts. Assign roles to users.
- **Loan Records**: View, track, and manage book loans and returns.
- **Settings**: Configure application settings and preferences.

### User Features
- **Dashboard**: Access to a personalized dashboard with relevant information.
- **View Books**: Search and view details of available books.
- **Loan Books**: Request to loan books and view loan history.
- **Profile Management**: Update personal information and view account details.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Melatwolde/Read-Vault.git
    cd Read-Vault
    ```

2. **Install dependencies for the backend**:
    ```bash
    cd library-management-backend
    npm install
    ```

3. **Install dependencies for the frontend**:
    ```bash
    cd ../library-management-frontend
    npm install
    ```

### Running the Application

1. **Start the backend server first**:
    ```bash
    cd library-management-backend
    npm run start:dev
    ```

2. **Start the frontend server**:
    ```bash
    cd ../library-management-frontend
    npm start
    ```

### Swagger Documentation

The backend API is documented using Swagger. You can access the Swagger documentation at the following URL once the backend server is running:

[Swagger Documentation](http://localhost:3000/api)


### Swagger Documentation

![image](https://github.com/user-attachments/assets/331091c1-bf01-4055-a0de-d84793dcc956)        ![image](https://github.com/user-attachments/assets/011ce56b-48c3-48d2-9e03-5cd9d60dec59)
   

![image](https://github.com/user-attachments/assets/890ef8f7-5f51-4989-a5f1-f24d3a59a358)
