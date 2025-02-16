const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");

app.use(cors({
  origin: "*", // Your frontend URL
  credentials: true
}));
// Cross-origin resource sharing (CORS) is needed for authorized resource sharing with external third parties.
app.use(express.json()); // Body Parser - handling incoming data in a variety of formats, such as JSON, URL-encoded form data, and raw or text data
require("dotenv").config();

const dbConnect = require("./config/db");
dbConnect();

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", accountRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Your server is up and running..." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});