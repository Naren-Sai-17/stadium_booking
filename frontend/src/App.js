import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Login from './pages/Login';
import Events from './pages/Events';
import BookingPage from './pages/BookingPage';
import EventPage from './pages/EventPage';
import ProfilePage from './pages/Profile';
import PaymentPage from './pages/PaymentPage';
import SignupPage from './pages/Signup';
import { AuthProvider } from './context/AuthContext'
import { EventProvider } from './context/EventContext'
import { Toaster } from 'react-hot-toast'
import ErrorPage from './pages/ErrorPage';
import OrderPage from './pages/OrderPage';

export default function App() {
    return (
        <>
            <div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        // Default options
                        className: '',
                        duration: 3000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                            fontFamily: 'Verdana, Poppins, Geneva, Tahoma, sans-serif',
                            whiteSpace: 'nowrap',
                        },

                        // Default options for specific types
                        success: {
                            duration: 3000,
                            theme: {
                                primary: 'green',
                                secondary: 'black',
                            },
                        },

                        error: {
                            duration: 3000,
                            theme: {
                                primary: 'red',
                                secondary: 'black',
                            }
                        },
                    }}
                />
            </div>
    <Router scrollBehavior="auto">
        <EventProvider>
        <AuthProvider>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path='/event/:event_id' element={<EventPage />} />
            <Route path='/event/:event_id/book' element={<BookingPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
        </AuthProvider>
        </EventProvider>
    </Router>
    </>
    );
}