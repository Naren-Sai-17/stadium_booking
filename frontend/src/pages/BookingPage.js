import React, { useContext, useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import Counter from '../utils/Counter';
import OffCanvasNavbar from '../components/OffCanvasNavbar'
import Navbar from '../components/Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'
import EventContext from '../context/EventContext'


const BookingPage = () => {
    const {event_id} = useParams();  // getting event id from url
    const contextData  = useContext(EventContext) 
    let { setEventdata } = useContext(EventContext)

    



    const [event, setEvent] = useState({
      event_id: 0,
      event_name: "",
      date_time: "",
      event_description: "",
      stadium: {
        stadium_id: 0,
        stadium_name: "",
        location: "",
        coordinates: "",
        capacity: 0,
        city: "",
      },
      prices: [],
    });



	    //the current events data will get updated in the Event context so proceed directly
		useEffect(() => {
			console.log((contextData.event_data.event_id))
			console.log((event_id))
			if(!((event_id) == (contextData.event_data.event_id))){
	
				
				console.log("event_id not equal")
				axios.get(`/api/get_event/${event_id}`)  
				.then((res) => {
					setEventdata(res.data)
					setEvent(res.data)
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
				console.log("without api call,Event context's data ",contextData.event_data)
				setEvent(contextData.event_data)
				console.log("event_id's are equal-NO API CALL!")
			}
		}, []);



    // useEffect(() => {
    //   window.scrollTo(0, 0);
    //   axios
    //     .get(`/api/get_event/${event_id}`)
    //     .then((res) => {
    //       setEvent(res.data);
    //     })
    //     .catch((err) => {
    //       // Replace this later with toastify (toast) notifications.
    //       // console.log("The event name is:", event.event_name, "with id:", event_id)
    //       console.error("Error fetching event:", err);
    //     });
    // }, []);

	

    useEffect(() => {
      document.title = event.event_name + " - Sports League";
    }, [event.event_name]);

    const [quantities, setQuantities] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const handleQuantityChange = (sector_id, quantity) => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [sector_id]: quantity,
      }));
    };
    useEffect(() => {
      console.log(quantities);
      let totalCost = 0;
      for (const sector_id in quantities) {
        const quantity = quantities[sector_id];
        const sector = event["prices"].find(
          (sector) => sector.sector.sector_id == sector_id
        );
        console.log("sector ", sector);
        if (sector) {
          console.log("rrr");
          totalCost += sector.event_price * quantity;
        }
      }
      setTotalPrice(totalCost);
      console.log("total ", totalCost);
    }, [quantities]);

   

    return (
      <>
        <div className="w-full bg-gradient-to-r from-slate-950 to-slate-700">
          <OffCanvasNavbar />
          <Navbar />
          <Link to={`/event/${event_id}`}>
            <div className="text-teal-500">&#60;Back to event page</div>
          </Link>
          <ul className="text-gray-100">
            {event.prices.map((sector) => (
              <li key={sector.sector.sector_id}>
                {sector.sector.sector_name} - {sector.event_price} -
                <input
                  type="number"
                  min="0"
                  onChange={(e) =>
                    handleQuantityChange(
                      sector.sector.sector_id,
                      e.target.value?parseInt(e.target.value, 10):parseInt(0, 10)
                    )
                  }
                  className="bg-inherit border-red-600"
                />
              </li>
            ))}
          </ul>
          <div className="text-gray-300">{totalPrice}</div>

          <footer className="bg-slate-800 text-white text-center py-10">
            Contact us <br />a | a | a | a
          </footer>
        </div>
      </>
    );
}

export default BookingPage