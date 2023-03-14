require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require('morgan');
const connection = require("./db");
const authAdminRoutes = require("./routes/authAdmin");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

// routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/authAdmin", authAdminRoutes);

const port = process.env.PORT || 1000;
app.listen(port, console.log(`Listening on port ${port}...`));
