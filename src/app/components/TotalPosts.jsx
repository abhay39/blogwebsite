"use client"
import Image from "next/image"
import user from '../../../public/a.png';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
import {FaRegComment} from 'react-icons/fa';
import { BsShare } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { dummy } from "../dummyposts";
import { useState } from "react";

const TotalPosts = () => {
  
  const [isLiked,setIsLiked]=useState(false);

  return (
    <div className="mt-3">
        {dummy.map((item)=>{
          return(
            <div key={item.id}>
              <div className="flex items-center">
            <Image src={user} alt="profile image" height={50} width={50} className="rounded-full w-10 h-10 object-fill"/>
            <div className="ml-2">
              <h1 className="font-semibold text-lg">{item.name}</h1>
              <p className="-mt-1">{item.publishedOn}</p>
            </div>
        </div>
        <div>
          <h1 className="font-semibold text-lg text-red-500 mt-1 text-justify">{item.title}</h1>
          <p className="text-gray-600 text-sm text-justify">{item.description}</p>
          <Image src={user} className="h-full w-full object-fill rounded"/>
        </div>
        <div className="flex mt-3">
          <div className="flex items-center">
            <p className="font-bold text-red-600 select-none">0</p>
            {isLiked?(<AiFillHeart onClick={()=>setIsLiked(!isLiked)} className="ml-1 cursor-pointer" size={20} />):(<AiOutlineHeart onClick={()=>setIsLiked(!isLiked)} className="ml-1 cursor-pointer" size={20}  />)}
          </div>
          <div className="flex items-center ml-4">
            <p className="font-bold text-red-600 select-none">0</p>
            <BiComment className="ml-2 cursor-pointer" size={20} />
          </div>
          <div className="flex items-center ml-4">
            <p className="font-bold text-red-600 select-none">0</p>
            <BsShare className="ml-


2 cursor-pointer" size={20}  />
          </div>
        </div>
          <hr className="mb-2 mt-2"/>
            </div>
          )
        })}
    </div>
  )
}

export default TotalPosts;