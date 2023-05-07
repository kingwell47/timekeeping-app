# timekeeping-app

Timekeeping app for the MMS 149 Final Project

## .env file needed with the following:

- NODE_ENV = development
- PORT = 5000
- MONGO_URI = `//Provide your own access to MongoDB`
- JWT_SECRET = `// Any String`

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
      "user": {
            "_id": "644b43bb3fa",
            "name": "John Doe",
            "email": "employee@email.com"
        },
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
      "vacationLeavesUsed": 2,
      "sickLeavesUsed": 1,
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

## Check if currently clocked in

- **Description**: Check if current employee logged in is clocked in
- **Route**: `GET api/employees/clock`
- **Access**: Private

```perl
Response body
{
    "clockedIn": true,
    "timeIn": "2022-06-10T09:00:00.000Z"
}
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

## Get overtime array

- **Description**: Get overtime array
- **Route**: `GET api/employees/me/overtime`
- **Access**: Private

```perl
{
  "overtime": [
    {
      "_id": "614a93b4f80f051d6c0faa7a",
      "date": "2022-01-01",
      "hours": 2,
      "nightHours": 1,
      "timeIn": "18:00",
      "timeOut": "20:00",
      "reason": "Project deadline",
      "createdAt": "2021-09-21T10:35:40.651Z",
      "updatedAt": "2021-09-21T10:35:40.651Z"
    },
    {
      "_id": "614a93c6f80f051d6c0faa7b",
      "date": "2022-02-14",
      "hours": 3,
      "nightHours": 2,
      "timeIn": "22:00",
      "timeOut": "01:00",
      "reason": "Client meeting",
      "createdAt": "2021-09-21T10:36:06.975Z",
      "updatedAt": "2021-09-21T10:36:06.975Z"
    }
  ]
}

```

## Get leaves array

- **Description**: Get leaves array
- **Route**: `GET api/employees/me/leaves`
- **Access**: Private

```perl
{
  "leaves": [
    {
      "_id": "614a9349f80f051d6c0faa77",
      "type": "Vacation",
      "date": "2022-01-01",
      "replacedBy": "John Doe",
      "createdAt": "2021-09-21T10:34:17.787Z",
      "updatedAt": "2021-09-21T10:34:17.787Z"
    },
    {
      "_id": "614a9370f80f051d6c0faa78",
      "type": "Sick",
      "date": "2022-02-14",
      "replacedBy": "Jane Smith",
      "createdAt": "2021-09-21T10:34:48.772Z",
      "updatedAt": "2021-09-21T10:34:48.772Z"
    }
  ]
}

```

## Add overtime

- **Description**: Add overtime
- **Route**: `POST api/employees/me/overtime`
- **Access**: Private

```perl
Request Body:
{
        "date": "2023-05-05",
        "hours": 12,
        "nightHours": 5,
        "timeIn": "9 PM",
        "timeOut": "9 AM",
        "reason": "additional stuff"

}

Response:
{
    "message": "Overtime added successfully",
    {
        "date": "2023-05-05",
        "hours": 12,
        "nightHours": 5,
        "timeIn": "9 PM",
        "timeOut": "9 AM",
        "reason": "additional stuff"
    },

}

```
