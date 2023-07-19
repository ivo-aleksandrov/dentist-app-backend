const express = require("express");
require("express-async-errors");
const app = express();
const patients = require("./routes/patients");
const treatments = require("./routes/treatments");
const events = require("./routes/events");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./DB/connect");
require("dotenv").config();

// middleware
app.use(express.json());

// routes

app.use("/patients", patients);
app.get("/patients", patients);
app.get("/patients/:identityNumber", patients);
app.post("/patients", patients);
app.delete("/patients/:identityNumber", patients);
app.patch("/patients/:identityNumber", patients);

app.use("/treatments/:identityNumber", treatments);
app.get("/treatments/:identityNumber", treatments);
app.post("/treatments/", treatments);
app.patch("/treatments/:identityNumber", treatments);
app.delete("/treatments/:_id", treatments);

app.use("/events", events);
app.get("/events", events);
app.get("/events/:date", events);
app.post("/events", events);
app.delete("/events/:_id", events);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// App configurations
const port = 8880;

const start = async () => {
  try {
    await connectDB(process.env.DB_URI);

    app.listen(
      port,
      console.log(
        `Backend is working on port ${port} and it is connected to the DB.`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

start();
