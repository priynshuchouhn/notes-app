import express from 'express';
import mongoose from 'mongoose';



const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
mongoose.connect('mongodb+srv://priynshuchouhn:notesapp24@notesapp.i8xfiwc.mongodb.net/notesDb', {useNewUrlParser: true});
const NoteSchema = new mongoose.Schema({ note: String });

const Note = mongoose.model("note", NoteSchema);

const item1 = new Note({
    note: "Welcome to Todoey!"
});
const item2 = new Note({
    note: "Add your items here."
});

const defaultItem = [item1,item2];

app.get("/" , async(req,res)=>{
    let notes = await Note.find({});
    if(notes.length === 0){
        Note.insertMany(defaultItem, (err)=>{
            if(err){
                console.log(err);
            }
            console.log("Items added successfully");
        })
        res.redirect("/");
    }
    res.render("index.ejs",{
        notes: notes
    });
})
app.post("/" , async(req,res) => {
   const itemName =  req.body.newItem;
   const newItem = new Note({
    note: itemName
   });
   newItem.save();
   res.redirect('/');
})

app.post("/delete" ,(req,res) => {
    const checkedItemId =  req.body.checkbox;
    Note.findByIdAndDelete(checkedItemId, function(err){
        if(err){
            console.log(err)
        }
        console.log("item deleted successfully!");
    });
    res.redirect('/');
 })

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})