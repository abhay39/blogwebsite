
import { NextResponse } from "next/server";
import { connect } from "../connect";
import User from "../model/user";
import bcrypt from 'bcryptjs';

export async function GET(){
    return NextResponse.json({
        message: "Hello World"
    })
}

export async function POST(request){
    const reqBody = await request.json();
    
    try{
        await connect();
        const checkUser=await User.findOne({
            email: reqBody.email
        });
        if(checkUser){
            return NextResponse.json({
                status: 400,
                message: "User already exists"
            })
        }else{
            const hashedPassword=await bcrypt.hash(reqBody.password,10);
            const data=new User({
                fullname: reqBody.fullname,
                email: reqBody.email,
                password: hashedPassword,
                gender: reqBody.gender,
                profilePic: reqBody.profilePic,
                username: reqBody.username,
            })
            const res= await data.save();
            if(res){
                return NextResponse.json({
                    status: 200,
                    message: "User Created Successfully!",
                })
            }else{
                return NextResponse.json({
                    status: 400,
                    message: "Unable to create your account"
                })
            }
        }
    }catch(err){
        return NextResponse.json({
            status: 400,
            message: err.message
        })
    }    
}