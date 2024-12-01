const express = require('express')
const mongoose = require('mongoose')
const bookSchema = require('./bookSchema')
const cors = require('cors')

const app = express()
const PORT = 1234

app.use(express.json())
app.use(cors())


mongoose.connect("mongodb://localhost:27017/bookkeeper", { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('DB Connected')
})
.catch((err)=>{
    console.log(err)
})

app.post('/addBook',async(req,res)=>{
    try{
        const{title,author,genre,year,releaseDate} = req.body;

        let send = await bookSchema.create({
            title:title,
            author:author,
            genre:genre,
            year:year,
            releaseDate:releaseDate
        })
        if(send){
            res.status(200).json({msg:'Your book is added'})
        }else{
            res.status(400).json({err:'Unable to add book'})
        }

    }catch(err){
        console.log('Error in /addBook',err)
        res.status(500).json({err:'Internel server error'})
    }
})

app.get("/fetchBook",async(req,res)=>{

    let data = await bookSchema.find();
    res.send(data);
})

app.put("/updateBook/:_id",async(req,res)=>{
    const { _id } = req.params;
  const updatedBook = req.body;

  try {
    await bookSchema.findByIdAndUpdate(_id, updatedBook);
    res.status(200).json({ msg: 'Book updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book.' });
  }
})

app.delete("/deleteBook/:id", async (req, res) => {
    try {
      const bookId = req.params.id;
      const deletedBook = await bookSchema.findByIdAndDelete(bookId);
      if (deletedBook) {
        res.status(200).json({ "msg": "Book deleted successfully" });
      } else {
        res.status(404).json({ "error": "Book not found" });
      }
    } catch (err) {
      res.status(500).json({ "error": err.message });
    }
  });

  
app.listen(PORT, ()=>{
    console.log(`Connection is build on ${PORT}`)
})