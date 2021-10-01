const express = require('express');
require("./db/conn");
const Student = require('./models/students');
const app = express();
const port = process.env.PORT || 3000;
const studentRouter = require("./routers/student");


app.use(express.json());
// create a new router
app.use(studentRouter);

app.listen(port, () => {
  console.log(`connection is setup at ${port}`);
})
