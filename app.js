const express = require("express");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app =  express();
const port = process.env.PORT || 5001;

connectDb();

// Configure CORS to allow requests from your frontend origin
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable passing of cookies, if needed
}));

app.use(express.json());
app.use("/api/users",require("./src/routes/UserRoutes"));
app.use("/api/contests",require("./src/routes/ContestRoutes"));


app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});