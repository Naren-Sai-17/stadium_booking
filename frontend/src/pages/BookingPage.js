import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Counter from '../utils/Counter';
import axios from 'axios'
import toast from 'react-hot-toast'
import EventContext from '../context/EventContext'


const BookingPage = () => {
    const {event_id} = useParams();  // getting event id from url

    return (
        <>
            
            <div className='w-full bg-gradient-to-r from-slate-950 to-slate-700'>
                <OffCanvasNavbar />
                <Navbar />
                <Link to={ `/event/${event_id}` } >
                    <div className='text-teal-500'>&#60;Back to event page</div>
                </Link>
                <ul className='text-gray-100'>
                    {
                        event.prices.map((sector) => (
                            <li key={sector.sector_id}>
                                {sector.sector_name} - {sector.sector_price}
                                <input 
                                    type="number"
                                    min="0"
                                    onChange={(e)=>handleQuantityChange(sector.sector_id,parseInt(e.target.value, 10))}
                                    className='bg-inherit border-red-600'
                                />
                            </li>
                        ))
                    }
                </ul>   
                <div className='text-gray-300'>
                    { totalPrice }
                </div>

                <footer className="bg-slate-800 text-white text-center py-10">
                    Contact us <br />
                    a | a | a | a
                </footer>
            </div>
        </>
    )
}

export default BookingPage