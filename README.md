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

```perl
Request Body:
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "123456"
}

Response (Success):
Status: 201 Created
{
  "_id": "6123456789abcdef1234567",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

```

## Authenticate User

- **Description**: Authenticate User
- **Route**: `POST api/users/login`
- **Access**: Public

```perl
Request body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (Success):
Status Code: 200
{
  "_id": "60f1020cb7a81d0023e3c4ba",
  "name": "John",
  "email": "john@example.com",
  "role": "hr",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGYxMDIwY2I3YTgxZDAwMjNlM2M0YmEiLCJpYXQiOjE2Mjk1MTY4NzUsImV4cCI6MTYyOTUyMzI3NX0.vq_f3tux_YypFMo9XmJnnHtzLfp3q2Q1_hxKBnmGKK8"
}
```

## Get timesheet for the current employee

- **Description**: Get timesheet for the current employee
- **Route**: `GET api/employees/me/timesheet`
- **Access**: Private

```perl
Response body
[  {    "date": "2023-05-01",    "timeIn": "2023-05-01T09:00:00.000Z",    "timeOut": "2023-05-01T18:00:00.000Z"  },  {    "date": "2023-05-02",    "timeIn": "2023-05-02T09:00:00.000Z",    "timeOut": "2023-05-02T18:00:00.000Z"  },  {    "date": "2023-05-03",    "timeIn": "2023-05-03T09:00:00.000Z",    "timeOut": "2023-05-03T18:00:00.000Z"  }]

```

## Get schedule for the current employee

- **Description**: Get schedule for the current employee
- **Route**: `GET api/employees/me/schedule`
- **Access**: Private

```perl
Response body
{
  "Sunday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  },
  "Monday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  },
  "Tuesday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  },
  "Wednesday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  },
  "Thursday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  },
  "Friday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  },
  "Saturday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  }
}

```

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

```perl
Request body (Raw JSON):
{
  "Sunday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  },
  "Monday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  },
  "Tuesday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  },
  "Wednesday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  },
  "Thursday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  },
  "Friday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  },
  "Saturday": {
    "In": "9:00 AM",
    "Out": "5:00 PM"
  }
}
```

## Get employee list

- **Description**: Get employee list
- **Route**: `GET api/employees/`
- **Access**: Private and role="hr"

```perl
{
  "success": true,
  "data": [
    {
      "_id": "1234567890",
      "name": "John Doe",
      "position": "Developer",
      "currentSchedule": {
        "Sunday": {
          "In": "9:00 AM",
          "Out": "5:00 PM"
        },
        "Monday": {
          "In": "9:00 AM",
          "Out": "5:00 PM"
        },
        "Tuesday": {
          "In": "9:00 AM",
          "Out": "5:00 PM"
        },
        "Wednesday": {
          "In": "9:00 AM",
          "Out": "5:00 PM"
        },
        "Thursday": {
          "In": "9:00 AM",
          "Out": "5:00 PM"
        },
        "Friday": {
          "In": "9:00 AM",
          "Out": "5:00 PM"
        },
        "Saturday": {
          "In": "9:00 AM",
          "Out": "5:00 PM"
        }
      },
      "totalVacationLeaves": 7,
      "vacationLeavesUsed": 2,
      "remainingVacationLeaves": 5,
      "totalSickLeaves": 7,
      "sickLeavesUsed": 1,
      "remainingSickLeaves": 6,
      "timesheet": [
        {
          "date": "2023-04-01T00:00:00.000Z",
          "timeIn": "2023-04-01T08:30:00.000Z",
          "timeOut": "2023-04-01T17:00:00.000Z"
        },
        {
          "date": "2023-04-02T00:00:00.000Z",
          "timeIn": "2023-04-02T08:30:00.000Z",
          "timeOut": "2023-04-02T17:00:00.000Z"
        }
      ],
      "leaves": [
        {
          "_id": "0987654321",
          "date": "2023-05-01T00:00:00.000Z",
          "type": "Vacation",
          "employeeReplaced": "Jane Doe"
        }
      ],
      "overtime": [
        {
          "_id": "2468013579",
          "date": "2023-04-15T00:00:00.000Z",
          "hours": 3
        }
      ]
    }
  ]
}

```

## Clock in or Out

- **Description**: Clock in or Out
- **Route**: `POST api/employees/clock`
- **Access**: Private

```perl
{ message: "Clocked in successfully" }
{ message: "Clocked out successfully" }
{ message: "You have already clocked in and out today. Please contact your supervisor if you need to adjust your timesheet."}
{ message: "You are already clocked in. Please clock out before attempting to clock in again."}
```

## Add a leave

- **Description**: Add a leave
- **Route**: `POST api/employees/me/leaves`
- **Access**: Private

```perl
Request Body:
{
        "date": "2023-05-05",
        "type": "Vacation",
        "replacedBy": "Jane Doe"
}

Response (Success):
{
    "message": "Leave added successfully",
    {
    "_id": "789ghi",
    "date": "2023-05-05",
    "type": "Vacation",
    "replacedBy": "Jane Doe"
    }
}


```
