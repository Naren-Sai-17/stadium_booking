import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import OffCanvasNavbar from "../components/OffCanvasNavbar";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import EventContext from "../context/EventContext";
import { MdArrowBackIos } from "react-icons/md";
import AuthContext from "../context/AuthContext";
import { TbUrgent } from "react-icons/tb";

const BookingPage = () => {
const { event_id } = useParams();
const authcontextData = useContext(AuthContext);
const contextData = useContext(EventContext);
let { setEventdata } = useContext(EventContext);
const Navigate = useNavigate();


//  --------------------- for Dropdown Food-addon ----------------
const foodClick = () => {
    const foodMenu = document.querySelector("#food-menu");
    const btn = document.querySelector("#food-btn")
    if (foodMenu.classList.contains('hidden')) {
        foodMenu.classList.remove('hidden');
        btn.classList.remove('rounded-lg')
        btn.classList.add('rounded-t-lg')
        
      } else {
        foodMenu.classList.add('hidden');
        btn.classList.remove('rounded-t-lg')
        btn.classList.add('rounded-lg')
      }
  };


// ------------- For input fields -----------------
const [date, setDate] = useState("");
const [event, setEvent] = useState({
    event_id: 0,
    event_name: "",
    date_time: "",
    event_description: "",
    stadium: {
    stadium_id: 0,
    stadium_name: "",
    fooditem_set: [],
    location: "",
    coordinates: "",
    city: "",
    },
    prices: [],
});
const [selectedSeats, setSelectedSeats] = useState(0);
const category = {
    VIP: "bg-purple-800",
    Premium: "bg-orange-600",
    General: "bg-green-800",
};

const months = [
    "Month",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

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
        Navigate("/events");
        });
    } else {
    setEvent(contextData.event_data);
    }

    if (!authcontextData.user) {
    toast("Please login to book tickets.");
    Navigate("/login", { state: { next_url: `/event/${event_id}/book` } });
    }
}, []);

useEffect(() => {
    // ------------------- Process date -------------------
    let human_readable = new Date(event.date_time);
    let minutes = human_readable.getUTCMinutes();
    if (minutes == "0") {
    minutes += "0";
    }
    setDate(
    human_readable.getUTCHours() +
        ":" +
        minutes +
        ", " +
        human_readable.getDate() +
        " " +
        months[human_readable.getMonth()]
    );

    document.title = event.event_name + " - Sports League";
}, [event]);

// ------------------- Tickets logic -------------------
const [quantities, setQuantities] = useState({});
const [totalPrice, setTotalPrice] = useState(0);

const handleQuantityChange = (sector_id, quantity) => {
    setQuantities((prevQuantities) => {
    const updatedQuantities = { ...prevQuantities };
    updatedQuantities[sector_id] = quantity; 
    if(quantity == 0) delete updatedQuantities.sector_id
    return updatedQuantities;
    });
};

// ------------------- Food logic ---------------------
const [foodQuantities, setFoodQuantities] = useState({});

const handleFoodQuantityChange = (food_id, quantity) => {
    setFoodQuantities((prevQuantities) => {
    const updatedQuantities = { ...prevQuantities };
    updatedQuantities[food_id] = quantity; 
    if(quantity == 0) delete updatedQuantities.food_id
    return updatedQuantities;
    });
};

// ------------------- Get total price -------------------

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
    for (const food_id in foodQuantities) {
        const quantity = foodQuantities[food_id]; 
        const food_item = event.stadium.fooditem_set.find((food_item) => food_item.food_id == food_id); 
        if(food_item) {
            totalCost += food_item.food_price*quantity; 
        }
    }
    setTotalPrice(totalCost);
}, [quantities, foodQuantities]);

// ------------------- Make payment -------------------
const handleFormSubmit = () => {
    if (Object.keys(quantities).length === 0) {
    toast.error("You need to select something.");
    } else {
    axios
        .post(`/api/buy/`, {
        user_id: authcontextData.user.id,
        event_id: event_id,
        seats: quantities,
        food: foodQuantities
        })
        .then(function (response) {
        if (response.data.status === "success") {
            Navigate("/orders");
            toast.success("Order placed successfully.");
        } else {
            toast.error(
            "Not enough seats. Please change the number of seats and try again."
            );
        }
        })
        .catch(function (error) {
        console.error(error);
        toast.error("Error communicating with the database.");
        });
    }
};

return (
    <>
    <div className="bg-gradient-to-r from-slate-950 to-slate-800">
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

        <strong className="flex justify-center mt-[5%] md:mt-[3%] md:text-2xl text-orange-300">
        🕑{date}
        </strong>

        <div className="text-white flex justify-center mt-[1%] text-xs mb-[3%] md:text-xl">
        You can book up to
        <span className="md:px-2 px-1 font-bold text-orange-400">10</span>
        tickets.
        </div>

        {/* Display seats */}
        <ul className="md:w-[40%] text-xs  md:text-md w-[80%] mx-auto text-gray-100">
        {event.prices.map((sector) => (
            <li 
            key={sector.sector_id}
            className={`${
                category[sector.sector_name] ?? "bg-blue-800"
            } bg-opacity-90 py-[3%] px-[5%] flex mt-[3%] rounded-md justify-between md:text-xl `}
            >
            <strong className="border-0 flex flex-col justify-center">
                {sector.sector_name} {`(₹ ` + sector.event_price + `)`}
            </strong>

                        <div className="custom-number-input border-0 flex flex-col justify-center md:h-12 md:w-32 h-7 w-16">
                            <div className="flex flex-row h-[80%] w-full rounded-lg relative bg-transparent">
                            {/* Minus button */}
                            <button
                                id={`minus-${sector.sector_id}`}
                                className="minus bg-red-300 border border-red-400 text-red-700 hover:bg-red-400 h-full w-20 rounded-l cursor-pointer outline-none disabled:opacity-40 disabled:hover:cursor-not-allowed"
                                onClick={(e) => {
                                handleQuantityChange(
                                    sector.sector_id,
                                    Number(quantities[sector.sector_id] ?? 0) - 1
                                );
                                setSelectedSeats(selectedSeats - 1);
                                }}
                                disabled={(quantities[sector.sector_id] ?? 0) === 0}
                            >
                                <span className="m-auto md:text-2xl text-sm font-thin">
                                {" "}
                                -{" "}
                                </span>
                            </button>

                            <input
                                id={sector.sector_id}
                                type="number"
                                className="outline-none focus:outline-none text-center w-[75%] bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                                name="custom-input-number"
                                value={quantities[sector.sector_id] ?? 0}
                                disabled
                            ></input>

                            {/* Plus button */}
                            <button
                                id={`plus-${sector.sector_id}`}
                                className="plus bg-green-400 border border-green-500 text-green-700 hover:bg-green-500 h-full w-20 rounded-r cursor-pointer disabled:opacity-40 disabled:hover:cursor-not-allowed"
                                onClick={(e) => {
                                handleQuantityChange(
                                    sector.sector_id,
                                    1 + Number(quantities[sector.sector_id] ?? 0)
                                );
                                setSelectedSeats(selectedSeats + 1);
                                }}
                                disabled={
                                selectedSeats === 10 ||
                                (quantities[sector.sector_id] ?? 0) ==
                                    sector.remaining_seats
                                }
                            >
                                <span className="m-auto text-sm md:text-2xl font-thin">
                                {" "}
                                +{" "}
                                </span>
                            </button>
                            </div>
                        </div>
                        </li>
                    ))}
                    </ul>

                    {/* Display food items */}
                    <div className="text-white w-[40%] pt-5 mx-auto " onClick={foodClick}><button id="food-btn" className="p-2 rounded-lg bg-slate-800"><strong>Food Add-ons ▼</strong></button></div>
                    <div className="transition duration-150 ease-in-out origin-top hidden " id="food-menu">
                        <ul className="md:w-[40%] bg-slate-800  text-xs p-2 rounded-r-lg rounded-b-lg  md:text-md w-[80%] mx-auto pt-2  text-gray-100">
                        {event.stadium.fooditem_set.map((food_item) => (
                            <li key = {food_item.food_id} className="rounded-lg mt-2 bg-gradient-to-r from-slate-800 to-slate-950">
                                <div className="flex">
                                <img src="https://cdn.britannica.com/07/183407-050-C35648B5/Chicken.jpg" className="w-24 flex h-24 border rounded-lg"></img>
                                <div className="pl-2">
                                    {food_item.food_name} 
                                    <strong className="border-0 flex flex-col justify-center">
                                    {food_item.food_name} {`(₹ ` + food_item.food_price + `)`}
                                    </strong>
                                    
                            
                                    <div className=" align-bottom custom-number-input border-0 flex flex-col justify-center md:h-12 md:w-32 h-7 w-16">
                                <div className="flex flex-row h-[80%] w-full rounded-lg relative bg-transparent">
                                {/* Minus button */}
                                <button
                                    id={`minus-${food_item.food_id}`}
                                    className="minus bg-red-300 border border-red-400 text-red-700 hover:bg-red-400 h-full w-20 rounded-l cursor-pointer outline-none disabled:opacity-40 disabled:hover:cursor-not-allowed"
                                    onClick={(e) => {
                                    handleFoodQuantityChange(
                                        food_item.food_id,
                                        Number(foodQuantities[food_item.food_id] ?? 0) - 1
                                    );
                                    }}
                                    disabled={(foodQuantities[food_item.food_id] ?? 0) === 0}
                                >
                                    <span className="m-auto md:text-2xl text-sm font-thin">
                                    {" "}
                                    -{" "}
                                    </span>
                                </button>

                                <input
                                    id={food_item.food_id}
                                    type="number"
                                    className="outline-none focus:outline-none text-center w-[75%] bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                                    name="custom-input-number"
                                    value={foodQuantities[food_item.food_id] ?? 0}
                                    disabled
                                ></input>

                                {/* Plus button */}
                                <button
                                    id={`plus-${food_item.food_id}`}
                                    className="plus bg-green-400 border border-green-500 text-green-700 hover:bg-green-500 h-full w-20 rounded-r cursor-pointer disabled:opacity-40 disabled:hover:cursor-not-allowed"
                                    onClick={(e) => {
                                    handleFoodQuantityChange(
                                        food_item.food_id,
                                        1 + Number(foodQuantities[food_item.food_id] ?? 0)
                                    );
                                    }}
                                >
                                    <span className="m-auto text-sm md:text-2xl font-thin">
                                    {" "}
                                    +{" "}
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

        <section className="md:flex mt-[10%] md:mt-0 justify-center">
        <div className="text-white flex my-[5%] md:w-[60%] justify-center">
            <div className="my-auto text-sm md:text-2xl md:pl-[3%] pl-[8%] w-[50%] font-bold">
            Total:{" "}
            <span className="rounded-md p-[3%] bg-slate-700">
                ₹ {totalPrice}{" "}
            </span>
            </div>

            <div className="w-[50%] flex justify-center pr-[5%] md:pr-0">
            <button
                onClick={handleFormSubmit}
                type="button"
                className="text-white text-xs md:text-xl focus:outline-1 focus:outline-rose-500 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br shadow-orange-500/50 dark:shadow-lg font-medium rounded-lg px-5 py-2.5 text-center"
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

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
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
