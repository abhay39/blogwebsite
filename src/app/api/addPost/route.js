import { NextResponse } from "next/server";
import User from "../model/user";
import { connect } from "../connect";
import Posts from "../model/blogpost";

export async function GET(){
    return NextResponse.json({
        message: "Hello bloggers"
    })
}

export async function POST(request){
    const {userId, title,description,image}=await request.json();

    try{
        await connect();
        const findUser=await User.findById(userId);
        if(!findUser){
            return NextResponse.status(404).json({
                message: "User not found"
            })
        }else{
            const newPost=new Posts({
                userId:userId,
                title:title,
                description:description,
                image:image
            })
            const updateNow=await User.findByIdAndUpdate(userId,{
                $push:{
                    post:newPost._id
                }
            })
            await newPost.save();
            return NextResponse.status(200).json({
                message: "Post created"
            })
        }    
    }catch(err){
        return NextResponse.status(500).json({
            message: err.message
        })
    }
}