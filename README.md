# POS Self-Checkout System

A role-based point-of-sale (POS) self-checkout application built with React (Remix) and a Node.js (Express) backend. The system is designed to model real-world POS workflows with clear frontend/backend separation and role-based access control.

## Features

### Customer Mode
- Build an order by adding and removing items
- Adjust item quantities
- View subtotal, tax, total, and SNAP-eligible subtotal
- Multilingual user interface


### Cashier Mode
- Secure cashier sign-in using session-based authentication
- Role-based UI with cashier-only controls
- Exit cashier mode (logout)
- TODO:
  - Create orders with backend-managed order numbers
  - Suspend and resume orders using a unique order ID

## Architecture

### Frontend
- React with Remix
- Context-based state management
    - OrderContext for active order state
    - RoleContext for customer and cashier roles
    - LanguageContext for internationalization
- UI behavior driven by role and order state

### Backend
- Node.js with Express
- REST API with HTTP-only cookie sessions
- Role-based authorization on protected routes

## Authentication and Authorization

- Session-based authentication using HTTP-only cookies
- Backend acts as the source of truth for user roles
- Frontend role state is synchronized via the /me endpoint
- Protected backend routes enforce role requirements

## Tech Stack

Frontend:
- React
- Remix
- TypeScript

Backend:
- Node.js
- Express
- Cookie-based sessions
- CORS

## Development Setup

Install dependencies:
npm install

Start backend:
node server/server.js

Start frontend:
npm run dev

Frontend runs on http://localhost:5173  
Backend runs on http://localhost:3001

## Future Improvements

- MongoDB persistence for orders and sessions
- Manager role with reporting and order history
- Receipt generation
- Multi-terminal support
- Automated testing

## Author

Christian Torres  
