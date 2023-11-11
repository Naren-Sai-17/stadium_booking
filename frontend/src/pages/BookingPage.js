import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import OffCanvasNavbar from "../components/OffCanvasNavbar";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import EventContext from "../context/EventContext";
import { MdArrowBackIos } from "react-icons/md";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
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

        if(!authcontextData.user) {
            toast('Please login to book tickets.')
            navigate('/login', { state : { 'next_url': `/event/${event_id}/book` } })
        }
    }, []);

    const category = {
        VIP: "bg-purple-800",
        Premium: "bg-orange-600",
        General: "bg-green-800",
    };

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
            toast.error("You need to select something");
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
                        toast.error("Not enough seats");
                    }
                })
                .catch(function (error) {
                    toast.error("Error communicating with the database");
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

                    <span className="text-sm md:text-2xl md:pr-[5%] font-semibold flex flex-col justify-center">
                        {event.event_name}
                    </span>
                </div>

                <div className="mx-auto text-white w-[80%] md:w-[35%] my-[20%] md:my-[8%] border flex justify-center">
                    <img
                        className="flex justify-center rounded-lg md:rounded-3xl w-1/2"
                        src={`/images/posters/${event.event_name
                            .split(" ")[0]
                            .toLowerCase()}/${((event_id * 337) % 137) % 6}.jpg`}
                        alt="event"
                    />
                </div>

                <ul className="md:w-[40%] text-sm md:text-md w-[80%] mx-auto text-gray-100">
                    {event.prices.map((sector) => (
                        <li
                            key={sector.sector_id}
                            className={`${
                                category[sector.sector_name]
                            } border-0 py-[3%] px-[5%] flex mt-[3%] rounded-md justify-between md:text-xl`}
                        >
                            <strong>
                                {sector.sector_name} {`(` + sector.event_price + `)`}
                            </strong>
                            <div className="flex gap-2 md:gap-4">
                                <AiOutlineMinusCircle className="my-auto md:h-8 md:w-8" />
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
                                    className="outline-none text-center rounded-lg bg-black bg-opacity-75"
                                />
                                <AiOutlinePlusCircle className="my-auto md:h-8 md:w-8" />
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="text-gray-300">{totalPrice}</div>

                <button
                    onClick={handleFormSubmit}
                    type="button"
                    className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br shadow-orange-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                    Make Payment
                </button>
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
        `}
            </style>
        </>
    );
};

export default BookingPage;
