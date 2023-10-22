import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    useEffect(() => {
        const handleScroll = () => {
            const containersOdd = document.querySelectorAll('.imcontainer-odd');
            const containersEven = document.querySelectorAll('.imcontainer-even');
            const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
            const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
            const ratio = windowWidth / windowHeight;

            containersOdd.forEach((container) => {
                const distance = container.offsetTop;
                container.style.transform = `translateX(${((window.scrollY >= distance - 0.75 * windowHeight && window.scrollY < distance) * (window.scrollY - distance + 0.75 * windowHeight) * 0.66 + (window.scrollY >= distance) * (0.5 * windowHeight)) * ratio - 10}px)`;
            });

            containersEven.forEach((container) => {
                const distance = container.offsetTop;
                container.style.transform = `translateX(-${((window.scrollY >= distance - 0.75 * windowHeight && window.scrollY < distance) * (window.scrollY - distance + 0.75 * windowHeight) * 0.66 + (window.scrollY >= distance) * (0.5 * windowHeight)) * ratio - 10}px)`;
            });
        };

        document.addEventListener('DOMContentLoaded', handleScroll);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className='overflow-x-hidden w-full bg-gradient-to-r from-slate-950 to-slate-800'>
                    <div className="flex h-screen">
                    <div className="w-1/3 bg-gradient-to-b from-blue-800 to-blue-400 py-8 text-center">
                        <div className="mt-10">
                            <img src="images/img6.png" alt="" />
                            <h1 className="text-2xl font-semibold">Book your tickets now</h1>
                        </div>
                        <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded-full mt-36">
                            <Link to='/login'>
                                Get Started
                            </Link>
                        </button>
                    </div>
                    <div className="w-auto">
                        <img src="images/img5.jpg" alt="Your Image" className="w-full h-full " />
                    </div>
            </div>

            <div className="h-screen flex justify-end">
                <div className="w-1/2 imcontainer-odd overflow-clip h-full flex flex-col justify-center items-center">
                    <img src="images/booking.svg" className="img w-3/4" alt="" />
                </div>
                <div className="textbox w-1/2 flex items-center justify-center text-orange-400 font-semibold text-3xl">
                    Booking within seconds
                </div>
            </div>
            <div className="h-screen flex">
                <div className="w-1/2 imcontainer-even h-full flex flex-col justify-center items-center">
                    <img src="images/food.svg" className="img w-3/4" alt="" />
                </div>
                <div className="textbox w-1/2 flex items-center justify-center text-orange-400 font-semibold text-3xl">
                    Pre-book treats! 
                </div>
            </div>
            <div className="h-screen flex justify-end">
                <div className="w-1/2 imcontainer-odd overflow-clip h-full flex flex-col justify-center items-center">
                    <img src="images/city.svg" className="img w-3/4" alt="" />
                </div>
                <div className="textbox w-1/2 flex items-center justify-center text-orange-400 font-semibold text-3xl">
                    Support in all major cities
                </div>
            </div>
            <div className="h-screen flex">
                <div className="w-1/2 imcontainer-even h-full flex flex-col justify-center items-center">
                    <img src="images/cancel.svg" className="img w-3/4" alt="" />
                </div>
                <div className="textbox w-1/2 flex items-center justify-center text-orange-400 font-semibold text-3xl">
                    Hassle free cancellation
                </div>
            </div>

            <div className="flex justify-center pt-10">
                <a href="#top">
                    <img className="h-16 bg-white border hover:bg-orange-500 rounded-full hover:scale-110" src="images/arrow.svg" alt="" />
                </a>
                </div>

            <div className=" text-gray-500 h-1/4 pt-10 text-center">
                Contact us <br />
                0 | 0 | 0 | 0
            </div>

            </div>

                <style jsx>
                    {
                        `
                        .main {
                            background-image: url("images/img5.jpg");
                            background-size: cover; 
                        }
                        
                        .imcontainer-odd {
                            position: absolute;
                            left: -50%;
                        }
                        
                        .imcontainer-even {
                            position: absolute;
                            right: -50%;
                        }
                        
                        .primary-color {
                            background-image: linear-gradient(to left, rgba(1,166,255,0.9),rgba(133, 212, 255, 0.9));
                        }
                        
                        .img
                        {
                            box-shadow: 0 0 50px 15px ;
                        }
                        
                        html {
                            scroll-behavior: smooth;
                        }
                        `
                    }
                </style>
        </>
    )
}
