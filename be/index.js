const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMySQL } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth");
const URL = require("./models/userModel");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

// Connect to MySQL database
connectToMySQL()
  .then(() => {
    console.log("Connected to MySQL database");
  })
  .catch((err) => {
    console.error("Failed to connect to MySQL:", err);
    process.exit(1); // Exit if connection fails
  });

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

// Redirect handler for short URLs
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  // Update visit history in MySQL database
  db.query(
    'UPDATE urls SET visitHistory = JSON_ARRAY_APPEND(visitHistory, "$", ?) WHERE shortId = ?',
    [Date.now(), shortId],
    (err, result) => {
      if (err) {
        return res.status(500).send("Database error");
      }

      // Retrieve the original redirect URL
      db.query(
        "SELECT redirectURL FROM urls WHERE shortId = ?",
        [shortId],
        (err, rows) => {
          if (err) {
            return res.status(500).send("Database error");
          }

          const redirectURL = rows[0]?.redirectURL;
          if (redirectURL) {
            return res.redirect(redirectURL);
          } else {
            return res.status(404).send("URL not found");
          }
        }
      );
    }
  );
});

// Start the server
app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
