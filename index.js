const app = require("express")();

app.set("view engine", "ejs");

app.listen(6969, () => {
  console.log("listening on http://localhost:6969");
});

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Bruh bruh bruh",
      snippet: "lorem doesnt work on javascript files! awesome",
    },
    { title: "ur mom", snippet: "I wont finish the third blog hehe" },
    {
      title: "pls dont make this repo public",
      snippet: "this is the third blog and ",
    },
  ];
  res.render("index", { title: "Home", blogs: blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello ur in the index</h1>");
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Not found" });
});
