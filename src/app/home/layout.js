"use client"
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useContext, useEffect } from 'react'
import { AuthenicationProvider } from '../authProvider'
import logo from '../../../public/logo.jpg';
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
    const router=useRouter();
    const {userState,setUserState}=useContext(AuthenicationProvider);

    useEffect(()=>{
        const isAuth=localStorage.getItem('userState');
        if(isAuth){
            setUserState(isAuth);
        }
    },[])

    const handleSignOut=()=>{
        localStorage.clear();
        setUserState(false);
        router.push("/login");
    }

  return (
    <html lang="en">
      <body className="p-6">
        
    <header className='flex justify-between items-center'>
        <Image src={logo} alt='website logo' height={50} width={300} className='h-12 w-28 object-fill cursor-pointer'/>
        <nav className='md:flex '>
            <ul className='flex'>
            <li>
                <Link href="/home">Home</Link>
            </li>
            {userState?(<li>
                <Link href="/profile">My Profile</Link>
            </li>):("")}
            <li>
                <Link href="/about">About</Link>
            </li>
            <li>
                <Link href="/contact">Contact</Link>
            </li>
            </ul>
        </nav>
        {userState?(<button onClick={handleSignOut} className='bg-gray-300 p-3 rounded'>
            Sign Out
        </button>):(<button onClick={()=>router.push("/login")} className='bg-gray-300 p-3 rounded'>
            Sign In
        </button>)}
    </header>
    <hr className='mt-2'/>
        {children}
        
      </body>
    </html>
  )
}
