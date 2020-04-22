const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  id: String,
  isbn: String,
  title: String,
  author: String,
  description: String,
  published_year: { type: Number, min: 1945, max: 2019 },
  publisher: String,
  updated_date: { type: Date, default: Date.now },
});

const BookModel = mongoose.model('Book', BookSchema)
export default BookModel;