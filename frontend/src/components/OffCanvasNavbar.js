import React from 'react'
import { Link } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import { AiOutlineStar, AiOutlineShoppingCart } from 'react-icons/ai';

export default function OffCanvasNavbar() {
    function closeMenu() {
        const menu = document.getElementById('menu');
        menu.classList.remove("right-0");
        menu.classList.add("-right-full");
    }
    return (
        <>
            <div id='menu' className=' z-20 bg-slate-800 fixed sm:w-1/4 w-screen justify-around sm:h-screen -right-full Transition'>
                <section>
                    <button className='md:w-12 w-10 pt-2 pl-2' id="close-button" onClick={closeMenu}>
                        <img src="/images/close.png" alt='close button'/>
                    </button>
                </section>

                <div className='px-8 py-2 lg:text-xl'>
                    <span className='text-white lg:text-2xl mt-2'>
                        Hi, user
                    </span>

                    <Link to='/profile'>
                        <div className='grid grid-cols-3 border-0 py-2 mt-8 md:mt-14 px-2 mx-[10%] sm:mx-0 btn
                        bg-slate-300 rounded-md hover:bg-slate-100'>
                            <FiUser className='h-6 w-6 lg:h-10 lg:w-10 icon' />
                            <div className='flex justify-center my-auto hover:border-orange-400' >Profile</div>
                        </div>
                    </Link>

                    <Link to='/orders'>
                        <div className='grid grid-cols-3 py-2 mt-6 text-center px-2 mx-[10%] sm:mx-0 btn
                        bg-slate-300 rounded-md hover:bg-slate-100'>
                            <AiOutlineShoppingCart className='h-6 w-6 lg:h-10 lg:w-10 icon' />
                            <div className='flex my-auto col-span-2' >Your Orders</div>
                        </div>
                    </Link>

                    <Link to='/favorites'>
                        <div className='grid grid-cols-3 py-2 my-6 text-center px-2 mx-[10%] sm:mx-0 btn
                        bg-slate-300 rounded-md hover:bg-slate-100'>
                            <AiOutlineStar className='h-6 w-6 lg:h-10 lg:w-10 icon' />
                            <div className='flex border-0 justify-center my-auto' >Favorites</div>
                        </div>
                    </Link>
                </div>
            </div>

            <style jsx="true">
                {
                    `
                        .Transition {
                            transition-property: all;
                            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                            transition-duration: 650ms;
                        }

                        .icon {
                            color: rgb(2, 66, 150);
                        }

                        .btn:hover {
                            box-shadow: 0 0 0 5px rgb(251 146 60);
                            transition: .3s;
                        }

                        @media screen and (max-width: 320px)
                        #menu {
                            width: 100vw;
                        }
                    `
                }
            </style>
        </>
    )
}
