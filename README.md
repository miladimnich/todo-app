# Todo App

A full-stack Todo application built with **Next.js (React)** for the frontend and **Express + Prisma + PostgreSQL** for the backend.  
The app supports tasks with `title`, `description`, `priority`, `completed` status, creation/update timestamps, and optional filtering and sorting.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Setup](#setup)  
5. [Environment Variables](#environment-variables)  
6. [Running the App](#running-the-app)  
7. [API Endpoints](#api-endpoints)  
8. [Frontend Usage](#frontend-usage)  
9. [Database Management](#database-management)  
10. [License](#license)  

---

## Features

- Create, update, delete, and toggle tasks.  
- Filter tasks by status: `all`, `done`, or `undone`.  
- Sort tasks by priority (ascending/descending).  
- Optional description field for each task.  
- Timestamps for creation and updates.  

---

## Tech Stack

- **Frontend:** Next.js  (React), TypeScript, TailwindCSS.  
- **Backend:** Node.js, Express, Prisma ORM.  
- **Database:** PostgreSQL.  
- **Others:** Prisma Studio, dotenv.  

---

## Project Structure
todo-app/
├─ backend/
│ ├─ src/
│ │ ├─ controllers/
│ │ ├─ routes/
│ │ ├─ services/
│ │ ├─ app.js/
│ │ └─ server.js
│ ├─ prisma/
│ │ └─ schema.prisma
│ └─ package.json
├─ frontend/
│ ├─ app/
│ │ ├─ components/
│ │ ├─ hooks/
│ │ ├─ services/
│ │ └─ types/
│ ├─ page.tsx
│ └─ package.json
└─ README.md

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/miladimnich/todo-app.git

cd backend
npm install

cd frontend
npm install

cd todo-app
npm install

Environment Variables

Create .env in the backend and .env.local in the frontend.

Backend .env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
PORT=8080
CLIENT_URL=http://localhost:3000

Frontend .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

Running the App

Backend
cd backend
npx prisma migrate dev --name init       # Run database migration
npx prisma generate                      # Generate Prisma client

cd todo-app
npm run dev 

Open your browser at http://localhost:3000 to view the app.

## API Endpoints

| Method | Endpoint       | Description                                      |
|--------|----------------|-------------------------------------------------|
| GET    | `/tasks`       | Get all tasks (supports query parameters `status` and `sort`) |
| POST   | `/tasks`       | Create a new task                                |
| PUT    | `/tasks/:id`   | Update an existing task                          |
| DELETE | `/tasks/:id`   | Delete a task                                    |

### Query Parameters (GET `/tasks`)

- `status`: `"all" | "done" | "undone"`  
- `sort`: `"priority:asc" | "priority:desc"`  

---

## Frontend Usage

- Add a new task by entering a title and optional priority.  
- Edit tasks directly in the task list.  
- Toggle the completion status using the checkbox.  
- Remove tasks with the delete button.  
- Filter and sort tasks using the dropdown menus.  

---

## Database Management

### Prisma Studio

Use Prisma Studio to view or edit the database:

```bash
cd backend
npx prisma studio
