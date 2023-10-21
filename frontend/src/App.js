import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Login from './components/Login';
import Events from './components/Events';
import BookingPage from './components/BookingPage';
import ProfilePage from './components/Profile';

export default function App() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <Router scrollBehavior="auto">
			<Routes>
                <Route path='/' element={<Home />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/events' element={<Events />} />
                <Route path='/event1' element={<BookingPage />} />    
                <Route path='/profile' element={<ProfilePage />} />
			</Routes>
        </Router>
    )
}