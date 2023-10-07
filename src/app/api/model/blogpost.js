import { mongoose } from "mongoose"

const postSchema=new mongoose.Schema({
    email: {
        type: String, 
        required: true,
      },
      fullname:{
        type:String,
        required:true
      },
      userProfilePic:{
        type:String,
        required:true
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String, 
      },
      likes:{
        type:[],
        default:[],
      },
      comment:{
        type:[],
        default:[],
      },
      share:{
        type:[],
        default:[],
      },
      dislikes:{
        type:[],
        default:[],
      },
      date: {
        type: Date,
        default: Date.now,
      },
},{timestamps:true})

const Posts =mongoose.models.Posts ||  mongoose.model('Posts', postSchema);

export default Posts;
