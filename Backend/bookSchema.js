const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: { 
    type: String, 
    required: true 
},
  genre: { 
    type: String, 
    required: true 
},
  year: { 
    type: Number, 
    required: true 
},
  releaseDate: { 
    type: Date, 
    optional: true 
}, 
});

const bookList = mongoose.model("bookSchemas",bookSchema)

module.exports = bookList;
