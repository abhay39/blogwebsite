import { mongoose } from "mongoose"

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        required:true
    },
    post:{
        type:[],
        default:[],
        
    },
    follow:{
        type:[],
        default:[]
    },
    following:{
        type:[],
        default:[]
    },
    dislikes:{
        type:[],
        default:[]
    },
    likes:{
        type:[],
        default:[]
    },
    comment:{
        type:[],
        default:[]
    }
},{timestamps:true})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
