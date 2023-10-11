const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now 
      },
    
      updatedAt: {
        type: Date,
        default: Date.now
      },
    
      title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [6, 'Title should be more than 5 characters']
      },
    
      text: {
        type: String,
        required: [true, 'Text is required'],
        minlength: [6, 'Text should be more than 5 characters']
      },
    
      author: {
        type: String,
        required: [true, 'Author is required']
      }
});

const Posts = mongoose.model("Posts", schema);

module.exports = Posts;