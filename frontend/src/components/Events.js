import { React, useState, useEffect } from 'react'
import Navbar from './Navbar'
import OffCanvasNavbar from './OffCanvasNavbar'
import Card from './Card'
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'

/*
    Available events:
        Cricket
        Football
        Wrestling
        Badminton
        Basketball
*/

export default function Events() {
    let [events, setEvents] = useState([])
    let [query, setQuery] = useState('')
    
    function handleSearch() {
        // const query = document.getElementById('search').value
        const encoded_query = encodeURIComponent(query)
        const API_URL = 'http://localhost:8000/api/events/'
        const search_url = `${API_URL}?search=${encoded_query}`

        axios.get(search_url)
            .then(response => {
                setEvents(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    useEffect(() => {
        handleSearch();
    })

    return (
        <>
            <div className='bg-gradient-to-r from-slate-950 to-slate-700 '>
                <OffCanvasNavbar />
                <Navbar />

                <form onSubmit={handleSearch()} className='border-0 ml-[50%] flex mt-12'>
                    <input 
                        name='search' 
                        id='search' 
                        onChange={(q) => {setQuery(q.target.value)}}
                        className='rounded-2xl bg-slate-50 h-12 pl-12 w-full mr-[25%]' 
                        type='text' 
                        placeholder='Search...' 
                    />
                    <AiOutlineSearch className='absolute mt-1 ml-2 h-8 w-8' />
                </form>

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
                        { events }
                    </div>
                </div>
            </div>

            <style jsx>
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
