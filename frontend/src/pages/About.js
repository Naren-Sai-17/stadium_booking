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
         
            <div className="min-h-screen bg-slate-900 ">
            <OffCanvasNavbar />           
            <Navbar />
            <div className="font-mono">

<div className="about-section text-white">
    <h1 className="text-4xl">Sports League</h1>
    <p className="text-lg">Our site Sports League provides an optimal way to secure tickets for a diverse range of events,</p>
    <p className="text-lg">including cricket, basketball, badminton, and football.</p>
</div>

<h2 className="text-4xl text-center my-8">Our Team</h2>

<div className="flex text-white flex-wrap">
    <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 ">
        <div className="card">
            <img src="/images/profile/Naren.jpg" alt="Jane" className=" w-full"/>
            <div className="p-4 text-white">
                <h2 className="text-xl text-white font-bold">Naren Sai</h2>
                <p className="text-sm text-gray-400">https://github.com/Naren-Sai-17</p>
                <p className="text-sm font-sans">cse220001049@iiti.ac.in</p>
                {/* <button className="bg-black text-white py-2 px-4 rounded-full mt-4 hover:bg-gray-800">Contact</button> */}
            </div>
        </div>
    </div>

    <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
        <div className="card">
            <img src="/images/profile/PC.jpg" alt="Mike" className="w-full"/>
            <div className="p-4">
                <h2 className="text-xl font-bold">P C Uma Mahesh</h2>
                <p className="text-sm text-gray-400">https://github.com/Hi-TechMissile</p>
                <p className="text-sm font-sans">cse220001052@iiti.ac.in</p>
                {/* <button className="bg-black text-white py-2 px-4 rounded-full mt-4 hover:bg-gray-800">Contact</button> */}
            </div>
        </div>
    </div>

    <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
        <div className="card">
            <img src="/images/profile/Ruthvik.jpg" alt="John" className="w-full"/>
            <div className="p-4">
                <h2 className="text-xl font-bold">Ruthvik</h2>
                <p className="text-sm text-gray-400">https://github.com/Ruthvik283</p>
                <p className="text-sm font-sans">cse220001064@iiti.ac.in</p>
                {/* <button className="bg-black text-white py-2 px-4 rounded-full mt-4 hover:bg-gray-800">Contact</button> */}
            </div>
        </div>
    </div>

    <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
        <div className="card">
            <img src="/images/profile/Neerupam.jpg" alt="Fourth Member" className="w-full"/>
            <div className="p-4">
                <h2 className="text-xl font-bold">Neerupam</h2>
                <p className="text-sm text-gray-400">https://github.com/Neerupam2772</p>
                <p className="text-sm font-sans">cse220001050@iiti.ac.in</p>
                {/* <button className="bg-black text-white py-2 px-4 rounded-full mt-4 hover:bg-gray-800">Contact</button> */}
            </div>
        </div>
    </div>
</div>

</div>
            <div className=' w-[100%] bottom-0'><Footer2></Footer2></div>
            </div>


            <style jsx="true">
            {`
            .about-section {
                padding: 50px;
                text-align: center;
                background-color: #474e5d;
                color: white;
            }

            .card {
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                margin: 8px;
            }

            .title {
                color: grey;
            }
        `}
        </style>
            

            
        </>
    )
}
