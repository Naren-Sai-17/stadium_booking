import React, { useContext, useEffect, useState } from 'react'
import OffCanvasNavbar from '../components/OffCanvasNavbar'
import Navbar from '../components/Navbar'
import EventContext from '../context/EventContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import Footer2  from '../components/Footer'
import { useNavigate, useParams, Link } from 'react-router-dom'

export default function BookingPage() {

    const Navigate = useNavigate()

    let { setEventdata } = useContext(EventContext)
    let contextData = useContext(EventContext)

    const {event_id} = useParams(); 
    const [event, setEvent] = useState({
        event_id: -1, 
        event_name: '', 
        date_time: '', 
        event_description: '',
        stadium: {
            stadium_id : 0,
            stadium_name: '',
            place_id: '',
            coordinates: '',
            capacity: 0,
            city: ''
        },
        prices: []
    }) 

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!(event_id == contextData.event_data.event_id)) {
            axios
                .get(`/api/get_event/${event_id}`)
                .then((res) => {
                    setEventdata(res.data);
                    setEvent(res.data);
                })
                .catch((err) => {
                    toast.error("That event does not exist.");
                    Navigate('/events')
                });
        } else {
            setEvent(contextData.event_data);
        }
    }, [])  

    useEffect(() => {
        document.title = event.event_name + " - Sports League" 
    }, [event.event_name])

    console.log(event)

    return (
        <>
            <div className="bg-gradient-to-r from-slate-950 to-slate-800">
                <OffCanvasNavbar />
                <Navbar />
                <div className="flex justify-items-start h-80 mx-[10%] my-[5%]">
                    <div className="w-1/4 flex items-center justify-center"> 
                        <img 
                            width="90%"
                            src={ `/images/posters/${event.event_name.split(' ')[0].toLowerCase()}/${((event_id * 337) % 137) % 6}.jpg` }
                            className="border-white border"  
                        />
                    </div>
                    <div className="w-full flex bg-gray-600 flex-col justify-around px-5 border rounded-lg border-dashed">
                        <div className="text-orange-500 text-3xl font-bold text-center">
                            <div>
                                { event.event_name }
                            </div>
                        </div>
                        <div className="text-base border-0 text-white">
                            Description: <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, tempora nam accusamus esse cupiditate nostrum? Commodi sequi tempore iure necessitatibus iste qui? Repellendus voluptatibus asperiores sapiente repudiandae aspernatur? Blanditiis, enim!
                        </div>
                        <div className="text-center border-0 flex justify-around text-white">
                            <div>Date: { event.date_time.substring(0, 10) }</div>
                            <div>Time: { event.date_time.substring(11, 16) } IST</div>
                            <div>Venue: { event.stadium.stadium_name }</div>
                        </div>
                        <div className="text-center text-lg border-0 text-white">
                            Book your tickets now!
                        </div>
                    </div>
                </div>
                
                <div className="m-10 text-center">
                    <Link to={`/event/${event_id}/book`}>
                        <button type="button" className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br shadow-orange-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            Book tickets
                        </button>
                    </Link>
                </div>


                <div className="m-10 text-center text-lg text-white">
                    Map
                    <div className="flex justify-center pt-5 border-0">
                        <iframe className="md:w-1/2" width='100%' height="300px" src={`https://www.google.com/maps/embed?${event.stadium.place_id}`}  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.579128311188!2d73.85123947400226!3d18.502713682587324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0123f3498ff%3A0x3d71c02ef70e432e!2sJawaharlal%20Nehru%20Stadium!5e0!3m2!1sen!2sin!4v1700172158629!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                    </div>
                </div>

                <div className="text-center text-lg text-white mx-[10%]">
                    Other events near you
                    <div className="h-64 border rounded-sm border-dashed pt-5">

                    </div>
                </div>

                <Footer2></Footer2>
            </div>
        </>
    )
}
