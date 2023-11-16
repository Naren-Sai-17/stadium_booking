import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import OffCanvasNavbar from '../components/OffCanvasNavbar'

export default function About() {
    useEffect(() => {
        document.title = "About Us - Sports League"
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <OffCanvasNavbar />
            <Navbar />
            <div>
                About text.
            </div>
        </>
    )
}
