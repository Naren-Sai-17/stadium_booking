import React, { useContext, useEffect, useState } from 'react'
import OffCanvasNavbar from '../components/OffCanvasNavbar'
import Navbar from '../components/Navbar'
import EventContext from '../context/EventContext'
import axios from 'axios'
import { Navigate, useParams,Link } from 'react-router-dom'


export default function BookingPage() {

    let { setEventdata } = useContext(EventContext)
    const contextData  = useContext(EventContext) 

    const {event_id} = useParams(); 
    // const [stadium, setStadium] = useState({
    //     stadium_id: 0,
    //     stadium_name: '',
    //     location: '',
    //     coordinates: '',
    //     capacity: 0,
    //     city: '',
    // })
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
            setEventdata(res.data)
            setEvent(res.data)
        })
        .catch((err) => {
            // Replace this later with toastify (toast) notifications.
            // console.log("The event name is:", event.event_name, "with id:", event_id)
            console.error("Error fetching event:", err)
        })
        // axios.get(`/api/get_stadium?id=${event_id}`)
        // .then((res) => {
        //     setStadium(res.data) 
        // })
        // .catch((err) => {
        //     console.error("Error fetching related stadium:", err)
        // })
    }, [])  

    useEffect(() => {
        document.title = event.event_name + " - Sports League" 
    }, [event.event_name])

    // useEffect(() => {
    //     axios.get(`/api/get_stadium?id=${event_id}`)
    //     .then((res) => {
    //         setStadium(res.data)
    //     })
    //     .catch((err) => {
    //         console.error("Error fetching related stadium:", err)
    //     })
    // }, [])


    return (
        <>
            <div className='w-full bg-gradient-to-r from-slate-950 to-slate-700'>
                <OffCanvasNavbar />
                <Navbar />
                <div className="flex justify-items-start h-80 mx-[10%] my-[5%]">
                    <div className="w-1/4 flex items-center justify-center"> 
                        <img 
                            width="90%"
                            src={ `/images/posters/${event.event_name.split(' ')[0].toLowerCase()}/${((event_id * 337) % 137) % 6}.jpg` }
                            // src={ `/images/posters/undefined.jpg` }
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
                        <button onClick={()=>{
                            //checking EventContext function
                            console.log(contextData.event_data.event_id)
                            
                        }} type="button" className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br shadow-orange-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            Book tickets
                        </button>
                    </Link>
                </div>


                <div className="m-10 text-center text-lg text-white">
                    Map
                    <div className="flex justify-center pt-5 border-0">
                        <iframe className="md:w-1/2" width='100%' height="300px" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                            <a href="https://www.maps.ie/population/">
                                Population mapping
                            </a>
                        </iframe>
                    </div>
                </div>

                <div className="text-center text-lg text-white mx-[10%]">
                    Other events near you
                    <div className="h-64 border rounded-sm border-dashed pt-5">

                    </div>
                </div>

                <footer className="bg-slate-800 text-white text-center py-10">
                    Contact us <br />
                    a | a | a | a
                </footer>
            </div>
        </>
    )
}
