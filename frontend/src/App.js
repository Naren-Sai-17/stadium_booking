import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Login from './components/Login';
import Events from './components/Events';
import BookingPage from './components/BookingPage';
import ProfilePage from './components/Profile';
import PaymentPage from './components/PaymentPage';
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
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AuthProvider>
      </Router>
    );
}