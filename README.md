# AWS Login System

A simple, secure login and registration system built with AWS serverless technologies.

## Features

- User registration with email/password
- Secure login authentication
- Password hashing with bcrypt
- Responsive web interface
- AWS serverless backend

## Quick Start

### 1. Setup AWS Resources

**DynamoDB Table:**
```
Table Name: Users
Primary Key: id (String) - UUID
Global Secondary Index: email-index
  - Partition Key: email (String)
```

**Deploy Backend:**
```bash
cd backend
npm install
serverless deploy
```

**Lambda Functions:**
- `register.ts` and `login.ts` will be deployed automatically
- Functions use Node.js 18.x runtime
- Dependencies (bcryptjs, uuid) included in deployment

**API Gateway:**
- Endpoints created automatically via Serverless Framework:
  - `POST /register` → register Lambda
  - `POST /login` → login Lambda
- CORS enabled automatically

### 2. Configure Frontend

**Compile TypeScript:**
```bash
cd frontend
npx tsc script.ts
```

Update the API endpoints in `frontend/index.html`:
```javascript
const API_BASE_URL = 'https://your-api-gateway-id.execute-api.region.amazonaws.com/prod';
```

### 3. Deploy

1. Deploy backend: `cd backend && serverless deploy`
2. Copy the API Gateway URL from deployment output
3. Update `API_BASE_URL` in `frontend/index.html`
4. Compile frontend TypeScript: `cd frontend && npx tsc script.ts`
5. Open `frontend/index.html` in your browser
6. Test registration and login functionality

## API Endpoints

### Register
```
POST /register
{
  "username": "john",
  "email": "john@example.com", 
  "password": "password123"
}
```

### Login
```
POST /login
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- Input validation on client and server
- CORS properly configured
- No sensitive data in responses

## Tech Stack

- **Frontend:** HTML/CSS/TypeScript
- **Backend:** AWS Lambda + API Gateway
- **Database:** DynamoDB
- **Security:** bcryptjs
- **Deployment:** Serverless Framework

## File Structure

```
├── backend/
│   ├── .serverless/        # Serverless deployment artifacts
│   ├── dist/              # Compiled JavaScript files
│   ├── node_modules/      # Dependencies
│   ├── src/               # TypeScript source files
│   │   ├── register.ts    # Registration Lambda
│   │   └── login.ts       # Login Lambda
│   ├── package-lock.json
│   ├── package.json       # Node.js dependencies
│   ├── serverless.yml     # Serverless Framework config
│   └── tsconfig.json      # TypeScript configuration
├── frontend/
│   ├── dist/              # Compiled assets
│   ├── index.html         # Main HTML file
│   ├── script.ts          # TypeScript source
│   ├── style.css          # Styles
│   └── tsconfig.json      # TypeScript configuration
└── README.md              # This file
```



## Prerequisites

- Node.js 18.x or higher
- AWS CLI configured
- Serverless Framework installed globally: `npm install -g serverless`

---
