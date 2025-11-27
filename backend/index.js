// Dotenv for production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");
const User = require("./models/user");
const app = express();

// Allow CORS origin for React frontend
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Middleware for body parsing (JSON and URL-encoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// Session store
const secret = process.env.SECRET;
const store = new MongoStore({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60, // doesn't update db if same for amount of seconds
});
store.on("error", function (e) {
  console.log("Session store error", e);
});
const sessionConfig = {
  store: store,
  // name: "session",
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // protect against cookies being extracted by a javascript attack
    httpOnly: true,
    // you want this setting for shtml but doesn't work on local server
    secure: process.env.NODE_ENV === "production",
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
};

// Needed in production due to Render.com using a proxy
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
app.use(session(sessionConfig));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Require routes
let postsRouter = require("./routes/posts");
let usersRouter = require("./routes/users");
// let commentsRouter = require("./routes/comments");

// Use routes
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
// app.use("/api/comments", commentsRouter);

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
