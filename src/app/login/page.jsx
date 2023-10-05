"use client"
import Image from 'next/image';
import logo from '../../../public/logo.jpg';
import Link from 'next/link';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [formData,setFormData]=useState({
        username:'',
        password:''
    })
    const [activeBtn, setActiveBtn] = useState(false);

    const handleform=(e)=>{
        setFormData({
          ...formData,
            [e.target.name]:e.target.value
        })
       
    }


    const authLogin=async()=>{
        const res= await fetch("/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        const status=res.status;
        const data=await res.json();
        if(status===200){
            toast.success(data.message);
            localStorage.setItem('token',data.token);
            localStorage.setItem('userState','authenticated');
            setTimeout(()=>{
                window.location.href="/"
            },2000)

        }else{
            toast.error(data.message);
        }
    }

  return (
    <div className="flex flex-col items-center justify-center h-[92vh] sm:h-full">
        <Image src={logo} alt='website logo' height={50} width={300} className='h-36 w-68 object-fill cursor-pointer'/>
        <div className="flex md:w-full items-center justify-center sm:mt-5">
            <div className="bg-slate-200 p-6 rounded  flex flex-col items-center">
                    <h1 className="text-[35px] font-bold text-orange-500">Login</h1>
                    
                    <div className="mt-2">
                        <label className="text-xl ml-2" htmlFor="username">
                            Username
                        </label>
                        <br/>
                        <input onChange={handleform} type="text" name="username" id="username" placeholder="Enter your Username"  className="p-3 text-base rounded-lg w-80 mt-2 border-red-200 outline-orange-400"/>
                    </div>
                    
                    <div className="mt-2">
                        <label className="text-xl ml-2" htmlFor="password">
                            Password
                        </label>
                        <br/>
                        <input onChange={handleform} type="password" name="password" id="password" placeholder="Enter your Password"  className="p-3 text-base rounded-lg w-80 mt-2 border-red-200 outline-orange-400"/>
                    </div>
                    <ToastContainer />
                    <div>
                        <button onClick={authLogin} className={`${activeBtn?('bg-gray-500'):('bg-orange-400')} p-3 w-80 mt-3 cursor-pointer text-white text-xl font-semibold rounded-md`}>Login</button>
                    </div>
                    <div className="mt-2 flex">
                        <p>
                            Don't have an account? 
                        </p>
                        <Link href="/register" className="cursor-pointer underline ml-1 text-red-500">
                             Sign Up
                        </Link>

                    </div>
            </div>
        </div>
    </div>
  )
}

export default Login
