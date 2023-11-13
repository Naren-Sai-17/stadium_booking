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
    const Navigate = useNavigate();

    const [maxSeats, setMaxSeats] = useState(0)
    const [genSeats, setGenSeats] = useState(0)
    const [preSeats, setPreSeats] = useState(0)
    const [vipSeats, setVipSeats] = useState(0)

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
                    Navigate('/events')
                });
        } else {
            setEvent(contextData.event_data);
        }

        if (!authcontextData.user) {
            toast('Please login to book tickets.')
            Navigate('/login', { state: { 'next_url': `/event/${event_id}/book` } })
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
        // ------------------- Process date -------------------
        let human_readable = new Date(event.date_time)
        let minutes = human_readable.getUTCMinutes();

        if(minutes == '0') {
            minutes += '0'
        }

        setDate(human_readable.getUTCHours() + ":" + minutes + ", " + human_readable.getDate() + ' ' + months[human_readable.getMonth()])

        // ------------------- Process number of available seats -------------------
        let totalSeats = 0, gen = 0, vip = 0, pre = 0;
        for (var it = 0; it < event.prices.length; ++it) {
            const item = event.prices[it];
            totalSeats += item.remaining_seats;
            
            if (item.sector_name === 'General') {
                gen += item.remaining_seats;
            } else if (item.sector_name === 'Premium') {
                pre += item.remaining_seats;
            } else {
                vip += item.remaining_seats;
            }
        }

        setMaxSeats(totalSeats);
        setGenSeats(gen);
        setPreSeats(pre);
        setVipSeats(vip);

        document.title = event.event_name + " - Sports League";
    }, [event])


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

    const isAllowed = () => {
        const gen_selected = parseInt(document.getElementById('General').value, 10);
        const pre_selected = parseInt(document.getElementById('Premium').value, 10);
        const vip_selected = parseInt(document.getElementById('VIP').value, 10);

        return (gen_selected + pre_selected + vip_selected < Math.min(10, maxSeats));
    }

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
                        Navigate("/orders");
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
                        { event.event_name }
                        <div className="text-xs md:text-sm text-right mr-[5%] text-gray-400">
                            { event.stadium.stadium_name }
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

                <strong className="flex justify-center mt-[5%] md:mt-[3%] md:text-2xl text-orange-300">
                    🕑{date}
                </strong>

                <div className="text-white flex justify-center mt-[1%] text-xs mb-[3%] md:text-xl"> 
                    You can book up to 
                    <span className="md:px-2 px-1 font-bold text-orange-400">
                        { Math.min(10, maxSeats) }
                    </span>
                    tickets. 
                </div>

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
                                    <button 
                                        className="minus bg-red-300 border border-red-400 text-red-700 hover:bg-red-400 h-full w-20 rounded-l cursor-pointer outline-none disabled:opacity-40"
                                        onClick={(e) => {
                                            const inputQuantity = document.getElementById(sector.sector_name);
                                            if (Number(inputQuantity.value) >= 1) {
                                                inputQuantity.value = parseInt(inputQuantity.value - 1, 10);
                                                handleQuantityChange(sector.sector_id, Number(inputQuantity.value));

                                                if (Number(inputQuantity.value) === 0) {
                                                    e.target.disabled = true;
                                                }
                                            } else {
                                                e.target.disabled = true;
                                            }
                                        }}
                                    >
                                        <span className="bg-slate-800 m-auto md:text-2xl text-sm font-thin"> - </span>
                                    </button>

                                    <input
                                        id={sector.sector_name}
                                        type="number"
                                        className="outline-none focus:outline-none text-center w-[75%] bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                                        name="custom-input-number"
                                        // value='0' 
                                        // USE REACT HOOKS TO STORE THE VALUE!
                                        disabled 
                                        // onChange={(e) =>
                                        //     handleQuantityChange(
                                        //         sector.sector_id,
                                        //         e.target.value
                                        //             ? parseInt(e.target.value, 10)
                                        //             : parseInt(0, 10)
                                        //     )
                                        // }
                                    >
                                        {/* Nothing to see here... */}
                                    </input>

                                    {/* Plus button */}
                                    <button 
                                        className="plus bg-green-400 border border-green-500 text-green-700 hover:bg-green-500 h-full w-20 rounded-r cursor-pointer disabled:opacity-40"
                                        onClick={(e) => {
                                            let inputQuantity = document.getElementById(sector.sector_name);
                                            // console.log('lol', inputQuantity.value)

                                            if (sector.sector_name === 'General') {
                                                if (Number(inputQuantity.value) < genSeats && isAllowed()) {
                                                    inputQuantity.value = Number(inputQuantity.value) + 1;
                                                    handleQuantityChange(sector.sector_id, Number(inputQuantity.value));
                                                } else {
                                                    e.target.disabled = true;
                                                }
                                            } else if (sector.sector_name === 'Premium') {
                                                if (Number(inputQuantity.value) < preSeats && isAllowed()) {
                                                    inputQuantity.value = Number(inputQuantity.value) + 1;
                                                    handleQuantityChange(sector.sector_id, Number(inputQuantity.value));
                                                } else {
                                                    e.target.disabled = true;
                                                }
                                            } else {
                                                if (Number(inputQuantity.value) < vipSeats && isAllowed()) {
                                                    inputQuantity.value = Number(inputQuantity.value) + 1;
                                                    handleQuantityChange(sector.sector_id, Number(inputQuantity.value));
                                                } else {
                                                    e.target.disabled = true;
                                                }
                                            }
                                        }}
                                    >
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
                            { totalPrice }
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
