import { createContext, useState, useEffect } from 'react'
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast'

const EventContext = createContext()

export default EventContext;


export const EventProvider = ({ children }) => {

    let [event_data,setE] = useState({
        event_id: 0, 
        event_name: '', 
        date_time: '', 
        event_description: '',
        stadium: {
            stadium_id : 0,
            stadium_name: '',
            location: '',
            coordinates: '',
            capacity: 0,
            city: ''
        },
        prices : []
    }) 

    
    let setEventdata = (x) => {
        setE(x) 
    }

    let contextData = {
        event_data : event_data,

        setEventdata : setEventdata,
    }

    return (
        <EventContext.Provider value={contextData} >
            {children}
        </EventContext.Provider>
    )
}
