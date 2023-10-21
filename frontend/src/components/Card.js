import React from 'react'
import { Link } from 'react-router-dom'

export default function Card(){
    return(
        <div className='card border-0 p-[10%]'>
            <a href="/event1">
                <img className = "flex justify-center rounded-3xl" src = 'images/card.jpg'/>
            </a>
        </div>
    )
}