import React from 'react'
import { Link } from 'react-router-dom'

export default function Card(event) {
    // console.log(event.poster)
    return (
        <div className='card border-0 p-[10%]'>
            <Link to={ `/event/${event.event_id}` }>
                <img 
                className = "flex justify-center rounded-lg md:rounded-3xl" 
                src = 
                    { `/images/posters/${event.poster}/${((event.event_id * 337) % 137) % 6}.jpg` }
                alt='event'
                />
            </Link>
        </div>
    )
}