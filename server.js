const express = require("express");
const axios = require("axios");
const app = express();
var BodyParser = require("body-parser");

const base_url = "http://localhost:3000";

app.set("view engine", "ejs");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  try {
    const respose = await axios.get(base_url + "/books");
    res.render("books", { books: respose.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const respose = await axios.get(base_url + "/books/" + req.params.id);
    res.render("book", { book: respose.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", async (req, res) => {
  try {
    const data = { title: req.body.title, aurhor: req.body.aurhor };
    await axios.post(base_url + "/books/" , data);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/update/:id", async (req, res) => {
  try {
    const respose = await axios.post(base_url + "/books/" + req.params.id);
    res.render("update", { book: respose.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.post("/update/:id", async (req, res) => {
  try {
    const data = { title: req.body.title, aurhor: req.body.aurhor };
    await axios.put(base_url + "/books/" + req.params.id , data);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    await axios.delete(base_url + "/books/" + req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(5500,()=>{
    console.log('Server started on port 5500');
})