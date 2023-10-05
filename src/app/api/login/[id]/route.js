import { NextResponse } from "next/server";
import User from "../../model/user";

import jwt from 'jsonwebtoken';
import { connect } from "../../connect";

export async  function GET(request,content){
    const{id}=content.params;

    try{
        await connect();
        const tokensss=await jwt.verify(id,process.env.JWT_SEC);
        const getUserDetails=await User.findById(tokensss.id);
        if(getUserDetails){
            return NextResponse.json({
                "data": getUserDetails,
            })
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