const express= require("express");
const bodyParser= require("body-parser");
var app= express();
app.set("view engine","ejs");
app.use(express.static(__dirname +'/public'));
//app.use("/public", express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const mongoose =require('mongoose');
const { name } = require("ejs");
mongoose.connect("mongodb://localhost:27017/student_database");
const studentSchema= new mongoose.Schema({
    name:String,
    class:Number,
    age:Number,
    grade:String
});
const student = mongoose.model("entry",studentSchema);


app.get("/listItems", (req, res)=>{
    student.find({})
     .then(function(foundItems) 
      {res.render("list",{ studentej : foundItems})
    }) 
      .catch(function(err){
       console.log(err)
    });
}); 

// app.get("/list", (req, res)=>{
//     student.find({})
//      .then(function(foundItems) 
//       {res.render("list",{ studentej : foundItems})
//     }) 
//       .catch(function(err){
//        console.log(err)
//     });
// }); 
app.post("/create",(req,res)=>{
    const studentName= req.body.ele1;
    const studentClass= req.body.ele2;
    const studentAge= req.body.ele3;
    const studentGrade= req.body.ele4;

    const todo = new student ({
        name : studentName,
        class: studentClass,
        age: studentAge,
        grade: studentGrade
    });
    todo.save();
    res.redirect("/listItems");
    });
app.post("/delete",async(req,res)=>{
    await student.findByIdAndDelete(req.body.delete_button);
    res.redirect("/listitems")  
});


app.post("/update_get",async(req,res)=>{
       await student.findById(req.body.update_button);
         res.end()
    });
app.post("/update_post", async(req,res)=>{
       await student.update(
                {name:req.body.ele5},
                {class: req.body.ele6},
                {age: req.body.ele7},
                {grade: req.body.ele8},
               
                );
                res.redirect("/listItems");
    
    });
        










app.listen("5002",function(){
    console.log("server is running");
});