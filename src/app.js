const express = require('express');
require("./db/conn");
const Student = require('./models/students');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// create a new students
app.post("/students",(req,res) =>{

  console.log(req.body);

  const user = new Student(req.body);
  user.save().then(() =>{
    res.send(user);
  }).catch((e) =>{
    res.send(e);
  });

  // res.send("Hello Kartik");
})

app.listen(port, ()=>{
  console.log(`connection is setup at ${port}`);
})