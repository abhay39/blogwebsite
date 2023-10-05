
import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import Auth from './authProvider'
import { useContext } from 'react'
import AuthProvider from './components/Authenications'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bloggers',
  description: 'Create a blog and subscribe to events',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="p-6">
        <Auth>
          {children}
        </Auth>
      </body>
    </html>
  )
}
