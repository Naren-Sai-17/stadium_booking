import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import OffCanvasNavbar from "../components/OffCanvasNavbar";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import EventContext from "../context/EventContext";
import { MdArrowBackIos } from "react-icons/md";
import AuthContext from "../context/AuthContext";

const BookingPage = () => {
    const { event_id } = useParams();
    const authcontextData = useContext(AuthContext);
    const contextData = useContext(EventContext);
    let { setEventdata } = useContext(EventContext);
    const navigate = useNavigate();

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

    const [date, setDate] = useState('')

    useEffect(() => {
        if (!(event_id == contextData.event_data.event_id)) {
            axios
                .get(`/api/get_event/${event_id}`)
                .then((res) => {
                    setEventdata(res.data);
                    setEvent(res.data);
                })
                .catch((err) => {
                    toast.error("That event does not exist.");
                    navigate('/events')
                });
        } else {
            setEvent(contextData.event_data);
        }

        if (!authcontextData.user) {
            toast('Please login to book tickets.')
            navigate('/login', { state: { 'next_url': `/event/${event_id}/book` } })
        }
    }, []);

    const category = {
        VIP: "bg-purple-800",
        Premium: "bg-orange-600",
        General: "bg-green-800",
    };

    const months = [
        'Month',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]

    useEffect(() => {
        let human_readable = new Date(event.date_time)
        let minutes = human_readable.getUTCMinutes();

        if(minutes == '0') {
            minutes += '0'
        }

        setDate(human_readable.getUTCHours() + ":" + minutes + ", " + human_readable.getDate() + ' ' + months[human_readable.getMonth()])
    }, [event])

    useEffect(() => {
        document.title = event.event_name + " - Sports League";
    }, [event.event_name]);
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
        if (Object.keys(quantities).length === 0) {
            toast.error("You need to select something.");
        } else {
            axios
                .post(`/api/buy/`, {
                    user_id: authcontextData.user.id,
                    event_id: event_id,
                    seats: quantities,
                })
                .then(function (response) {
                    if (response.data.status === "success") {
                        navigate("/orders");
                    } else {
                        toast.error("Not enough seats!");
                    }
                })
                .catch(function (error) {
                    console.error(error)
                    toast.error("Error communicating with the database.");
                });
        }
    };

    return (
        <>
            <div className="bg-gradient-to-r from-slate-950 to-slate-700">
                <OffCanvasNavbar />
                <Navbar />

                <div className="text-white bg-slate-900 flex justify-between z-10 py-[1%] px-[1%] md:px-[4%] w-screen fixed border-0">
                    <Link to={`/event/${event_id}`}>
                        <button className="mt-[2%] ml-[5%] text-white whitespace-nowrap mx-auto flex bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br shadow-orange-500/50 dark:shadow-lg font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            <MdArrowBackIos className="my-auto h-4 w-4" />
                            <span className="hidden md:inline-block">Back to event page</span>
                        </button>
                    </Link>

                    <span className="text-xs md:mr-0 mr-[3%] md:text-2xl md:pr-[5%] font-semibold flex flex-col justify-center">
                        {event.event_name}
                        <div className="text-xs md:text-sm text-right mr-[5%] text-gray-400">
                            {event.stadium.stadium_name}
                        </div>
                    </span>
                </div>

                <div className="mx-auto text-white w-[80%] md:w-[35%] mt-[20%] md:mt-[8%] border flex justify-center">
                    <img
                        className="flex justify-center rounded-lg md:rounded-3xl w-1/2"
                        src={`/images/posters/${event.event_name
                            .split(" ")[0]
                            .toLowerCase()}/${((event_id * 337) % 137) % 6}.jpg`}
                        alt="event"
                    />
                </div>

                <strong className="text-white flex justify-center mt-[5%] text-xs mb-[3%] md:text-xl"> 
                    You can book up to 10 tickets. 
                </strong>

                <ul className="md:w-[40%] text-xs  md:text-md w-[80%] mx-auto text-gray-100">
                    {event.prices.map((sector) => (
                        <li
                            key={sector.sector_id}
                            className={`${category[sector.sector_name]
                                } bg-opacity-90 py-[3%] px-[5%] flex mt-[3%] rounded-md justify-between md:text-xl`}
                        >
                            <strong className="border-0 flex flex-col justify-center">
                                {sector.sector_name} {`(₹ ` + sector.event_price + `)`}
                            </strong>

                            <div className="custom-number-input border-0 flex flex-col justify-center md:h-12 md:w-32 h-7 w-16">
                                <div className="flex flex-row h-[80%] w-full rounded-lg relative bg-transparent">
                                    {/* Minus button */}
                                    <button className="bg-red-300 border border-red-400 text-red-700 hover:bg-red-400 h-full w-20 rounded-l cursor-pointer outline-none disabled:opacity-70">
                                        <span className="m-auto md:text-2xl text-sm font-thin"> - </span>
                                    </button>

                                    <input
                                        type="number"
                                        className="outline-none focus:outline-none text-center w-[75%] bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 disabled:opacity-70"
                                        name="custom-input-number"
                                        placeholder='0'
                                        min='0'
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                sector.sector_id,
                                                e.target.value
                                                    ? parseInt(e.target.value, 10)
                                                    : parseInt(0, 10)
                                            )
                                        }
                                    >
                                        {/* Nothing to see here... */}
                                    </input>

                                    {/* Plus button */}
                                    <button className="bg-green-400 border border-green-500 text-green-700 hover:bg-green-500 h-full w-20 rounded-r cursor-pointer disabled:opacity-70">
                                        <span className="m-auto text-sm md:text-2xl font-thin"> + </span>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <section className="md:flex justify-center">
                    <div className="text-gray-300 flex my-[5%] md:w-[60%] border justify-center">
                        <div className="my-auto pl-[3%] w-[50%] border">
                            {totalPrice}
                        </div>

                        <div className="w-[50%] border-0 flex justify-center">
                            <button
                                onClick={handleFormSubmit}
                                type="button"
                                className="text-white text-xs md:text-xl focus:outline-1 focus:outline-rose-500 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br shadow-orange-500/50 dark:shadow-lg font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
                            >
                                Make Payment »
                            </button>
                        </div>
                    </div>
                </section>

                <footer className="bg-slate-800 text-white text-center py-10">
                    Contact us <br />a | a | a | a
                </footer>
            </div>

            <style jsx="true">
                {`
                    input {
                        width: 3vw;
                    }

                    @media screen and (max-width: 768px) input {
                        width: 8vw;
                    }

                    input[type='number']::-webkit-inner-spin-button,
                    input[type='number']::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }

                    .custom-number-input input:focus {
                        outline: none !important;
                    }

                    .custom-number-input button:focus {
                        outline: none !important;
                    }
                `}
            </style>
        </>
    );
};

export default BookingPage;
