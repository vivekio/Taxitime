# Taxi-Time

## Overview
Taxi-Time is a web application designed to manage and streamline taxi services. The application utilizes a combination of front-end and back-end technologies to provide a seamless user experience.

## Functionality
The application allows users to:
- Create and manage accounts
- Book and schedule taxi rides
- View and manage ride history
- Update user profiles and settings

## Technology Stack
The application is built using:
- **Front-end:** React, React Router, Bootstrap
- **Back-end:** Node.js, Express.js, MySQL
- **APIs:** RESTful APIs for data exchange between front-end and back-end

## Data Models
The application uses the following data models:
- **Users:** Stores user information, including name, email, password, and profile details
- **Rides:** Stores ride information, including pickup and dropoff locations, date and time, and ride status
- **Payments:** Stores payment information, including payment method, amount, and payment status

## APIs
The application uses the following APIs:
- **User API:** Handles user authentication, registration, and profile management
- **Ride API:** Handles ride booking, scheduling, and management
- **Payment API:** Handles payment processing and management

## Database
The application uses a MySQL database to store user, ride, and payment data.

## File Structure
The application is organized into the following directories:
```plaintext
Backend/
/Api
│── /src                   # Main source directory
│   │── /config            # Configuration files
│   │── /controllers       # Request handlers (business logic)
│   │── /middlewares       # Middleware functions
│   │── /models            # Database models
│   │── /routes            # Express routes
│   │── /services          # Business logic (external services)
│   │── /utils             # Helper functions
│   │── /uploads           # Store uploaded files (images, documents, etc.)
│   │── app.js             # Main Express app setup
│── /public                # Public assets (if needed)
│── /tests                 # Unit and integration tests
│── /docs                  # API Documentation
│── .env                   # Environment variables
│── .gitignore             # Git ignore file
├── package-lock.json          
│── package.json           # Dependencies and scripts
│── server.js              # Entry point for the backend server


/Admin
├── github
├── yarn.lock
├── public
├── src
├── .env
├── .eslintrc
├── .gitignore
├── .prettierrc
├── prettierignore
├── yarnrc.yml
├── package-lock.json
├── package.json
├── README.md
├── vite.config.mjs
└── yaml.lock


Frontend/
  ├── public/      # Public assets (images, fonts, index.html)
  ├── src/ 
  ├── .env
  │── .gitignore 
  ├── package-lock.json
  │── package.json 
   # React components & Bootstrap styling
```

## Dependencies
## env file content
### Frontend env file content
```plaintext
REACT_APP_YOUR_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### backend API folder env file content
```plaintext
DB_HOST=
DB_USER=
DB_PASSWORD==
DB_NAME=
```
### backend API folder env file content
```plaintext
VITE_APP_VERSION = v3.0.0
GENERATE_SOURCEMAP = false

## Public URL
PUBLIC_URL = https://codedthemes.com/demos/admin-templates/datta-able/react/free/
VITE_APP_BASE_NAME=/Taxi-Time

## Google Map Key
VITE_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

```
### Frontend Dependencies
```json
{
 "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/material": "^7.0.1",
    "@mui/x-date-pickers": "^7.28.2",
    "@radix-ui/react-select": "^2.1.6",
    "@react-google-maps/api": "^2.20.6",
    "@tanstack/react-table": "^8.21.2",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.9",
    "bootstrap": "^5.3.5",
    "bootstrap-icons": "^1.11.1",
    "datatables.net-buttons": "^3.2.2",
    "datatables.net-buttons-dt": "^3.2.2",
    "datatables.net-responsive": "^3.0.4",
    "date-fns": "^4.1.0",
    "file-saver": "^2.0.5",
    "joi": "^17.13.3",
    "jquery": "^3.7.1",
    "js-cookie": "^3.0.5",
    "jspdf": "^3.0.1",
    "jspdf-autotable": "^5.0.2",
    "jwt-decode": "^4.0.0",
    "lucide-react": "^0.482.0",
    "react": "^18.2.0",
    "react-bootstrap": "^2.10.9",
    "react-bootstrap-icons": "^1.10.3",
    "react-data-table-component": "^7.7.0",
    "react-datepicker": "^8.2.1",
    "react-dom": "^18.2.0",
    "react-icons": "^5.5.0",
    "react-otp-input": "^3.1.1",
    "react-router-dom": "^6.29.0",
    "react-scripts": "5.0.1",
    "react-swipeable-button": "^1.6.5",
    "react-toastify": "^11.0.5",
    "socket.io-client": "^4.8.1",
    "styled-components": "^6.1.17",
    "web-vitals": "^2.1.4",
    "xlsx": "^0.18.5"
}
```

### Admin Panel Dependencies
```json
{
  "@fortawesome/fontawesome-svg-core": "^6.7.2",
  "@fortawesome/free-brands-svg-icons": "^6.7.2",
  "@fortawesome/free-regular-svg-icons": "^6.7.2",
  "@fortawesome/free-solid-svg-icons": "^6.7.2",
  "@fortawesome/react-fontawesome": "^0.2.2",
  "@mantine/core": "^7.17.0",
  "@mantine/hooks": "^7.17.0",
  "@originjs/vite-plugin-commonjs": "^1.0.3",
  "@react-google-maps/api": "^2.19.3",
  "@tanem/react-nprogress": "^5.0.51",
  "@testing-library/jest-dom": "^6.4.2",
  "@testing-library/react": "^15.0.2",
  "@testing-library/user-event": "^14.5.2",
  "@vitejs/plugin-react": "^4.2.1",
  "axios": "^1.7.9",
  "bootstrap": "^5.3.3",
  "bootstrap-icons": "^1.11.3",
  "chance": "^1.1.11",
  "d3": "^7.9.0",
  "file-saver": "^2.0.5",
  "formik": "^2.4.5",
  "joi": "^17.13.3",
  "jquery": "^3.7.1",
  "js-cookie": "^3.0.5",
  "jspdf": "^2.5.2",
  "jspdf-autotable": "^3.8.4",
  "process": "^0.11.10",
  "react": "^18.2.0",
  "react-bootstrap": "^2.10.2",
  "react-bootstrap-icons": "^1.11.5",
  "react-copy-to-clipboard": "^5.1.0",
  "react-data-table-component": "^7.6.2",
  "react-dom": "^18.2.0",
  "react-google-charts": "^4.0.1",
  "react-icons": "^5.0.1",
  "react-perfect-scrollbar": "^1.5.8",
  "react-router-dom": "^6.22.3",
  "react-toastify": "^11.0.3",
  "vite": "^5.2.0",
  "vite-jsconfig-paths": "^2.0.1",
  "web-vitals": "^3.5.2",
  "xlsx": "^0.18.5",
  "yup": "^1.4.0"
}
```

### API Dependencies
```json
{
  "bcrypt": "^5.1.1",
  "bcryptjs": "^2.4.3",
  "body-parser": "^1.20.3",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "generate-password": "^1.7.1",
  "joi": "^17.13.3",
  "jsonwebtoken": "^9.0.2",
  "multer": "^1.4.5-lts.1",
  "mysql2": "^3.12.0",
  "nodemailer": "^6.10.0"
}
```

## Scripts && Installation
The application uses the following scripts:

Install my-project with npm for Frontend

```bash
  npm init 
  npm install 
  npm start 
```
Run backend with npm for backend 
```sh
npm run dev  # Starts the development server
```
## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```

## color
- #dc3545

## License
This project is licensed under the **MIT License**.

## Authors
[ Vivek Pankhaniya ]
- Hexagon infosoft solution PVT LTD 

## Acknowledgments
[List any acknowledgments or credits here]

## Feedback

If you have any feedback, please send this < link >