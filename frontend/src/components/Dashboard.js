import React from 'react';
import '../index.css';
import Navbar from './Navbar';
import OffCanvasNavbar from './OffCanvasNavbar';
import Carousel from './Carousel';
import Card from './Card';
import CarouselControlsInside from './Carousel2';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'

export default function Dashboard() {
    let slides=[
        "https://www.bdp.com/globalassets/projects/regina-stadium/regina-stadium-01.jpg",
        "https://www.bdp.com/globalassets/projects/regina-stadium/regina-stadium-02.jpg",
        "https://static2.bigstockphoto.com/7/3/1/large1500/137382737.jpg",
        "https://www.bdp.com/globalassets/projects/education-city-stadium/education-city_th.jpg",
        "https://www.researchgate.net/publication/307527752/figure/fig1/AS:401336827957248@1472697564127/Hazza-Bin-Zayed-Stadium-Al-Ain-UAE.png",
    ]
    return (
        <>
            <div className='bg-gradient-to-r from-slate-950 to-slate-700'>
                <OffCanvasNavbar />
                <Navbar />
                <div className='ml-20  mr-20 border-0 mt-20'>
                    <CarouselControlsInside />
                </div>

                <div className='border-0 text-white text-3xl font-weight mt-32 mx-[10%]'>Discover Cricket Events</div>
                
                <div className=' mt-16 md:w-[60%] flex justify-center m-auto border-0 border-0-black border-0-5'>
                    <Carousel className = 'w-full' slides = { slides } />
                </div> 
                
                <div className='border-0 text-white text-3xl font-weight mt-32 mx-[10%]'>Discover Football Events</div>
                <div className='flex justify-center border-0 mt-20'>
                    <BsFillArrowLeftCircleFill className='switch m-auto h-10 ml-[5%]'/>
                    <div className='grid grid-cols-3 gap-10 mx-[10%] border-0'>
                        <Card />
                        <Card />
                        <Card />
                    </div>
                    <BsFillArrowRightCircleFill className='switch m-auto h-10 mr-[5%]'/>
                </div>

                <div className='border-0 text-white text-3xl font-weight mt-32 mx-[10%]'>Discover Basketball Events</div>
                <div className='flex justify-center border-0 mt-20'>
                    <BsFillArrowLeftCircleFill className='switch m-auto h-10 ml-[5%]'/>
                    <div className='grid grid-cols-3 gap-10 mx-[10%] border-0'>
                        <Card />
                        <Card />
                        <Card />
                    </div>
                    <BsFillArrowRightCircleFill className='switch m-auto h-10 mr-[5%]'/>
                </div>
            </div>

            <style jsx>
                {
                    `
                        .switch {
                            color: rgb(255, 115, 0);
                            width: 80px;
                        }
                    `
                }
            </style>
        </>
    );
}