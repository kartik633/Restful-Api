const express = require("express");
const router = new express.Router();
const Student = require('../models/students');

router.get("/thapa", (req,res)=>{
    res.send("Hello it's kartik");
})


// create a new students
router.post("/students", (req, res) => {

  console.log(req.body);

  const user = new Student(req.body);
  user.save().then(() => {
    res.send(user);
  }).catch((e) => {
    res.send(e);
  });

  // res.send("Hello Kartik");
})

// read all the data

router.get("/students", async (req, res) => {

  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (e) {
    res.send(e);
  }
})

router.get('/students/:id', async (req, res) => {
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

router.patch("/students/:id",async (req,res) =>{
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

// delete student records

router.delete("/students/:id", async(req,res) =>{
  try{
    const id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(id);
    if(!id){
      return res.status(400).send();
    }
    res.send(deleteStudent);
  }catch(e){
    res.status(500).send(e);
  }
})


module.exports = router;
