import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));
var blogPost = [];
blogPost = [
  {
    title: "This is my First Post",
    post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "This is my Second Post",
    post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "This is my Third Post",
    post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

function post(req, res, next) {
  console.log(req.body);

  next();
}

app.use(post);
app.get("/", (req, res) => {
  res.render("index.ejs", { blogPost });
});

app.get("/add-post", (req, res) => {
  res.render("add-post.ejs");
});
app.post("/submit", (req, res) => {
  if (req.body["title"]) {
    blogPost.push({ title: req.body["title"], post: req.body["content"] });
  }
  res.redirect("/");
});
app.post("/submit-edit", (req, res) => {
  console.log(req.body);
  blogPost[req.body["id"]].title = req.body["title"];
  blogPost[req.body["id"]].post = req.body["content"];
  res.redirect("/");
});
app.get("/delete", (req, res) => {
  var postId = req.query;
  blogPost.splice(postId.id, 1);
  console.log(postId);
  res.redirect("/");
});
app.get("/view", (req, res) => {
  var postId = req.query;
  console.log(postId);
  res.render("view-post.ejs", { postId, blogPost });
});
app.get("/edit", (req, res) => {
  var postId = req.query;
  res.render("edit-post.ejs", { postId, blogPost });
});
app.listen(PORT, (error) => {
  if (!error) console.log("Server is listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
