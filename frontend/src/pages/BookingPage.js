import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Counter from "../utils/Counter";
import OffCanvasNavbar from "../components/OffCanvasNavbar";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import EventContext from "../context/EventContext";
import AuthContext from "../context/AuthContext";
const BookingPage = () => {
const { event_id } = useParams();
const authcontextData = useContext(AuthContext)
const contextData = useContext(EventContext);
let { setEventdata } = useContext(EventContext);

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
    city: "",
    },
    prices: [],
});

useEffect(() => {
    if (!(event_id == contextData.event_data.event_id)) {
    axios
        .get(`/api/get_event/${event_id}`)
        .then((res) => {
        setEventdata(res.data);
        setEvent(res.data);
        })
        .catch((err) => {
        toast.fail("404 event does not exist");
        });
    } else {
    setEvent(contextData.event_data);
    }
}, []);

useEffect(() => {
    document.title = event.event_name + " - Sports League";
}, [event.event_name]);
const navigate = useNavigate();
const [quantities, setQuantities] = useState({});
const [totalPrice, setTotalPrice] = useState(0);
const handleQuantityChange = (sector_id, quantity) => {
    setQuantities((prevQuantities) => {
        const updatedQuantities = { ...prevQuantities };
        if (quantity === 0) {
            delete updatedQuantities[sector_id];
        } else {
            updatedQuantities[sector_id] = quantity;
        }
        return updatedQuantities;
    });
};

useEffect(() => {
    let totalCost = 0;
    for (const sector_id in quantities) {
    const quantity = quantities[sector_id];
    const sector = event["prices"].find(
        (sector) => sector.sector_id == sector_id
    );
    if (sector) {
        totalCost += sector.event_price * quantity;
    }
    }
    setTotalPrice(totalCost);
}, [quantities]);



const handleFormSubmit = () => {
    if(Object.keys(quantities).length === 0) 
    {
        toast.error("You need to select something") 
    }
    else
    {
        axios.post(`/api/buy/`,
        {
            'user_id': authcontextData.user.id,
            'event_id' : event_id,
            'seats':quantities
        })
        .then(function (response) {
            if (response.data.status === "success") 
            {
                navigate('/orders')
            }
            else
            {
                toast.error("Not enough seats")
            }
        })
        .catch(function (error) {
            toast.error('Error communicating with the database')
        });
    }
}

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
            <li key={sector.sector_id}>
            {sector.sector_name} - {sector.event_price} -
            <input
                type="number"
                min="0"
                onChange={(e) =>
                handleQuantityChange(
                    sector.sector_id,
                    e.target.value
                    ? parseInt(e.target.value, 10)
                    : parseInt(0, 10)
                )
                }
                className="bg-inherit border-red-600"
            />
            </li>
        ))}
        </ul>
        <div className="text-gray-300">{totalPrice}</div>

        <button 
            onClick={handleFormSubmit}
            type="button"  
            className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br shadow-orange-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Make Payment
        </button>


        <footer className="bg-slate-800 text-white text-center py-10">
        Contact us <br />a | a | a | a
        </footer>
    </div>
    </>
);
};

export default BookingPage;
