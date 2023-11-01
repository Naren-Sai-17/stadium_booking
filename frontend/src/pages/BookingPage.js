import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Counter from '../utils/Counter';
import axios from 'axios'
import toast from 'react-hot-toast'
import EventContext from '../context/EventContext'


const BookingPage = () => {
    const {event_id} = useParams();  // getting event id from url
    const contextData  = useContext(EventContext) 
    let { setEventdata } = useContext(EventContext)

    
    //the current events data will get updated in the Event context so proceed directly
    useEffect(() => {
        console.log((contextData.event_data.event_id))
        console.log((event_id))
        if(!((event_id) == (contextData.event_data.event_id))){

            
            console.log("event_id not equal")
            axios.get(`/api/get_event/${event_id}`)  
            .then((res) => {
                setEventdata(res.data)
                console.log("after fetching details ", res.data)
            })
            .catch((err) => {
                // Replace this later with toastify (toast) notifications.
                // console.log("The event name is:", event.event_name, "with id:", event_id)
                console.error("Error fetching event:", err)
                toast.fail("404 event does not exist")
            })
        }
        else{
            //remove these later
            toast.success(`event-id:${contextData.event_data.event_id} & event-name:${contextData.event_data.event_name} `)
            console.log(contextData.event_data.event_id)
            console.log("event_id's are equal-NO API CALL!")
        }
    }, []);

   

    return (
        <div>
            
        </div>
    )
}

export default BookingPage