const express = require('express');
require("./db/conn");
const Student = require('./models/students');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// create a new students
app.post("/students", (req, res) => {

  console.log(req.body);

  const user = new Student(req.body);
  user.save().then(() => {
    res.send(user);
  }).catch((e) => {
    res.send(e);
  });

  // res.send("Hello Kartik");
})

app.get("/students", async (req, res) => {

  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (e) {
    res.send(e);
  }
})

app.get('/students/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(_id.id);
    // res.send(req.params.id);

    const studentData = await Student.findById(_id);

    if (!studentData) {
      return res.status(404).send();
    } else {
      res.send(studentData);
    }

  } catch (e) {
    res.status(500).send(e);
  }
})

// update the students by it's id

app.patch("/students/:id",async (req,res) =>{
  try{
    const _id = req.params.id;
    const updateStudents = await Student.findByIdAndUpdate(_id,req.body,{
      new:true
    });
    res.send(updateStudents);
  }catch(e){
    res.status(404).send(e);
  }
})

app.listen(port, () => {
  console.log(`connection is setup at ${port}`);
})
