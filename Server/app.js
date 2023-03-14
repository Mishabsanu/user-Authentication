require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const authUserRoutes = require("./routes/authUser");
const authAdminRoutes = require("./routes/authAdmin");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/authUser", authUserRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/authAdmin", authAdminRoutes);

const port = process.env.PORT || 1000;
app.listen(port, console.log(`Listening on port ${port}...`));