# Bloom_Beauty# Bloom Beauty

Bloom Beauty is a personal project inspired by a design found on Figma. It is a full-stack e-commerce web application that allows users to sign up, log in, browse beauty products, add items to a cart, and make purchases. The project uses a Node.js backend and a React frontend built with Vite, TanStack Query, and Redux for state management.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Scripts](#scripts)
- [License](#license)

## Overview

This project was created as a personal learning experience to build a functional e-commerce platform. It supports user authentication (login and signup), product browsing, adding products to the cart, and completing purchases. 

## Tech Stack

### Frontend
- **React**: UI library for building user interfaces
- **Vite**: Fast build tool for frontend development
- **TanStack Query (React Query)**: For data fetching and caching
- **Redux**: For global state management
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Material UI**: Pre-built components for rapid UI development

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing product and user data
- **JWT (JSON Web Tokens)**: For user authentication
- **Bcrypt**: For password encryption

## Features

- **User Authentication**: Sign up, log in, and manage user sessions.
- **Product Catalog**: Browse a variety of beauty products.
- **Add to Cart**: Add products to the shopping cart and view the cart contents.
- **Checkout**: Complete purchases (dummy process).
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (or use MongoDB Atlas for cloud-based storage)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/bloom-beauty.git

2. **Install dependencies for both backend and frontend:**
 
 cd backend
npm install

cd frontend
npm install

2. **Running the backend:**

cd backend

create .env file in backend root folder and add:
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key

npm start

3. **Running the frontend:**

cd frontend

npm run dev

4. **License:**

This project is for personal and educational purposes only.

This project was inspired by a design found on Figma. You can view the original design here: https://www.figma.com/design/ij4zW6MRmLidmYnKwPscor/Bloom-Beauty-e-commerce-shop-(%2Bi-interactive-prototype)-c%3A-(Community)?node-id=0-1&node-type=canvas&t=ekGqQvep8VECSt6C-0