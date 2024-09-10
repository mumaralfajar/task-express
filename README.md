
# Task Management API

This is a simple Task Management API built using Node.js, Express, and Swagger for documentation. It supports creating, reading, updating, and deleting tasks with validation using `express-validator` and handles CORS requests. Additionally, the API is documented using Swagger and supports pagination for the task listing endpoint.

## Features

- **Task CRUD operations**: Create, Read, Update, Delete tasks.
- **Input validation**: Input validation using `express-validator`.
- **Swagger documentation**: Interactive API documentation using Swagger.
- **Pagination**: The `GET /tasks` endpoint supports pagination.

## Prerequisites

To run this project, you need to have the following installed:

- [Node.js](https://nodejs.org/) (v20+)
- [npm](https://www.npmjs.com/) for package management

## Installation

1. Clone the repository to your local machine:
   
   ```bash
   git clone <repository-url>
   cd task-express
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The server will start running on [http://localhost:3000](http://localhost:3000) or the port defined in your environment.

## Swagger Documentation

Swagger documentation is available at:

```
http://localhost:3000/api-docs
```

This provides an interactive interface to test the API endpoints.

## Project Structure

```
task-express/
├── bin/
│   └── www                # Script for starting the server
├── controllers/
│   └── taskController.js   # Controller for handling task operations
├── middlewares/
│   └── validationMiddleware.js  # Validation logic for task inputs
├── models/
│   └── taskModel.js        # In-memory task model (for now)
├── routes/
│   └── tasks.js            # Task routes for CRUD operations
├── public/                 # Static assets (if any)
├── app.js                  # Express application and middleware setup
├── swagger.json            # Swagger API documentation definition
├── package.json            # Project configuration and dependencies
└── README.md               # Project documentation
```

### Routes and Endpoints

| Method   | Endpoint     | Description                              |
|----------|--------------|------------------------------------------|
| `GET`    | `/tasks`     | Retrieve all tasks (supports pagination) |
| `POST`   | `/tasks`     | Create a new task                        |
| `GET`    | `/tasks/:id` | Get a specific task by ID                |
| `PUT`    | `/tasks/:id` | Update a task by ID                      |
| `DELETE` | `/tasks/:id` | Delete a task by ID                      |

### Request and Response Examples

#### Create a Task (`POST /tasks`)

**Request:**

```json
{
  "title": "New Task",
  "description": "This is a new task"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Task created successfully",
  "time": 1725574760527,
  "data": {
    "id": 1,
    "title": "New Task",
    "description": "This is a new task"
  }
}
```

#### Get All Tasks (`GET /tasks`)

Supports pagination with query parameters `page` and `size`.

**Request:**

```
GET /tasks?page=1&size=5
```

**Response:**

```json
{
   "status": true,
   "message": "Tasks retrieved successfully",
   "time": 1725874151089,
   "data": {
      "page": 1,
      "size": 5,
      "totalItems": 10,
      "totalPages": 2,
      "items": [
         {
            "id": 1,
            "title": "Task 1",
            "description": "Description for task 1"
         },
         {
            "id": 2,
            "title": "Task 2",
            "description": "Description for task 2"
         },
         {
            "id": 3,
            "title": "Task 3",
            "description": "Description for task 3"
         },
         {
            "id": 4,
            "title": "Task 4",
            "description": "Description for task 4"
         },
         {
            "id": 5,
            "title": "Task 5",
            "description": "Description for task 5"
         }
      ]
   }
}
```

#### Update a Task (`PUT /tasks/:id`)

**Request:**

```json
{
  "title": "Updated Task",
  "description": "This task has been updated"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Task updated successfully",
  "time": 1725574760527,
  "data": {
    "id": 1,
    "title": "Updated Task",
    "description": "This task has been updated"
  }
}
```

#### Delete a Task (`DELETE /tasks/:id`)

**Response:**

```json
{
  "status": true,
  "message": "Task deleted successfully",
  "time": 1725574760527,
  "data": null
}
```

## Input Validation

The API uses `express-validator` for input validation. Validation rules are defined in the `middlewares/validationMiddleware.js`.

For example, when creating or updating a task, both `title` and `description` are required fields. If they are not provided, the API will return an error like the following:

**Request:**

```json
{
  "title": "",
  "description": ""
}
```

**Response:**

```json
{
   "status": false,
   "message": "Validation failed",
   "time": 1725874058119,
   "errors": [
      {
         "type": "field",
         "value": "",
         "msg": "Title cannot be empty",
         "path": "title",
         "location": "body"
      },
      {
         "type": "field",
         "value": "",
         "msg": "Description cannot be empty",
         "path": "description",
         "location": "body"
      }
   ]
}
```

## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!
