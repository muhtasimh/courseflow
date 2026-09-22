# CourseFlow

CourseFlow is a full-stack semester planning application for managing courses and tracking academic progress.

The application uses a React frontend, an Express REST API, and MongoDB for persistent course storage.

## Features

- Add, edit, and delete courses
- Track courses as Planned, In Progress, or Completed
- Search courses by course code or name
- Calculate total semester credits
- Track completed credits
- Persistent course storage with MongoDB
- Responsive user interface
- Form validation and API error handling

## Tech Stack

### Frontend
- React
- JavaScript
- HTML/CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver

### Development
- Git
- GitHub
- REST API architecture

## Architecture

CourseFlow uses a client-server architecture:

React Frontend → Express REST API → MongoDB

The React client communicates with the Express backend through HTTP requests. The backend exposes REST endpoints for course operations and stores course data in MongoDB.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/courses` | Retrieve all courses |
| POST | `/api/courses` | Create a course |
| PUT | `/api/courses/:id` | Update a course |
| DELETE | `/api/courses/:id` | Delete a course |

## Course Data

Each course contains:

- Course code
- Course name
- Credit value
- Completion status

Available statuses are:

- Planned
- In Progress
- Completed

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/muhtasimh/courseflow.git
cd courseflow