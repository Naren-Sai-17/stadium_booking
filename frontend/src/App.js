import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Login from './pages/Login';
import Events from './pages/Events';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/Profile';
import PaymentPage from './pages/PaymentPage';
import SignupPage from './pages/Signup';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext'

export default function App() {
    return (
      <Router scrollBehavior="auto">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path='/event/:event_id' element={<BookingPage />} />
            <Route path='/event/:event_id/book' element={<PaymentPage />} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AuthProvider>
      </Router>
    );
}