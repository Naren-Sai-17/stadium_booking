import { React, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import OffCanvasNavbar from '../components/OffCanvasNavbar'
import Card from '../components/Card'
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'

/*
    Available events:
        Cricket
        Football
        Baseball
        Rugby
        Badminton
        Basketball
*/

export default function Events() {
    let [events, setEvents] = useState([])
    let [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        axios.get(`/api/events`)
            .then(res => {
                // console.log(res.data)
                setAllEvents(res.data)
                setEvents(res.data)
            })
            .catch(err => {
                console.error("Error connecting to API: ", err)
            })
        
        document.title = "Upcoming Events - Sports League"
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className='bg-gradient-to-r from-slate-950 to-slate-700 '>
                <OffCanvasNavbar />
                <Navbar />

                <div 
                className='border-0 ml-[50%] flex mt-12'>
                    <input
                        name='query'
                        id='query'
                        onChange={(q) => { 
                            let temp_events = [];
                            allEvents.forEach((event) => {
                                const subquery = new RegExp(q.target.value, 'i')
                                if(subquery.test(event.event_name)) {
                                    temp_events.push(event);
                                } else if(subquery.test(event.stadium.stadium_name)) {
                                    temp_events.push(event);
                                } else if(subquery.test(event.event_description)) {
                                    temp_events.push(event);
                                }
                                setEvents(temp_events)

                            })
                            // console.log(temp_events)

                        }}
                        className='rounded-2xl bg-slate-50 h-12 pl-12 w-full mr-[25%]'
                        type='text'
                        placeholder='Search...'
                    />
                    <AiOutlineSearch className='absolute mt-1 ml-2 h-8 w-8' />
                </div>
                {/* <SearchBar /> */}

                <div className='mx-[10%] flex'>
                    <div className='border-0 text-white w-[25%] mt-12 text-center h-screen bg-orange-900 rounded-md'>
                        Search and Filter...
                    </div>

                    <div className='ml-6 mt-12 w-[70%]'>
                        <ul className='text-white grid grid-cols-3'>
                            {
                                events.map((event) => (
                                    <li key={event.event_id}>
                                        <Card 
                                            poster={event.event_name.split(' ')[0].toLowerCase()}
                                            event_id={event.event_id}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <style jsx="true">
                {
                    `
                        input:focus {
                            outline: none;
                            box-shadow: 0 0 0 5px rgba(251, 146, 60, 0.8);
                            transition: .3s;
                        }
                    `
                }
            </style>
        </>
    )
}
