"use client"
import Image from "next/image"
import user from '../../../public/a.png';
import {AiOutlineHeart,AiFillHeart, AiOutlineLike, AiTwotoneLike} from 'react-icons/ai';
import {FaRegComment} from 'react-icons/fa';
import { BsShare } from "react-icons/bs";
import { BiComment, BiDislike, BiSolidDislike } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { AuthenicationProvider } from "../authProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TotalPosts = () => {
  
  const [isLiked,setIsLiked]=useState(false);
  const [totalPosts,setTotalPosts]=useState([])
  const {userData}=useContext(AuthenicationProvider);

  const getTotalPosts=async()=>{
    const res=await fetch('/api/getPosts');
    const data=await res.json();
    setTotalPosts(data.posts);
  }
  useEffect(()=>{
    getTotalPosts();
  },[])


  const handleLike=async(item)=>{
      if(userData.fullname==item.fullname){
        toast.error("You can't like your own post")
      }else{
        const res=await fetch(`/api/getPosts/`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            id:item._id,
            userId:userData._id,
            email:item.email
          })
        })
        const data=await res.json();
        
        if(data.status===200){
          toast.success(data.message);
        }else{
          toast.error(data.message);
        }
      }
  }

  const handleLikeDislikes=async(item)=>{
    if(userData.fullname==item.fullname){
      toast.error("You can't dislike your own post")
    }else{
      const res=await fetch(`/api/getPosts/`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          id:item._id,
          userId:userData._id
        })
      })
      const data=await res.json();
      if(data.status===200){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    }
  }

  function canVote(id) {
    return id == item._id;
  }

  const checkIsIfLikedOrNot=()=>{
    const checkById=userData.likes.filter(item)
  }

  return (
    <div className="mt-3">
      <ToastContainer />
        {totalPosts.length>0?(totalPosts.map((item)=>{
          const createdAt = item.createdAt;
          
          // Convert createdAt and updatedAt to JavaScript Date objects
          const createdAtDate = new Date(createdAt);
          
          const createdAttLocalTime = createdAtDate.toLocaleTimeString();
          const createdAtLocatDate = createdAtDate.toLocaleDateString();

          return(
            <div key={item._id}>
              <div className="flex items-center">
            <Image src={item.userProfilePic} alt="profile image" height={50} width={50} className="rounded-full w-10 h-10 object-fill"/>
            <div className="ml-2">
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg">{item.fullname}</h1>
                
                {userData.follow?.find(followeed=>followeed.fullname==item.fullname)?(<button className="ml-20 p-2 bg-orange-500 rounded text-white">Unfollow</button>):(<button className="ml-20 p-2 bg-orange-500 rounded text-white">Follow</button>)}

              </div>
              <div className="flex">
              <p className="-mt-1 text-slate-600 text-[13px]">{createdAttLocalTime }</p>
              <p className="-mt-1 ml-2 text-slate-600 text-[13px]">{createdAtLocatDate }</p>
              </div>
            </div>
        </div>
        <div>
          <h1 className="font-semibold text-lg text-red-500 mt-1 text-justify">{item.title}</h1>
          <p className="text-gray-600 text-sm text-justify">{item.description.slice(0,250)}</p>
          <Image src={item.image} width={600} height={600} className="h-full w-full object-fill rounded"/>
        </div>
        <div className="flex mt-3">
          <div className="flex items-center">
            <p className="font-bold text-red-600 select-none">{item.likes.length}</p>
            {userData?.likes?.find(likeId=>likeId==item._id)?(<AiTwotoneLike onClick={()=>{
              handleLikeDislikes(item)
            }} className="ml-1 cursor-pointer" size={20} />):(<AiOutlineLike onClick={()=>{
              handleLike(item)
            }} className="ml-1 cursor-pointer" size={20}  />)}

          </div>
          <div className="flex items-center ml-4">
            <p className="font-bold text-red-600 select-none">{item.dislikes.length}</p>
            {userData?.dislikes?.find(likeId=>likeId==item._id)?(<BiSolidDislike  className="ml-1 cursor-pointer" size={20} />):(<BiDislike  className="ml-1 cursor-pointer" size={20}  />)}
          </div>
          <div className="flex items-center ml-4">
            <p className="font-bold text-red-600 select-none">{item.comment.length}</p>
            <BiComment className="ml-2 cursor-pointer" size={20} />
          </div>
          <div className="flex items-center ml-4">
            <p className="font-bold text-red-600 select-none">{item.share.length}</p>
            <BsShare className="ml-2 cursor-pointer" size={20}  />
          </div>
        </div>
          <hr className="mb-2 mt-2"/>
            </div>
          )
        })):(<h1>No posts to display</h1>)}
    </div>
  )
}

export default TotalPosts;