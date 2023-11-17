import axios from 'axios';
import React, { useContext,  useState } from 'react'
import toast from 'react-hot-toast';
import useRazorpay from "react-razorpay";
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const RazorpayButton = (props) => {
    const authcontextData = useContext(AuthContext);
    const [paymentData, setPaymentData] = useState({}) 
    const [Razorpay] = useRazorpay();
    const navigate = useNavigate();

    const handlePaymentSuccess = async  (response) => {
        console.log("here")
        axios
            .post(`/api/confirm/`, {
            event_id: props.orderData.event_id,
            seats: props.orderData.quantities,
            food: props.orderData.foodQuantities
            },{
                headers: {
                    'Authorization': `Bearer ${authcontextData.authTokens.access}`
                }
            })
            navigate("/orders");
            // history.push('/orders');
            toast.success("Order placed successfully.");
    }
    const handleFormSubmit = () => {
        if (Object.keys(props.orderData.quantities).length === 0) {
            toast.error("You need to select something.");
        } else {
        axios
            .post(`/api/buy/`, {
            event_id: props.orderData.event_id,
            seats: props.orderData.quantities,
            food: props.orderData.foodQuantities
            },{
                headers: {
                    'Authorization': `Bearer ${authcontextData.authTokens.access}`
                }
            })
            .then(function (response) {
                var options = {
                    "key": "rzp_test_iVdpfYzSydqANx", 
                    "amount": "50000",
                    "currency": "INR",
                    "name": "Acme Corp", 
                    "order_id": response.data.id, 
                    "handler": handlePaymentSuccess,
                    "prefill": { 
                        "name": "Gaurav Kumar", 
                        "email": "gaurav.kumar@example.com",
                        "contact": "9000090000" 
                    },
                    "notes": {
                        "address": "Razorpay Corporate Office"
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                var rzp1 = new Razorpay(options);
                rzp1.open();
            })
            .catch(function (error) {
            console.error(error);
            toast.error("Error communicating with the database.");
            });
        }
    };
    
    return (
        
        <button type="button" className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br shadow-orange-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handleFormSubmit}>
            Book tickets
        </button>
    )
}   

export default RazorpayButton