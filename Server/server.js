const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const posts = [
  { id: 1, title: "Post 1", body: "This is the first post." },
  { id: 2, title: "Post 2", body: "This is the second post." },
  { id: 3, title: "Post 3", body: "This is the third post." }
];
app.get('/posts', (req, res) => {
  res.json(posts);
});
app.post('/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    body: req.body.body
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.delete("/posts/:id", (req, res) => {
  console.log("DELETE HIT");

  const postId = Number(req.params.id);

  posts = posts.filter(
    post => post.id !== postId
  );

  console.log(posts);

  res.status(200).json({
    message: "Deleted Successfully"
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
