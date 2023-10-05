
import { NextResponse } from "next/server";
import { connect } from "../connect";
import User from "../model/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function GET(){
    return NextResponse.json({
        message: "Hello World"
    })
}

export async function POST(request){
    const reqBody = await request.json();
    // console.log(reqBody)
    
    try{
        await connect();
        const checkUser=await User.findOne({
            username: reqBody.username
        });
        
        if(checkUser){
            const pass=await bcrypt.compare(reqBody.password,checkUser.password);
            if(pass){
                const token=jwt.sign(
                    {"id":checkUser._id},
                    process.env.JWT_SEC,{expiresIn:'7d'}
                )
                return NextResponse.json({
                    message: "Login Successful!",
                    token: token
                },{status:200})
            }else{
                return NextResponse.json({
                    status: 400,
                    message: "Invalid Password"
                })
            }
        }else{
            return NextResponse.json({
                status: 400,
                message: "Invalid Credentials"
            })
        }
    }catch(err){
        return NextResponse.json({
            status: 400,
            message: err.message
        })
    }    
}