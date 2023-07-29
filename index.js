import express from 'express';
import mongoose from 'mongoose';



const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
mongoose.connect('mongodb+srv://priynshuchouhn:notesapp24@notesapp.i8xfiwc.mongodb.net/notesDb', {useNewUrlParser: true});
const NoteSchema = new mongoose.Schema({ note: String });

const Note = mongoose.model("note", NoteSchema);

app.get("/" , async(req,res)=>{
    let notes = await Note.find({});
    console.log(notes);
    res.render("index.ejs",{
        notes: notes
    });
})
app.post("/" ,(req,res)=>{

    const notes = Note.find();
    console.log(notes);
    res.render("index.ejs",{
        notes: notes
    });
})

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})