import { React, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import OffCanvasNavbar from '../components/OffCanvasNavbar'
import Card from '../components/Card'
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'
import Footer2  from '../components/Footer'

/*
    Available events:
        Cricket
        Football
        Badminton
        Basketball
*/

export default function Events() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCostRange, setSelectedCostRange] = useState('');
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        axios.get(`/api/search/`)
            .then(res => {
                // console.log(res.data)
                setAllEvents(res.data)
            })
            .catch(err => {
                console.error("Error connecting to API: ", err)
            })

        document.title = "Upcoming Events - Sports League"
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const regex = new RegExp(searchQuery, 'i');
        const filtered = allEvents.filter((event) => {
            const nameMatch = regex.test(event.event_name) || regex.test(event.stadium.city) || regex.test(event.stadium.stadium_name);
            const priceMatch = (selectedCostRange === '') || (event.minimum_cost <= parseInt(selectedCostRange, 10) && event.minimum_cost >= parseInt(selectedCostRange, 10) - 999)
            // console.log(event.minimum_cost)
            return nameMatch && priceMatch;
        });
        setFilteredEvents(filtered);
        // toast('Filtering!')
    }, [searchQuery, selectedCostRange, allEvents]);

    const costRangeOptions = ['3000', '4000', '5000'];

    return (
        <>
            <div className="bg-gradient-to-r from-slate-950 to-slate-800">
                <OffCanvasNavbar />
                <Navbar />

                { /* Search bar */}
                <div
                    className='border-0 md:ml-[50%] mx-[10%] flex mt-12'>
                    <input
                        name='query'
                        id='query'
                        onChange={(q) => { setSearchQuery(q.target.value) }}
                        className='rounded-2xl bg-slate-50 h-12 pl-12 w-full md:mr-[25%]'
                        type='text'
                        placeholder='Search...'
                    />
                    <AiOutlineSearch className='absolute mt-1 ml-2 h-8 w-8' />
                </div>

                <div className='mx-[5%] md:mx-[10%] md:flex '>
                    {/* Filter section */}
                    <div className='border-0 text-white md:w-[25%] h-full py-[5%] mt-12 text-center bg-orange-700 rounded-md'>
                        Search and Filter...<br /><br />

                        By price range:<br />
                        <select
                            value={selectedCostRange}
                            onChange={(e) => setSelectedCostRange(e.target.value)}
                            className='bg-gray-700 outline-none'
                        >
                            <option value="">All</option>
                            {costRangeOptions.map((range) => (
                                <option key={range} value={range}> 
                                    ₹ {range - 999} - ₹ {range} 
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Grid */}
                    <div className='bg-gray-800 rounded-md grid-view md:ml-6 md:text-base text-xs mt-12 md:w-[70%] h-screen overflow-y-auto mb-[10%]'>
                        <ul className='text-white grid gap-1 grid-cols-3'>
                            {
                                filteredEvents.map((event) => (
                                    <li className='border-0 text-center flex flex-col justify-between' key={event.event_id}>
                                        <Card
                                            poster={event.event_name.split(' ')[0].toLowerCase()}
                                            event_id={event.event_id}
                                        />
                                        <span>
                                            {event.event_name}
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            <Footer2></Footer2>
            </div>
           

            <style jsx="true">
                {
                    `
                        input:focus {
                            outline: none;
                            box-shadow: 0 0 0 5px rgba(251, 146, 60, 0.8);
                            transition: .3s;
                        }

                        .grid-view::-webkit-scrollbar {
                            width: 10px; 
                        }
                        
                        .grid-view::-webkit-scrollbar-thumb {
                            background-color: rgba(1, 166, 255, 0.9);
                            border-radius: 9999px;
                        }
                        
                        .grid-view::-webkit-scrollbar-thumb:hover {
                            background-color: rgb(113, 191, 255);
                            width: 11px;
                        }
                        
                        .grid-view::-webkit-scrollbar-track {
                            background-color: rgba(30, 41, 59);
                        }
                    `
                }
            </style>
        </>
    )
}