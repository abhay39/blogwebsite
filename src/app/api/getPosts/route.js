import { NextResponse } from "next/server";
import Posts from "../model/blogpost";
import { connect } from "../connect";
import User from "../model/user";
import { data } from "autoprefixer";

export async function GET(){
    const posts = await Posts.find({}).sort('-createdAt');
    return NextResponse.json({
        status: 200,
        posts: posts
    });
}

export async function POST(request){
    const reqBody = await request.json();
    
    try{
        await connect();
        const findUser=await User.findById(reqBody.userId);
        const findPost=await Posts.findById(reqBody.id);
        if(findUser && findPost){
            const updatePostLikes=await Posts.findByIdAndUpdate(reqBody.id,{
                $push:{
                    likes:reqBody.userId
                }
            })
            const updateUserLikes=await User.findByIdAndUpdate(reqBody.userId,{
                $push:{
                    likes:reqBody.id
                }
            })
            const findMainPost=await User.findOne({
                email: reqBody.email
            });    

            const result = await User.updateOne(
                {
                  _id: findMainPost._id, 
                  'post.title': findPost.title,
                },
                {
                  $push: {
                    'post.$.likes': reqBody.userId,
                  },
                }
            );
            
            if(result && findMainPost && updatePostLikes &&updateUserLikes){
                return NextResponse.json({
                    status: 200,
                    message: "You liked this blog successfully!!!"
                })
            }else{
                return NextResponse.json({
                    status: 400,
                    message: "Error Liking post!"
                })
            }
        }else{
            return NextResponse.json({
                status: 400,
                message: "Something went wrong"
            })
        }
    }catch(err){
        return NextResponse.json({
            status: 400,
            message: err.message
        },{status:500})
        console.log(err.message)
    }
}