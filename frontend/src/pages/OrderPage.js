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
        console.log(authcontextData)
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

        document.title = 'Your Orders - Sports League';
    }, []);
    console.log(orders)

    const category = {
        VIP: "bg-purple-800",
        Premium: "bg-orange-700",
        General: "bg-green-800",
    };

    return (
        <>
            <div className="w-full bg-gradient-to-r from-slate-950 to-slate-800">
                <OffCanvasNavbar />
                <Navbar />
                <div className="flex justify-center text-2xl md:text-3xl md:my-[3%] my-[5%]">
                    <strong className="text-white">
                        Your Orders
                    </strong>
                </div>

                <ul className="text-white px-[8%] py-[2%]">
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
                            <ul className="md:flex flex-wrap grid grid-cols-2 md:grid-cols-none">
                                {order.tickets.map((ticket) => (
                                    <li
                                        key={ticket.ticket_id}
                                        className={ `m-2 p-2 md:p-4 border-4 border-gray-500 min-w-[75px] md:min-w-[150px] hover:bg-opacity-90 rounded-lg ${category[ticket.sector_name] ?? `bg-blue-800`} flex flex-col justify-between` }
                                        // style={{ minWidth: "150px" }} // Ensuring uniform size
                                    >
                                        <p className="text-sm text-gray-400 mb-1">
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
