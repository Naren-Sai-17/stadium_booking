import React from 'react'
import Navbar from './Navbar'
import OffCanvasNavbar from './OffCanvasNavbar'

export default function About() {
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
