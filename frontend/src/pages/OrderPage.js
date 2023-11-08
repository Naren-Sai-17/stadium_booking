import React, { useContext, useEffect, useState } from "react";
import OffCanvasNavbar from "../components/OffCanvasNavbar";
import Navbar from "../components/Navbar";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { MdArrowBackIos } from "react-icons/md";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const OrderPage = () => {
const authcontextData = useContext(AuthContext);
const [orders, setOrders] = useState([]);
useEffect(() => {
    axios
    .post(`/api/get_orders/`, { user_id: authcontextData.user.id })
    .then((res) => {
        setOrders(res.data);
        console.log(res.data);
    })
    .catch((err) => {
        toast.success("error fetching details");
    });
}, []);
return (
    <>
    <div className="w-full bg-gradient-to-r from-slate-950 to-slate-700">
        <OffCanvasNavbar />
        <Navbar />

        <ul className="text-white">
        {orders.map((order) => (
            <li
            key={order.booking_id}
            className="my-4 border-b border-gray-500 pb-4"
            >
            <div className="mb-2">
                <p className="text-lg font-bold">
                Order ID: {order.booking_id}
                </p>
                <p className="text-gray-400">Event: {order.event_name}</p>
            </div>
            <ul className="flex flex-wrap">
                {order.tickets.map((ticket) => (
                <li
                    key={ticket.ticket_id}
                    className="m-2 p-4 border border-gray-300 rounded bg-gray-700 flex flex-col justify-between"
                    style={{ minWidth: "150px" }} // Ensuring uniform size
                >
                    <p className="text-sm text-gray-500 mb-1">
                    Ticket ID:{" "}
                    <span className="font-bold text-xs">
                        {ticket.ticket_id}
                    </span>
                    </p>
                    <p className="text-base">{ticket.sector_name}</p>
                </li>
                ))}
            </ul>
            </li>
        ))}
        </ul>

        <footer className="bg-slate-800 text-white text-center py-10">
        Contact us <br />a | a | a | a
        </footer>
    </div>
    </>
);
};

export default OrderPage;
