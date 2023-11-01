import React from 'react'
import { useParams } from 'react-router-dom'
import Counter from '../utils/Counter';

const BookingPage = () => {
    const {event_id} = useParams();  // getting event id from url

    return (
        <div>
            
        </div>
    )
}

export default BookingPage