import React, { useContext, useEffect, useState } from "react";
import OffCanvasNavbar from "../components/OffCanvasNavbar";
import Navbar from "../components/Navbar";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
    const authcontextData = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    const Navigate = useNavigate()

    useEffect(() => {
        if (authcontextData.authTokens) {
            axios.get(`/api/get_orders/`, {
                headers: {
                    'Authorization': `Bearer ${authcontextData.authTokens.access}`
                }
            })
            .then((res) => {
                setOrders(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err)
                toast("Error fetching event details.");
            });
        } else {
            toast("Please login to see your orders.");
            Navigate('/login', { state: { 'next_url': '/orders' } })
        }
    }, []);
    console.log(orders)
    return (
        <>
            <div className="w-full bg-gradient-to-r from-slate-950 to-slate-800">
                <OffCanvasNavbar />
                <Navbar />

                <ul className="text-white">
                    {orders?.map((order) => (
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
                            <ul className="flex flex-wrap">
                                {order.food_coupons.map((food_coupon) => (
                                    <li
                                        key={food_coupon.food_name}
                                        className="m-2 p-4 border border-gray-300 rounded bg-gray-700 flex flex-col justify-between"
                                        style={{ minWidth: "150px" }} // Ensuring uniform size
                                    >
                                        {/* <p className="text-sm text-gray-500 mb-1">
                                            Item:{" "}
                                            <span className="font-bold text-xs">
                                                {food_coupon.food_name}
                                            </span>
                                        </p> */}
                                        <p>{food_coupon.food_name}</p>
                                        <p className="text-base">{food_coupon.quantity}</p>
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
