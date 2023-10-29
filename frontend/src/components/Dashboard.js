import React, { useState, useEffect } from 'react';
import '../index.css';
import axios from 'axios'
import Navbar from './Navbar';
import OffCanvasNavbar from './OffCanvasNavbar';
import Carousel from './Carousel';
import Card from './Card';
import CarouselControlsInside from './Carousel2';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'

export default function Dashboard() {
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        // console.log("On url: ", window.location.href)
        axios.get('api/events')
        .then(res => {
            setAllEvents(res.data)
        })
        .catch(err => {
            console.error("Error connecting to API: ", err)
        })
    }, [])

    return (
        <>
            <div className='bg-gradient-to-r from-slate-950 to-slate-700'>
                <OffCanvasNavbar />
                <Navbar />
                <div className='border-0 mt-[20%] md:mt-[5%]'>
                    <CarouselControlsInside />
                </div>

                <div className='border-0 text-white md:text-3xl text-xl font-weight md:mt-[5%] mt-[20%] mx-[10%]'>
                    Discover Cricket Events
                </div>
                
                <div className='border-0 mt-[20%] md:mt-[5%]'>
                    {/* <CarouselControlsInside /> */}
                    <div className='border-0 overflow-x-auto whitespace-nowrap mx-[10%] snap-x snap-mandatory'>
                        { 
                            allEvents.filter((event) => { 
                                return event.event_name.split(' ')[0].toLowerCase() === 'cricket' 
                            })
                            .slice(0, 8).map((event, index) => (
                                <div className='inline-block snap-center w-[25%]' key = { index }>
                                    <Card event_id={ event.event_id } poster='cricket'/>
                                    <div className='text-white text-center'>
                                        { event.event_name }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <div className='border-0 text-white md:text-3xl text-xl font-weight md:mt-[5%] mt-[20%] mx-[10%]'>
                    Discover Football Events
                </div>

                <div className='border-0 mt-[20%] md:mt-[5%]'>
                    {/* <CarouselControlsInside /> */}
                    <div className='border-0 overflow-x-auto whitespace-nowrap mx-[10%] snap-x snap-mandatory'>
                        { 
                            allEvents.filter((event) => { 
                                return event.event_name.split(' ')[0].toLowerCase() === 'football' 
                            })
                            .slice(0, 8).map((event, index) => (
                                <div className='inline-block snap-center w-[25%]' key = { index }>
                                    <Card event_id={ event.event_id } poster='football'/>
                                    <div className='text-white text-center'>
                                        { event.event_name }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='border-0 text-white md:text-3xl text-xl font-weight md:mt-[5%] mt-[20%] mx-[10%]'>
                    Discover Basketball Events
                </div>

                <div className='border-0 mt-[20%] md:mt-[5%]'>
                    {/* <CarouselControlsInside /> */}
                    <div className='border-0 overflow-x-auto whitespace-nowrap mx-[10%] snap-x snap-mandatory'>
                        { 
                            allEvents.filter((event) => { 
                                return event.event_name.split(' ')[0].toLowerCase() === 'basketball' 
                            })
                            .slice(0, 8).map((event, index) => (
                                <div className='inline-block snap-center w-[25%]' key = { index }>
                                    <Card event_id={ event.event_id } poster='basketball'/>
                                    <div className='text-white text-center'>
                                        { event.event_name }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <style jsx="true">
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