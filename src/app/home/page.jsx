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
      <div className="w-[300px] p-3">
        <h1 className="text-xl font-bold mt-5 text-red-500">Your total Followers</h1>
        {userData?.following?.length>0?(userData.following?.map((item)=>(
          <div>
            <h1>{item.fullname}</h1>
            <hr />
          </div>
        ))):(<h1 className="text-gray-600 mb-2">No one is following you yet..</h1>)}
        <hr />
        <h1 className="text-xl font-bold mt-5 text-red-500">People Your Follow</h1>
        {userData?.follow?.length>0?(userData.follow?.map((item)=>(
          <div>
            <h1>{item.fullname}</h1>
          </div>
        ))):(<h1 className="text-gray-600 mb-2">You are following no one yet..</h1>)}
        <hr />
      </div>
    </div>
  )
}

export default page