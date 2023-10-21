import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {
    function displayMenu() {
        const menu = document.getElementById('menu');
        menu.classList.add("right-0");
        menu.classList.remove("-right-full");
    }
    return (
        <>
            <div className="bg-slate-600 flex justify-between px-[8%]">
                <div className="py-2   ml-5">
                    <Link  to='/dashboard'>
                        <img className="h-12 hover:opacity-75" src="images/logo.png" />
                    </Link>
                </div>

                <div className="py-2 flex justify-between w-1/3">
                    <div className="my-auto text-gray-300 hover:text-white text-2xl pl-8">
                        <Link to='/dashboard'>
                            Home
                        </Link>
                    </div>
                    <div className="my-auto text-gray-300 hover:text-white text-2xl">
                        <Link to='/events'>
                            Events
                        </Link>
                    </div>
                    <div className="my-auto text-gray-300 hover:text-white text-2xl">
                        <Link to='/about'>
                            About
                        </Link>
                    </div>
                    <div className="my-auto pr-8">
                        <button onClick={displayMenu}>
                            <img className="h-12 user" src="images/user.png" />
                        </button>
                    </div>
                </div>
            </div> 

            <style jsx>
                {
                    `
                        .user:hover {
                            border-radius: 9999px;
                            box-shadow: 0 0 0 5px rgba(251, 146, 60, 0.8);
                            transition: .3s;
                        }
                    `
                }
            </style>
        </>
    )
}