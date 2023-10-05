"use client"
import { useContext, useEffect, useState } from "react"
import CreateAPostForm from "../components/CreateAPostForm"
import TotalPosts from "../components/TotalPosts"
import { AuthenicationProvider } from "../authProvider"


const page = () => {

  const [status,setStatus]=useState(false);
  const [id, setGetId]=useState(null);
  const {userData,setUserData}=useContext(AuthenicationProvider);


  const getUserData =async (id)=>{
    const res=await fetch(`/api/login/${id}`);
    const data=await res.json();
    setUserData(data.data);
  }

  useEffect(()=>{
    const isAuth=localStorage.getItem('userState');
    const isToken=localStorage.getItem('token');
    if(isAuth){
        setStatus(isAuth);
        setGetId(isToken);
    }
    if(isToken){
      getUserData(isToken);
    }
  },[])


  return (
    <div className="mt-3 md:flex">
      <div>
        {status?(
          <>
          <h1 className="text-3xl font-bold">Create a post </h1>
          <CreateAPostForm imgURL={userData?.profilePic}/>
          </>
        ):("")}
        <TotalPosts />
      </div>
      <div className="w-52">
        <h1>okey</h1>
      </div>
    </div>
  )
}

export default page