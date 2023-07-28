import express from 'express';
import mongoose from 'mongoose';



const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
mongoose.connect('mongodb://127.0.0.1:27017/notesDb', {useNewUrlParser: true});
const NoteSchema = new mongoose.Schema({ note: String });

const Note = mongoose.model("note", NoteSchema);

// let notes = [];


app.get("/" , async(req,res)=>{
    let notes = await Note.find({});
    console.log(notes);
    res.render("index.ejs",{
        notes: notes
    });
})
app.post("/" ,(req,res)=>{
    // const note = new Note({
    //     note: req.body['notes']
    // });
    // note.save();
    const notes = Note.find();
    console.log(notes);
    res.render("index.ejs",{
        notes: notes
    });
})

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})