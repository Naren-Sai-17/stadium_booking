import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Counter from "../utils/Counter";
import OffCanvasNavbar from "../components/OffCanvasNavbar";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import EventContext from "../context/EventContext";

const BookingPage = () => {
const { event_id } = useParams();
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

const [quantities, setQuantities] = useState({});
const [totalPrice, setTotalPrice] = useState(0);
const handleQuantityChange = (sector_id, quantity) => {
    setQuantities((prevQuantities) => ({
    ...prevQuantities,
    [sector_id]: quantity,
    }));
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

        <footer className="bg-slate-800 text-white text-center py-10">
        Contact us <br />a | a | a | a
        </footer>
    </div>
    </>
);
};

export default BookingPage;
