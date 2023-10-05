import { mongoose } from "mongoose"

const postSchema=new mongoose.Schema({
    post:{
        type:[],
        default:[]
    }
},{timestamps:true})

const Posts = mongoose.model('Posts', postSchema);

export default Posts;
