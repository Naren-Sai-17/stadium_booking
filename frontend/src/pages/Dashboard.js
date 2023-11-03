import React, { useState, useEffect, useContext } from 'react';
import '../index.css';
import axios from 'axios'
import Navbar from '../components/Navbar';
import OffCanvasNavbar from '../components/OffCanvasNavbar';
import Card from '../components/Card';
import CarouselControlsInside from '../components/Carousel2';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md'

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

        document.title = "Dashboard - Sports League"
        window.scrollTo(0, 0)
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

                <div className='border-0 mt-[10%] md:mt-[5%] flex'>
                    <div className='leftbtn flex flex-row justify-center border-0 ml-[2%]'>
                        <button id='cricket-left' title='Previous' onClick={ () => {
                            const menu = document.getElementById('cricket')
                            const leftbtn = document.getElementById('cricket-left')
                            const rightbtn = document.getElementById('cricket-right')

                            menu.scrollLeft = 0;
                            leftbtn.classList.add('opacity-0'); leftbtn.classList.remove('opacity-100');
                            rightbtn.classList.add('opacity-100'); rightbtn.classList.remove('opacity-0');

                        } }  className={ `text-white hover:text-orange-600 my-auto opacity-0` }>
                            <MdArrowBackIos className='h-[10vh] w-[4vw]' />
                        </button>
                    </div>
                    <div id='cricket' className='border-0 overflow-x-auto whitespace-nowrap scroll-smooth md:mx-[5%] snap-x snap-mandatory Snap'>
                        {
                            allEvents.filter((event) => {
                                return event.event_name.split(' ')[0].toLowerCase() === 'cricket'
                            })
                            .slice(0, 8)
                            .map((event, index) => (
                                <div className='inline-block snap-center w-[25%]' key={index}>
                                    <Card 
                                        event_id={event.event_id} 
                                        poster='cricket' 
                                    />
                                    <span className='text-white text-xs md:text-sm lg:text-md whitespace-break-spaces flex justify-center'>
                                        { 
                                            event.event_name.split(' ').slice(1).join(' ')
                                        }
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                    <div className='rightbtn flex flex-row justify-center mr-[2%]'>
                        <button id='cricket-right' title='Next' onClick={ () => {
                            const menu = document.getElementById('cricket')
                            const leftbtn = document.getElementById('cricket-left')
                            const rightbtn = document.getElementById('cricket-right')

                            menu.scrollLeft = menu.scrollWidth - menu.clientWidth;
                            leftbtn.classList.add('opacity-100'); leftbtn.classList.remove('opacity-0');
                            rightbtn.classList.add('opacity-0'); rightbtn.classList.remove('opacity-100');

                        } } className={ `text-white hover:text-orange-600 my-auto` }>
                            <MdArrowForwardIos className='h-[10vh] w-[4vw]' />
                        </button>
                    </div>
                </div>

                <div className='border-0 text-white md:text-3xl text-xl font-weight mt-[5%] md:mt-[8%] mx-[10%]'>
                    Discover Football Events
                </div>

                <div className='border-0 mt-[10%] md:mt-[5%] flex'>
                    <div className='leftbtn flex flex-row justify-center border-0 ml-[2%]'>
                        <button id='football-left' title='Previous' onClick={ () => {
                            const menu = document.getElementById('football')
                            const leftbtn = document.getElementById('football-left')
                            const rightbtn = document.getElementById('football-right')

                            menu.scrollLeft = 0;
                            leftbtn.classList.add('opacity-0'); leftbtn.classList.remove('opacity-100');
                            rightbtn.classList.add('opacity-100'); rightbtn.classList.remove('opacity-0');

                        } }  className={ `text-white hover:text-orange-600 my-auto opacity-0` }>
                            <MdArrowBackIos className='h-[10vh] w-[4vw]' />
                        </button>
                    </div>
                    <div id='football' className='border-0 overflow-x-auto whitespace-nowrap scroll-smooth md:mx-[5%] snap-x snap-mandatory Snap'>
                        {
                            allEvents.filter((event) => {
                                return event.event_name.split(' ')[0].toLowerCase() === 'football'
                            })
                            .slice(0, 8)
                            .map((event, index) => (
                                <div className='inline-block snap-center w-[25%]' key={index}>
                                    <Card event_id={event.event_id} poster='football' />
                                    <div className='text-white text-xs md:text-sm lg:text-md whitespace-break-spaces text-center'>
                                        { 
                                            event.event_name.split(' ').slice(1).join(' ')
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='rightbtn flex flex-row justify-center mr-[2%]'>
                        <button id='football-right' title='Next' onClick={ () => {
                            const menu = document.getElementById('football')
                            const leftbtn = document.getElementById('football-left')
                            const rightbtn = document.getElementById('football-right')

                            menu.scrollLeft = menu.scrollWidth - menu.clientWidth;
                            leftbtn.classList.add('opacity-100'); leftbtn.classList.remove('opacity-0');
                            rightbtn.classList.add('opacity-0'); rightbtn.classList.remove('opacity-100');

                        } } className={ `text-white hover:text-orange-600 my-auto` }>
                            <MdArrowForwardIos className='h-[10vh] w-[4vw]' />
                        </button>
                    </div>
                </div>

                <div className='border-0 text-white md:text-3xl text-xl font-weight mt-[5%] md:mt-[8%] mx-[10%]'>
                    Discover Basketball Events
                </div>

                <div className='border-0 pb-[15%] mt-[10%] md:mt-[5%] flex'>
                    <div className='leftbtn flex flex-row justify-center border-0 ml-[2%]'>
                        <button id='basketball-left' title='Previous' onClick={ () => {
                            const menu = document.getElementById('basketball')
                            const leftbtn = document.getElementById('basketball-left')
                            const rightbtn = document.getElementById('basketball-right')

                            menu.scrollLeft = 0;
                            leftbtn.classList.add('opacity-0'); leftbtn.classList.remove('opacity-100');
                            rightbtn.classList.add('opacity-100'); rightbtn.classList.remove('opacity-0');

                        } }  className={ `text-white hover:text-orange-600 my-auto opacity-0` }>
                            <MdArrowBackIos className='h-[10vh] w-[4vw]' />
                        </button>
                    </div>
                    <div id='basketball' className='border-0 overflow-x-auto whitespace-nowrap scroll-smooth md:mx-[5%] snap-x snap-mandatory Snap'>
                        {
                            allEvents.filter((event) => {
                                return event.event_name.split(' ')[0].toLowerCase() === 'basketball'
                            })
                            .slice(0, 8)
                            .map((event, index) => (
                                <div className='inline-block snap-center w-[25%]' key={index}>
                                    <Card event_id={event.event_id} poster='basketball' />
                                    <div className='text-white text-xs md:text-sm lg:text-md whitespace-break-spaces text-center'>
                                        { 
                                            event.event_name.split(' ').slice(1).join(' ')
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='rightbtn flex flex-row justify-center mr-[2%]'>
                        <button id='basketball-right' title='Next' onClick={ () => {
                            const menu = document.getElementById('basketball')
                            const leftbtn = document.getElementById('basketball-left')
                            const rightbtn = document.getElementById('basketball-right')

                            menu.scrollLeft = menu.scrollWidth - menu.clientWidth;
                            leftbtn.classList.add('opacity-100'); leftbtn.classList.remove('opacity-0');
                            rightbtn.classList.add('opacity-0'); rightbtn.classList.remove('opacity-100');

                        } } className={ `text-white hover:text-orange-600 my-auto` }>
                            <MdArrowForwardIos className='h-[10vh] w-[4vw]' />
                        </button>
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

                        .Snap::-webkit-scrollbar {
                            width: 0.1rem;
                        }

                        .Snap::-webkit-scrollbar-thumb {
                            background-color: transparent;
                        }

                        .Snap {
                            scrollbar-width: none;
                        }

                        @media screen and (max-width: 768px)
                        .leftbtn {
                            display: none;
                        }

                        @media screen and (max-width: 768px)
                        .rightbtn {
                            display: none;
                        }
                    `
                }
            </style>
        </>
    );
}