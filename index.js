const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

mongoose.connect("mongodb+srv://hsgf7667:villan7667@cluster7667.h95hy.mongodb.net/secretApp?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model("User", userSchema);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "superSecretKey",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: "mongodb+srv://hsgf7667:villan7667@cluster7667.h95hy.mongodb.net/secretApp" }),
  cookie: {
    httpOnly: true,
    secure: false, 
    maxAge: 1000 * 60 * 60
  }
}));

function checkAuth(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login");
  }
}

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/secret", checkAuth, async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("secret", { user });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const existingUser = await User.findOne({ email });

  if (existingUser) return res.redirect("/login");

  const user = new User({ name, email, password: hashed });
  await user.save();
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.redirect("/login");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.redirect("/login");

  req.session.userId = user._id;
  res.redirect("/secret");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
