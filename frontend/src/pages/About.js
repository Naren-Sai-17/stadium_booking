import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import OffCanvasNavbar from '../components/OffCanvasNavbar'
import Footer2  from '../components/Footer'

export default function About() {
    useEffect(() => {
        document.title = "About Us - Sports League"
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className="min-h-screen">
            <OffCanvasNavbar />           
            <Navbar />
                About text.
            <div className='fixed w-[100%] bottom-0'><Footer2></Footer2></div>
            </div>
            

            
        </>
    )
}
