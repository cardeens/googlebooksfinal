const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
const cors = require("cors")

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
}
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/googlebooks",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  );

// Define API routes here
app.use("/api", apiRoutes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});