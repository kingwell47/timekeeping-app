# timekeeping-app

Timekeeping app for the MMS 149 Final Project

## .env file needed with the following:

NODE_ENV = development
PORT = 5000
MONGO_URI = //Provide your own access to MongoDB
JWT_SECRET = // Any String

# API Routes

## Register User

- **Description**: Register User
- **Route**: `POST api/users`
- **Access**: Public

## Authenticate User

- **Description**: Authenticate User
- **Route**: `POST api/users/login`
- **Access**: Public

## Get timesheet for the current employee

- **Description**: Get timesheet for the current employee
- **Route**: `GET api/employees/me/timesheet`
- **Access**: Private

## Get schedule for the current employee

- **Description**: Get schedule for the current employee
- **Route**: `GET api/employees/me/schedule`
- **Access**: Private

## Get timesheet for any employee

- **Description**: Get timesheet for any employee
- **Route**: `GET api/employees/:id/timesheet`
- **Access**: Private

## Get schedule for any employee

- **Description**: Get schedule for any employee
- **Route**: `GET api/employees/:id/schedule`
- **Access**: Private

## Update employee schedule

- **Description**: Update employee schedule
- **Route**: `PUT api/employees/:id/schedule`
- **Access**: Private and role="hr"

## Get employee list

- **Description**: Get employee list
- **Route**: `GET api/employees/`
- **Access**: Private and role="hr"

## Clock in or Out

- **Description**: Clock in or Out
- **Route**: `POST api/employees/clock`
- **Access**: Private

## Add a leave

- **Description**: Add a leave
- **Route**: `POST api/employees/me/leaves`
- **Access**: Private
