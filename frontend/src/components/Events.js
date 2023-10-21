import React from 'react'
import Navbar from './Navbar'
import OffCanvasNavbar from './OffCanvasNavbar'
import Card from './Card'
import { AiOutlineSearch } from 'react-icons/ai'

/*
    Available events:
        Cricket
        Football
        Wrestling
        Badminton
        Basketball
*/

export default function Events() {
    return (
        <>
            <div className='bg-gradient-to-r from-slate-950 to-slate-700 '>
                <OffCanvasNavbar />
                <Navbar />

                <div className='border-0 ml-[50%] flex mt-12'>
                    <input className='rounded-2xl bg-slate-50 h-12 pl-12 w-full mr-[25%]' type='text' placeholder='Search...' />
                    <AiOutlineSearch className='absolute mt-1 ml-2 h-8 w-8' />
                </div>

                <div className='mx-[10%] flex'>
                    <div className='border w-[25%] mt-12 text-center h-screen bg-orange-900 rounded-md'>
                        jij
                    </div>

                    <div className='ml-6 mt-12 grid grid-cols-3 w-[70%]'>
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>

            <style jsx>
                {
                    `
                        input:focus {
                            outline: none;
                            box-shadow: 0 0 0 5px rgba(251, 146, 60, 0.8);
                            transition: .3s;
                        }
                    `
                }
            </style>
        </>
    )
}
