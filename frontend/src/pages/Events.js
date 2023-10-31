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
    let [query, setQuery] = useState('')

    useEffect(() => {
        axios.get(`/api/events`)
            .then(res => {
                // console.log(res.data)
                setEvents(res.data)
            })
            .catch(error => {
                console.error("Error connecting to API: ", error)
            })
        
        document.title = "Upcoming Events - Sports League"
        window.scrollTo(0, 0)
    }, [])

    const handleSearch = (form) => {
        console.log("Made a GET request.")
        form.preventDefault();

        axios.get(`/api/events?query=${query}`)
            .then(res => {
                // console.log(res.data)
                setEvents(res.data)
            })
            .catch(error => {
                console.error("Error connecting to API: ", error)
            })
    };

    return (
        <>
            <div className='bg-gradient-to-r from-slate-950 to-slate-700 '>
                <OffCanvasNavbar />
                <Navbar />

                <form onChange={handleSearch} className='border-0 ml-[50%] flex mt-12'>
                    <input
                        name='query'
                        id='query'
                        onChange={(q) => { setQuery(q.target.value); console.log("Changed query.") }}
                        className='rounded-2xl bg-slate-50 h-12 pl-12 w-full mr-[25%]'
                        type='text'
                        placeholder='Search...'
                    />
                    <AiOutlineSearch className='absolute mt-1 ml-2 h-8 w-8' />
                </form>
                {/* <SearchBar /> */}

                <div className='mx-[10%] flex'>
                    <div className='border-0 text-white w-[25%] mt-12 text-center h-screen bg-orange-900 rounded-md'>
                        Search and Filter...
                    </div>

                    <div className='ml-6 mt-12 grid grid-cols-3 w-[70%]'>
                        {/* <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card /> */}
                        {/* {events.map((event, index) => (
                            <h3 key={ index } className=' text-white'>
                                { event.description }
                            </h3>
                        ))} */}
                        <ul className='text-white'>
                            {events.map((event) => (
                                <li key={event.event_id}>{event.event_name}</li>
                            ))}
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
