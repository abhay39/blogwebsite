import { NextResponse } from "next/server";
import User from "../model/user";
import { connect } from "../connect";
import Posts from "../model/blogpost";
// import Posts from "../model/blogpost";

export async function GET(){
    return NextResponse.json({
        message: "Hello bloggers"
    })
}

export async function POST(request){
    const reqBody = await request.json();
    console.log(reqBody);

    await connect();
    try{
        const findUser=await User.findOne({
            email: reqBody.email
        });

        if(findUser){
            const data={
                email:reqBody.email,
                title:reqBody.title,
                description:reqBody.description,
                image:reqBody.image,
                likes:[],
                comment:[],
                share:[],
                dislikes:[],
                timestamp:new Date()
            }
            const newPost=await new Posts({
                email:reqBody.email,
                title:reqBody.title,
                description:reqBody.description,
                image:reqBody.image,
                userProfilePic:reqBody.userProfilePic,
                fullname:reqBody.fullname
            })
            const updateNow=await User.findByIdAndUpdate(findUser._id,{
                $push:{
                    post:data
                }
            })
            const completed=await newPost.save();
            if(completed){
                return NextResponse.json({
                    message: "Post uploded successfully",   
            },{status:202})
            }else{
                return NextResponse.json({
                    message: "Something went wrong"
                },{status:404})
            }
        }else{
            return NextResponse.json({
                message: "User not found"
            },{status:404})
        }    
    }catch(err){
        return NextResponse.json({
            status: 400,
            message: err.message
        },{status:500})
    }
    // return NextResponse.json({
    //     message: reqBody,
    //     status:200,
    // })
}