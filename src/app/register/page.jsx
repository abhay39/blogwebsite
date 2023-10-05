"use client";
import Image from "next/image";
import logo from "../../../public/logo.jpg";
import Link from "next/link";
import { useState } from "react";
import LoadingAnimation from "../components/LoadingAnimation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const upload_preset="bloggers";
const cloud_name= 'dzox9x1uq';


const Register = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname:"",
    email:"",
    profilePic:"",
    gender:""
  });

  const [image, setImage] = useState(null);
  const [activeBtn,setActiveBtn] = useState(false);


  const handleImageChange = async(e) => {
    setActiveBtn(true)
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
      setActiveBtn(false)
      setFormData({
      ...formData,
        profilePic:data.secure_url
      })
    }
  };


  const handleform = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const authSignup = async () => {
    const res = await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    const status = res.status;
    const data = await res.json();
    if (status === 200) {
      setFormData({
        username: "",
        password: "",
        fullname:"",
        email:"",
        image:"",
        gender:""
      });
      setTimeout(()=>{
        toast.success(data.message);
        window.location.href = "/login";
      })
    }else{
      setFormData({
        username: "",
        password: "",
        fullname:"",
        email:"",
        image:"",
        gender:""
      });
      toast.error(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:h-[92vh] sm:w-full">
      <Image
        src={logo}
        alt="website logo"
        height={50}
        width={300}
        className="h-36 w-68 object-fill cursor-pointer"
      />
      <ToastContainer />
      <div className="flex md:w-full items-center justify-center sm:mt-5">
        <div className="bg-slate-200 p-6 rounded  flex flex-col items-center">
          <h1 className="text-[35px] font-bold text-orange-500">
            Create an account
          </h1>
          <div className="sm:flex sm:flex-col md:flex md:flex-row justify-between">
            <div className="mt-2">
              <label className="text-xl ml-2" htmlFor="username">
                Full Name
              </label>
              <br />
              <input
                onChange={handleform}
                type="text"
                name="fullname"
                id="username"
                placeholder="Enter your Full Name"
                className="p-3 text-base rounded-lg w-72 mt-2 border-red-200 outline-orange-400"
              />
            </div>
            <div className="mt-2 md:ml-3">
              <label className="text-xl ml-2" htmlFor="username">
                Username
              </label>
              <br />
              <input
                onChange={handleform}
                type="text"
                name="username"
                id="username"
                placeholder="Enter your Username"
                className="p-3 text-base rounded-lg w-72 mt-2 border-red-200 outline-orange-400"
              />
            </div>
          </div>

          <div  className="sm:flex sm:flex-col md:flex md:flex-row justify-between">
            <div className="mt-2">
              <label className="text-xl ml-2" htmlFor="username">
                Email Id
              </label>
              <br />
              <input
                onChange={handleform}
                type="email"
                name="email"
                id="username"
                placeholder="Enter your Email Id"
                className="p-3 text-base rounded-lg w-72 mt-2 border-red-200 outline-orange-400"
              />
            </div>

            <div className="mt-2 md:ml-3">
              <label className="text-xl ml-2" htmlFor="password">
                Password
              </label>
              <br />
              <input
                onChange={handleform}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your Password"
                className="p-3 text-base rounded-lg w-72 mt-2 border-red-200 outline-orange-400"
              />
            </div>
          </div>

          <div  className="sm:flex sm:flex-col md:flex md:flex-row justify-between">
            <div className="mt-2">
            <label className="text-xl ml-2" htmlFor="password">
                Gender
              </label>
              <br />
              <input
                onChange={handleform}
                type="text"
                name="gender"
                placeholder="Enter your Gender"
                className="p-3 text-base rounded-lg w-72 mt-2 border-red-200 outline-orange-400"
              />
            </div>

            <div className="mt-2 md:ml-3">
              <label className="text-xl ml-2" htmlFor="password">
                Profile Pic
              </label>
              <br />
              <input
                onChange={handleImageChange}
                type="file"
                accept="image/*"
                name="profilePic"
                required
                id="password"
                placeholder="Enter your Password"
                className="p-3 text-base rounded-lg w-72 mt-2 border-red-200 outline-orange-400"
              />
            </div>
          </div>

          <div >
            {activeBtn?(<LoadingAnimation />):(<button onClick={authSignup} disabled={activeBtn} className={`${activeBtn? 'bg-gray-300': 'bg-orange-400'} p-3 w-72 mt-3 cursor-pointer text-white text-xl font-semibold rounded-md`}>
              Sign up
            </button>)}
          </div>
          <div className="mt-2 flex">
            <p>Already have an account?</p>
            <Link
              href="/login"
              className="cursor-pointer underline ml-1 text-red-500"
            >
             login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
