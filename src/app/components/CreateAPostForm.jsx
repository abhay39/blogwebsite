"use client"
import Image from "next/image"
import user from '../../../public/a.png';
import {BsFillCameraVideoFill, BsFillImageFill} from 'react-icons/bs';
import { useContext, useRef, useState } from "react";
import LoadingAnimation from "./LoadingAnimation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenicationProvider } from "../authProvider";


const upload_preset="bloggers";
const cloud_name= 'dzox9x1uq';

const CreateAPostForm = ({imgURL}) => {
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [image,setImage]=useState("");

    const [isUploading,setIsUploading]=useState(false);

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const {userData}=useContext(AuthenicationProvider);

    const handleImageChange = async(e) => {
        setIsUploading(true)
        const file = e.target.files[0];
        setImage(file);
        const formsss=new FormData()
        formsss.append("file",file)
        formsss.append("upload_preset",upload_preset)
        formsss.append("cloud_name",cloud_name)
        const res=await fetch("https://api.cloudinary.com/v1_1/dzox9x1uq/image/upload",{
          method:"POST",
          body:formsss
        })
        
        const data=await res.json()
        if(data){
            setImage(data.secure_url);
            setIsUploading(false)
        }
      };

      const email=userData.email;

      const uploadPost = async () => {
        const res = await fetch("/api/addPost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: description,
            image: image,
            email: email,
            userProfilePic:userData?.profilePic,
            fullname:userData?.fullname
          }),
        });
      
        const status = res.status;
        let data = await res.json();
      
        if (status === 202) {
            setDescription("");
            setTitle("");
            setImage(null);
            toast.success(data.message);
          setTimeout(() => {
            window.location.href = "/";
          },2000);
        } else {
            setDescription("");
            setTitle("");
            setImage(null);
            toast.error(data.message);
        }
      };
      

  return (
    <div className="flex flex-col mt-6 w-full">
       <div className="flex">
            <Image src={imgURL} alt="profile image" height={50} width={50} className="rounded-full w-10 h-10 object-cover"/>

            <div className="flex flex-col ml-4 w-full">
            <input onChange={(e)=>setTitle(e.target.value)} name="title" className="sm:w-full w-full p-3 bg-slate-200 rounded border-none outline-none mb-2" placeholder="Enter title"/>
            <textarea onChange={(e)=>setDescription(e.target.value)} name="description" rows={10} 
                placeholder="Whats on your mind?"
                className="sm:w-full w-full p-3 bg-slate-200 rounded border-none outline-none"
            /> 
            </div>
       </div>
       <ToastContainer />

       <div className="ml-14 mt-3 flex items-center justify-between">
        <div onClick={handleButtonClick} className="bg-blue-100 p-2 rounded-full cursor-pointer">
            <BsFillImageFill size={20} color="orange"/>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />

        </div>
        
        {isUploading?(<LoadingAnimation />):(<button className="bg-red-300 p-2 rounded-xl text-xl text-white w-28" onClick={uploadPost}>
            Post
        </button>)}
       </div>
       <hr className="mt-3"/>
    </div>
  )
}

export default CreateAPostForm