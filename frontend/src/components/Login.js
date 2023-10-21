import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <>
            <div className="bg-slate-600 md:h-screen flex flex-cols justify-center">
                <div className="my-auto px-[5%] md:px-[10%]">

                    <div className="bg-black m-auto  text-white rounded-lg md:flex  shadow-2xl">

                        <div className=" md:w-[50%]  h-full  bg-gradient-to-r from-slate-950 to-slate-800 rounded-l-lg p-10">
                            <div className="text-center">
                                <img
                                    className="mx-auto h-32"
                                    src='images/logo.png'
                                    alt="logo" />
                                <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                    Login to Stadium Ticketing Platform
                                </h4>
                                <h2 className="text-xl">Enter your credentials:</h2>
                                <div className="flex flex-col items-center gap-3 pt-5">
                                    <input className="w-3/4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                                    <input className="w-3/4 shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                                </div>
                            </div>
                            <div className="text-center pt-4 pb-5 ">
                                <Link to="/dashboard">
                                    <button onClick={()=>{
                                        
                                    }} className="rounded h-10 w-3/4 btn1" >
                                        Submit
                                    </button>
                                    </Link>
                                

                                <p className=" text-sm pt-2 pb-2">or</p>
                                <div className="flex  justify-evenly items-center">
                                    <button className=" flex items-center justify-evenly bg-white border border-gray-300 rounded-lg shadow-md py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-3/4">
                                        <div className="flex">
                                            <svg
                                                className="h-6 w-6 mr-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="800px"
                                                height="800px"
                                                viewBox="-0.5 0 48 48"
                                                version="1.1"
                                            >
                                                <title>Google-color</title>
                                                <desc>Created with Sketch.</desc>
                                                <defs></defs>
                                                <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                                        <g id="Google" transform="translate(401.000000, 860.000000)">
                                                            <path
                                                                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                                id="Fill-1"
                                                                fill="#FBBC05"
                                                            ></path>
                                                            <path
                                                                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                                id="Fill-2"
                                                                fill="#EB4335"
                                                            ></path>
                                                            <path
                                                                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                                id="Fill-3"
                                                                fill="#34A853"
                                                            ></path>
                                                            <path
                                                                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                                id="Fill-4"
                                                                fill="#4285F4"
                                                            ></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span>Continue with Google</span>
                                        </div>
                                    </button>
                                </div>

                            </div>


                        </div>

                        <div className=" md:w-[50%] flex items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 rounded-r-lg">
                            <div className="my-auto">
                                <h1 className="text-2xl">
                                    {`[Name of the platform]`}
                                </h1>
                                <p className="text-md">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore maxime sapiente magni id facilis   quas sequi. Ea iste, repellat nisi voluptate velit, fugit amet, tempora vitae tempore maiores     corrupti odio aliquid facilis ipsum accusamus placeat? Consequatur iusto illo non nobis libero  eaque ipsa. Dolore, nemo. Assumenda quasi nisi eligendi possimus.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <style jsx>
                {
                    `
                        .btn1 {
                            background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
                        }
                    `
                }
            </style>
        </>
    );
}
