const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./src/config/db");
const cors = require("cors");
const UserRouter = require('./src/routes/userRoutes');
// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
//cors
app.use(cors());
app.use('/', UserRouter);

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});



app.get("/testing", (req, res) => {
  console.log("connected");
})