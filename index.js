import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to this Blog API😗</h1>");
});

// GET /users - Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await client.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "It's not you! It's us 😩" });
  }
});

// POST /users - Create a new user
app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, username } = req.body;

    const newUser = await client.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        username,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Something went wrong😢. Try again later🙂" });
  }
});

// GET /users/:id - Get user by ID plus their posts
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await client.user.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found 😢" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Oh no! 😩" });
  }
});

// GET /posts - Get all posts with author info.
app.get("/posts", async (req, res) => {
  try {
    const posts = await client.post.findMany({
      include: {
        author: true,
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "It's not you! It's us 😩" });
  }
});

// GET /posts/:id - Get single post with author info
app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await client.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found 😢" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "It's not you! It's us 😩" });
  }
});

// POST /posts - Create new post
app.post("/posts", async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    const newPost = await client.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "It's not you! It's us 😩" });
  }
});

// PATCH /posts/:id - Update a post
app.patch("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPost = await client.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Update failed 😩" });
  }
});

// DELETE /posts/:id - Delete post
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletePost = await client.post.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    res.status(200).json({ message: "Post deleted succesfully", deletePost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Delete failed 😩" });
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
