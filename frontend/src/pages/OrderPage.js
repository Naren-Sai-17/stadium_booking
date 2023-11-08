import React, { useContext, useEffect, useState } from 'react'
import OffCanvasNavbar from '../components/OffCanvasNavbar'
import Navbar from '../components/Navbar'
import axios from 'axios'
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';
import { MdArrowBackIos } from "react-icons/md";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";


const OrderPage = () => {
    const authcontextData = useContext(AuthContext);
    const [orders,setOrders] = useState([])
    useEffect(() => {
        axios
            .post(`/api/get_orders/`,{'user_id':authcontextData.user.id})
            .then((res) => {
                setOrders(res.data)
                console.log(res.data) 
            })
            .catch((err) => {
                toast.success("error fetching details");
            })
    },[])
    return (
        <>
            <div className='w-full bg-gradient-to-r from-slate-950 to-slate-700'>
                <OffCanvasNavbar />
                <Navbar />
                
                <ul className='text-white'>
                    {orders.map((order) => (
                        <li
                        key={order.booking_id}>
                            <div>
                                order - {order.booking_id}
                                event - {order.event} 
                            </div>
                            <ul>
                                {order.tickets.map((ticket) => (
                                    <li> 
                                        ticket-id : {ticket.ticket_id}
                                        sector : {ticket.sector}

                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <footer className="bg-slate-800 text-white text-center py-10">
                    Contact us <br />
                    a | a | a | a
                </footer>
            </div>
        </>
    )
}

export default OrderPage