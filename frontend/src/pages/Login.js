import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    let { loginUser } = useContext(AuthContext)

    useEffect(() => {
        document.title = "Login - Sports League"
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="bg-slate-600 md:h-screen flex flex-cols justify-center">
                <div className="my-auto px-[5%] md:px-[10%]">

                    <div className="bg-black m-auto  text-white rounded-lg md:flex  shadow-2xl">

                        <div className=" md:w-[50%]  h-full  bg-gradient-to-r from-slate-950 to-slate-800 rounded-l-lg p-10">
                            <form onSubmit={ loginUser }>
                                <div className="text-center">
                                    <img
                                        className="mx-auto md:h-32 h-[10%]"
                                        src='images/logo.png'
                                        alt="logo" />

                                    <h4 className="mb-[6%] mt-1 pb-1 text-xl font-semibold">
                                        Login to Sports League
                                    </h4>

                                    <h2 className="text-xl">Enter your credentials:</h2>
                                    <div className="flex flex-col items-center gap-3 pt-5">
                                        <input className="w-3/4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                                        <input className="w-3/4 shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="text-center pt-4 pb-5 ">

                                    <button className="rounded h-10 w-3/4 btn1" >
                                        Continue
                                    </button>
                                    <Link to="/dashboard">
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

                            </form>

                            <p className="text-center text-sm my-[2%] pb-2">
                                <span className='px-[0.5rem] text-blue-500 hover:text-blue-300 hover:underline'>
                                    <Link to='/signup'>
                                        Sign Up
                                    </Link>
                                </span>
                                instead?
                            </p>
                        </div>

                        <div className=" md:w-[50%] flex items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 rounded-r-lg">
                            <div className="my-auto">
                                <strong className="text-2xl pb-[10%] flex justify-center">
                                    <span>Join to secure your spot and score your seat!</span>
                                </strong>
                                <div className='border-0 svg-container px-[5%] flex justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 731.67 633.32" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <path d="m0,631.95c0,.66.53,1.19,1.19,1.19h729.29c.66,0,1.19-.53,1.19-1.19s-.53-1.19-1.19-1.19H1.19c-.66,0-1.19.53-1.19,1.19Z" fill="#3f3d56" />
                                        <polygon points="443.53 140.65 447.53 163.65 404.53 170.65 414.53 138.65 443.53 140.65" fill="#a0616a" />
                                        <path d="m553.2,155.86c8.66,3.88,10.74,18.07,4.63,31.68-2.36,5.47-6.01,10.3-10.62,14.08l-8.73,23.3c-5.73,27.78-18.76,57.03-36.72,54.76-25.41-3.21-33.42-34.09-33.42-34.09l34.2-13.38,15.27-29.43,5.2-12.01c-.25-5.96.93-11.89,3.45-17.29,6.1-13.62,18.07-21.5,26.74-17.62h0Z" fill="#a0616a" />
                                        <path d="m262.11,602.83l-23.71-17.53.19-.38,132.11-263.23.25-.04,106.38-18.06,22.16,49.35,57.94,81.47c3.99,5.61,6.08,12.22,6.03,19.11l-.94,145.12-35.95,1.03-.05-.46-12.54-117.33c-.91-8.55-5.35-16.46-12.17-21.7l-70.72-54.33-168.99,196.99h0Z" fill="#2f2e41" />
                                        <path d="m242.03,587.15s-12,2-16,9-16,22-16,22c0,0-9,17,12,15s29-11,29-11l9-25-18-10h0Z" fill="#2f2e41" />
                                        <path d="m545.03,587.15s12,2,16,9,16,22,16,22c0,0,9,17-12,15s-29-11-29-11l-9-25,18-10Z" fill="#2f2e41" />
                                        <polygon points="384.53 169.65 455.53 155.65 495.53 168.65 484.53 317.65 371.03 322.15 384.53 169.65" fill="#fb9153" />
                                        <polygon points="488.41 165.32 503.87 188.68 507.46 246.27 461.53 249.76 462.77 175.14 488.41 165.32" fill="#fb9153" />
                                        <polygon points="530.91 221.37 512.33 213.99 488.7 257.76 510.28 268.52 530.91 221.37" fill="#a0616a" />
                                        <path d="m543.87,184.12c-1.29,0-2.58-.22-3.82-.66-2.98-1.06-5.39-3.34-6.63-6.25l-14.1-33.12c-5.31-12.48-11.41-24.77-18.13-36.54l-2.94-5.16c-2.03-3.12-50-76.94-52.28-82.71-1.72-4.35,3.42-13.26,3.64-13.64l.06-.08c.11-.13,11.62-12.67,25.47-1.02,13.6,11.43,36.48,87.19,37.45,90.41l.62,1.56c5.64,14.26,12.78,27.99,21.21,40.8l18.95,28.8c1.76,2.68,2.31,6,1.51,9.1-.8,3.1-2.89,5.73-5.74,7.22-1.64.86-3.45,1.29-5.27,1.29h0Z" fill="#3f3d56" />
                                        <path d="m417.43,194.66l22.33,1.25,42.89-45.25,16.76-19.92c1.47-5.78,4.3-11.12,8.25-15.58,9.75-11.3,23.47-15.43,30.66-9.23,7.19,6.2,5.12,20.38-4.63,31.68-3.83,4.57-8.71,8.15-14.21,10.45l-4.13,5.45-47.34,66.54c-8.54,12.01-23.64,17.44-37.88,13.62l-28.97-7.77,16.27-31.25Z" fill="#a0616a" />
                                        <path d="m404.9,239.25l-34.45-22.13c-10.95-7.03-15.16-20.81-10.01-32.76,3.13-7.26,9.27-12.7,16.85-14.92,7.57-2.23,15.69-.98,22.25,3.44l33.83,22.77-28.47,43.6Z" fill="#fb9153" />
                                        <g><circle cx="421.55" cy="113.81" r="35.3" fill="#a0616a" />
                                            <path d="m444.77,144.28l-3.05-5.08s13.35-9,2.32-14.22c-11.03-5.22-12.77-17.99-12.77-17.99,0,0-32.22-9.28-30.48-16.25,1.74-6.97-3.19-11.9,4.93-14.8,8.13-2.9,44.4,0,48.47,8.41,4.06,8.42,8.13,31.63,6.1,34.83s-15.52,25.11-15.52,25.11Z" fill="#2f2e41" />
                                            <path d="m435.62,104.37l-32.8-21.76s-42.37-13.05-26.41,11.9l13.5,2.76s36.71,8.56,45.71,7.1h0Z" fill="#fb9153" />
                                            <path d="m425.75,99.44l34.25,25.83s20.02-35.7-11.33-53.4c-31.35-17.7-51.22,10.02-51.22,10.02l8.27,8.85s20.03,8.7,20.03,8.7Z" fill="#fb9153" />
                                        </g>
                                        <path d="m179.66,41.15c0,10.78,8.74,19.53,19.53,19.53,5.28,0,10.07-2.1,13.58-5.51,3.67-3.55,5.94-8.52,5.94-14.02,0-10.78-8.74-19.53-19.52-19.53-3.38,0-6.55.86-9.32,2.36-.47.26-.93.54-1.38.84-4.22,2.76-7.29,7.11-8.38,12.2-.14.58-.24,1.17-.3,1.77-.1.77-.15,1.56-.15,2.36Z" fill="#fb9153" />
                                        <path d="m179.81,38.79c.31.34.63.71.98,1.13,1.18,1.42,1.65,2.19,2.31,3.26.57.93,1.29,2.09,2.7,4.05,2.91,4.04,4.37,6.07,6.64,7.91,2.24,1.81,5.03,4.07,9.22,4.36.29.02.58.02.86.02,5.07,0,8.77-3.05,10.18-4.42,3.69-3.6,4.46-7.97,4.62-9.68.13-1.38.31-6.22-2.86-10.57-2.8-3.84-6.67-5.21-10.42-6.55-2.45-.87-4.31-1.18-5.96-1.46-2.26-.38-4.2-.71-7.17-2.27-.41-.22-.75-.41-1.04-.59-.47.26-.93.54-1.38.84.07.04.15.09.23.14.39.23.87.51,1.53.86,3.17,1.67,5.32,2.04,7.59,2.42,1.67.28,3.4.57,5.73,1.4,3.7,1.32,7.2,2.56,9.74,6.05,2.88,3.95,2.71,8.34,2.6,9.59-.15,1.56-.85,5.53-4.2,8.8-1.35,1.31-5.01,4.34-9.95,4-3.75-.26-6.34-2.36-8.43-4.04-2.12-1.72-3.54-3.7-6.37-7.63-1.39-1.93-2.09-3.07-2.65-3.98-.66-1.07-1.18-1.92-2.42-3.41-.67-.81-1.26-1.46-1.78-2-.14.58-.24,1.17-.3,1.77,0,0,0,0,0,0Z" fill="#e6e6e6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <style jsx="true">
                {
                    `
                        .btn1 {
                            background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
                        }

                        .svg-container {
                            width: 100vw;
                        }

                        @media screen and (min-width: 768px) {
                            .svg-container {
                                width: 25vw;
                            }
                        }   
                    `
                }
            </style>
        </>
    )
}

export default LoginPage
