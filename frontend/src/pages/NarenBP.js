import React, { useEffect, useState } from 'react'
import OffCanvasNavbar from '../components/OffCanvasNavbar'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { Link , useParams } from 'react-router-dom'

const BookingPage = () => {
    const {event_id} = useParams(); 
    const [event, setEvent] = useState({
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

    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get(`/api/get_event/${event_id}`)  
        .then((res) => {
            setEvent(res.data)
        })
        .catch((err) => {
            // Replace this later with toastify (toast) notifications.
            // console.log("The event name is:", event.event_name, "with id:", event_id)
            console.error("Error fetching event:", err)
        })
    }, [])  

    useEffect(() => {
        document.title = event.event_name + " - Sports League" 
    }, [event.event_name])

    const [quantities,setQuantities] = useState({}) 
    const [totalPrice, setTotalPrice] = useState(0) 
    const handleQuantityChange = (sector_id, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [sector_id]: quantity,
        }));   
    }
    useEffect(() => {
        console.log(quantities)
        let totalCost = 0
        for (const sector_id in quantities) {
            const quantity = quantities[sector_id] 
            const sector = event["prices"].find(sector => sector.sector_id == sector_id)
            console.log("sector ",sector)
            if (sector) { 
                console.log("rrr")
                totalCost += sector.sector_price * quantity 
            }
        }
        setTotalPrice(totalCost) 
        console.log("total ",totalCost)
    },[quantities])
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