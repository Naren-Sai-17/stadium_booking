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
            <div className="bg-blue-900 sticky top-0 z-10 flex justify-between px-[8%]">
                <div className="py-2 md:ml-5 items-center">
                    <Link  to='/dashboard'>
                        <img className="logo hover:opacity-75 hover:p-[1%] Transition-logo" src="/images/logo.png" />
                    </Link>
                </div>

                <div className="py-2 flex justify-between md:w-1/3 lg:text-xl">
                    <div className="my-auto text-gray-300 hover:text-white hover:font-semibold Transition-logo hidden md:block">
                        <Link to='/dashboard'>
                            Home
                        </Link>
                    </div>
                    <div className="my-auto text-gray-300 hover:text-white hover:font-semibold Transition-logo hidden md:block">
                        <Link to='/events'>
                            Events
                        </Link>
                    </div>
                    <div className="my-auto text-gray-300 hover:text-white hover:font-semibold Transition-logo hidden md:block">
                        <Link to='/about'>
                            About
                        </Link>
                    </div>
                    <div className="my-auto md:pr-8">
                        <button onClick={displayMenu}>
                            <img className="md:h-12 md:w-12 h-10 w-10 user" src="/images/user.png" />
                        </button>
                    </div>
                </div>
            </div> 

            <style jsx="true">
                {
                    `
                        .user:hover {
                            border-radius: 9999px;
                            box-shadow: 0 0 0 5px rgba(251, 146, 60, 0.8);
                            transition: .3s;
                        }

                        .Transition-logo {
                            transition-property: all;
                            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                            transition-duration: 200ms;
                        }

                        .logo {
                            height: 8vh;
                        }
                    `
                }
            </style>
        </>
    )
}