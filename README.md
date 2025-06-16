# Simple Blog API

This is a simple RESTful Blog API built using **Express**, **Prisma ORM**, and **PostgreSQL**.

It allows users to create accounts and publish blog posts. Each post is tied to a single user, and users can have multiple posts.

The project is deployed using Render 

---

## 🚀 Technologies Used

- **Node.js & Express** – Server and routing
- **Prisma ORM** – Database interaction
- **PostgreSQL** – Relational database
- **Render** – Deployment platform

---

## 📌 Models Overview

### User Model

| Field         | Type    | Details                     |
|---------------|---------|-----------------------------|
|id          | String  | UUID, Primary Key           |
| firstName   | String  |                             |
|lastName    | String  |                             |
|emailAddress| String  | Unique                      |
| username    | String  | Unique                      |

### Post Model

| Field         | Type      | Details                     |
|---------------|-----------|-----------------------------|
| id          | String    | UUID, Primary Key           |
|title       | String    |                             |
| content     | String    |                             |
|createdAt   | DateTime  | Default: now()              |
| lastUpdated | DateTime  | Auto-updated                |
| isDeleted   | Boolean   | Default: false              |
|authorId    | String    | Foreign key to User       |

---

## 📫 API Endpoints

### USER ROUTES

### GET /users
- Returns a list of all users.

### GET /users/:id
- Returns a single user by ID, including all their blog posts.

### POST /users
- Creates a new user.

#### Request Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "emailAddress": "john@example.com",
  "username": "john_doe"
}
```


### POST ROUTES

### `GET /posts`

* Returns a list of all posts, including author details.

### `GET /posts/:id`

* Returns a specific post by ID, including the author details.

### `POST /posts`

* Creates a new blog post.

#### Request Body:

```json
{
  "title": "My First Post",
  "content": "This is the content of the post.",
  "authorId": "user-uuid-here"
}
```

### `PUT /posts/:id`

* Updates a blog post's title and content.

#### Request Body:

```json
{
  "title": "Updated Post Title",
  "content": "Updated content." 
}
```

### `DELETE /posts/:id`

* Soft deletes a post (sets `isDeleted` to `true`).

---

## 🌐 Deployment

The API is live at: `[https://blog-api-dqmq.onrender.com]` )

---

## 🧪 Test Locally

1. Clone the repo:

```
git clone https://github.com/your-username/blog-api.git
cd blog-api
```

2. Install dependencies:

```
npm install
```

3. Set your environment variable:

```
DATABASE_URL="your_postgresql_connection_string"
```

4. Run Prisma migrations:

```
npx prisma migrate dev --name init
```

5. Start the server:

```
npm run dev
```



