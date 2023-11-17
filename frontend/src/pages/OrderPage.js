import React, { useContext, useEffect, useState } from "react";
import OffCanvasNavbar from "../components/OffCanvasNavbar";
import Navbar from "../components/Navbar";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer2 from "../components/Footer";

const OrderPage = () => {
const authcontextData = useContext(AuthContext);
const [orders, setOrders] = useState([]);

const Navigate = useNavigate();

useEffect(() => {
    if (authcontextData.authTokens) {
    axios
        .get(`/api/get_orders/`, {
        headers: {
            Authorization: `Bearer ${authcontextData.authTokens.access}`,
        },
        })
        .then((res) => {
            setOrders(res.data);
            // if (res.data.length === 0) {
            //     toast("You don't have any orders yet.")
            // }
        })
        .catch((err) => {
        console.error(err);
        toast("Error fetching event details.");
        });
    } else {
    toast("Please login to see your orders.");
    Navigate("/login", { state: { next_url: "/orders" } });
    }
}, []);
// useEffect(() => {

//         if(orders.length === 0)
//         {
//             console.log("here")
//             const ele = document.getElementById("not_found")
//             ele.classList.remove('hidden')
//             ele.classList.add('flex')
//         }

// },[orders])

function handleDownload(booking_id) {
    axios({
    url: `/api/get_bill/${booking_id}`,
    method: "GET",
    responseType: "blob",
    })
    .then((res) => {
        // Create a blob object from the binary data
        const blob = new Blob([res.data], { type: "application/pdf" });

        // Create a link element and trigger the download
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "booking_bill.pdf";
        document.body.appendChild(link);
        link.click();

        toast.success("Bill fetched successfully.");

        // Clean up
        document.body.removeChild(link);
    })
    .catch((err) => {
        console.log(err);
        toast.error("Error fetching bill. Try again later.");
    });
}

const category = {
    VIP: "bg-purple-800",
    Premium: "bg-orange-700",
    General: "bg-green-800",
};

return (
    <>
    <div className="w-full min-h-screen bg-gradient-to-r from-slate-950 to-slate-800">
        <OffCanvasNavbar />
        <Navbar />
        <div className="flex justify-center text-2xl md:text-3xl md:my-[3%] my-[5%]">
        <strong className="text-white">Your Orders</strong>
        </div>

        {/* <div
        
        className="hidden justify-center text-2xl md:text-3xl md:my-[3%] my-[5%]"
        >
        <span className="text-white p-1 md:p-5 text-xs md:text-xl bg-gray-700 rounded-lg">
            You don't have any orders yet.
        </span>
        </div> */}

        <ul className="text-white px-[8%] py-[2%]">
        {orders?.map((order) => (
            <li
            key={order.booking_id}
            className="my-4 border-0 border-gray-500 pb-4"
            >
            <div className="md:flex md:justify-between">
                <div className="border-0">
                <div className="mb-2">
                    <p className="text-lg font-bold">
                    Order ID: {order.booking_id}
                    </p>
                    <p className="text-gray-400">Event: {order.event_name}</p>
                </div>
                <ul className="md:flex flex-wrap border-0 grid grid-cols-2 md:grid-cols-none">
                    {order.tickets.map((ticket) => (
                    <li
                        key={ticket.ticket_id}
                        className={`m-2 p-2 md:p-4 border-2 border-gray-300 min-w-[75px] md:min-w-[150px] hover:bg-opacity-90 rounded-lg ${
                        category[ticket.sector_name] ?? `bg-blue-800`
                        } flex flex-col justify-between`}
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
                <ul className="md:flex flex-wrap border-0 grid grid-cols-3 text-sm md:grid-cols-none">
                    {order.food_coupons.map((food_coupon) => (
                    <li
                        key={food_coupon.food_name}
                        className="m-2 p-2 md:p-4 border-2 border-gray-300 min-w-[75px] md:min-w-[150px] hover:bg-opacity-90 rounded-lg bg-gray-700 flex flex-col justify-between"
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
                </div>
                <div className="border-0 flex md:flex-col justify-center md:mr-[3%]">
                <div className="button" data-tooltip="PDF">
                    <div className="button-wrapper">
                    <button
                        onClick={(e) => {
                        handleDownload(order.booking_id);
                        }}
                    >
                        <div className="text">Download Bill</div>
                        <span className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="img"
                            width="2em"
                            height="2em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                        >
                            <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                            ></path>
                        </svg>
                        </span>
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </li>
        ))}
        </ul>
    </div>
    <div className="bottom-0">
        <Footer2 />
    </div>

    <style jsx="true">
        {`
        .button {
            --width: 145px;
            --height: 40px;
            --tooltip-height: 35px;
            --tooltip-width: 90px;
            --gap-between-tooltip-to-button: 18px;
            --button-color: #1163ff;
            --tooltip-color: #fff;
            width: var(--width);
            height: var(--height);
            background: var(--button-color);
            position: relative;
            text-align: center;
            border-radius: 0.45em;
            font-family: "Verdana", "Arial";
            transition: background 0.3s;
        }

        .button::before {
            position: absolute;
            content: attr(data-tooltip);
            width: var(--tooltip-width);
            height: var(--tooltip-height);
            background-color: var(--tooltip-color);
            font-size: 0.9rem;
            color: #111;
            border-radius: 0.25em;
            line-height: var(--tooltip-height);
            bottom: calc(
            var(--height) + var(--gap-between-tooltip-to-button) + 10px
            );
            left: calc(50% - var(--tooltip-width) / 2);
        }

        .button::after {
            position: absolute;
            content: "";
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-top-color: var(--tooltip-color);
            left: calc(50% - 10px);
            bottom: calc(100% + var(--gap-between-tooltip-to-button) - 10px);
        }

        .button::after,
        .button::before {
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s;
        }

        .text {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .button-wrapper,
        .text,
        .icon {
            overflow: hidden;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            color: #fff;
        }

        .text {
            top: 0;
        }

        .text,
        .icon {
            transition: top 0.5s;
        }

        .icon {
            color: #fff;
            top: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .icon svg {
            width: 24px;
            height: 24px;
        }

        .button:hover {
            background: #6c18ff;
            cursor: pointer;
        }

        .button:hover .text {
            top: -100%;
        }

        .button:hover .icon {
            top: 0;
        }

        .button:hover:before,
        .button:hover:after {
            opacity: 1;
            visibility: visible;
        }

        .button:hover:after {
            bottom: calc(
            var(--height) + var(--gap-between-tooltip-to-button) - 20px
            );
        }

        .button:hover:before {
            bottom: calc(var(--height) + var(--gap-between-tooltip-to-button));
        }
        `}
    </style>
    </>
);
};

export default OrderPage;
