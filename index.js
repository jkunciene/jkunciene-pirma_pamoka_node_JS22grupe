const express = require('express');
const app = express();


app.use(express.json());
//tarkim tai duomenys is DB
const courses = [
    {id: 1, name: "js"},
    {id: 2, name: "react"},
    {id: 3, name: "node js"}
]
//visu kursu gavimas
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
//uzklausos parametru matymas-gavimas
// app.get('/api/courses/:id', (req, res)=>{
//     res.send(req.params.id);
// });
//gauti konkreciu kursu info, jei nera-spausdinti klaidos pranesima
app.get('/api/courses/:id', (req, res) => {
    const my_course = courses.find(course => course.id === parseInt(req.params.id));
    if(!my_course) res.status(404).send("not found");
    res.send(my_course);
 })

 //nauju kursu idejimas
 app.post('/api/courses', (req, res) => {
   
    const course = {
        id: courses.length + 1,
        name: req.body.name 
     };
     courses.push(course);
     res.send(course);
 });

 app.put('/api/courses/:id', (req, res) => {
    //look up the course
    //if not existing, return
    const my_course = courses.find(course => course.id === parseInt(req.params.id));
    if(!my_course) return res.status(404).send("not found");
   
    //update course
    //return the course
    my_course.name = req.body.name;
    res.send(my_course);
});

app.listen(3000, ()=>{
    console.log('mano servas veikia');
})