const express = require("express");
const mongoose = require("mongoose");

const contacts = require("./routes/api/contacts");

const app = express();

// db config
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello1"));

// use routes
app.use("/api/contacts", contacts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Port running on port ${port}`));
