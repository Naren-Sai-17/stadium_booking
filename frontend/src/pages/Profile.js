import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import OffCanvasNavbar from '../components/OffCanvasNavbar';

export default function ProfilePage() {
    const [p, setP] = useState('');
    const [c, setC] = useState('');
    useEffect(()=>{
    
        if(p===c){
            document.querySelector("#diff_passwords").classList.add('opacity-0')
        }
        else{
            document.querySelector("#diff_passwords").classList.remove('opacity-0')
        }
    },[p,c])
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = "Your Profile - Sports League"
    }, [])
    return (
        <>  
        <OffCanvasNavbar />
        <Navbar />

        <div className="w-full bg-gradient-to-r from-slate-950 to-slate-700">
            <div className="flex justify-center">
                <div className=" md:w-1/2 flex flex-col gap-5  justify-items-start m-10 ">
                    <div className=" w-full flex items-center justify-center">
                        <img
                            width="50%"
                            src="https://brandmentions.com/wiki/images/9/9f/Gennady_Korotkevich.jpg"
                            className="border-white border rounded-xl"
                        />
                    </div>
                    <div className="text-white bg-gradient-to-r from-slate-950 to-slate-700 w-full flex flex-col justify-around px-4 pt-4 pb-4  gap-2 rounded-lg  m-auto ">
                        <div className=" text-xl">Account Details</div>
                        <div className="grid grid-cols-2 grid-rows-2 md:w-[40%] gap-3">

                            <div className="">Email Address </div>
                            <div className="">[user.email]</div>

                            <div className="">Mobile Number </div>
                            <div className="">[user.mobile_no]</div>

                        </div>
                    </div>

                    <div className="text-white bg-gradient-to-r from-slate-800 to-slate-950  w-full flex flex-col justify-around px-4 pt-4 pb-4  gap-3 rounded-lg  m-auto ">
                        <div className=" text-xl">User Details</div>
                        <div className=" grid grid-cols-2 grid-rows-4 gap-3 md:w-[40%]">
                            <div className="">First Name </div>
                            <div className="">[user.first_name]</div>
                            <div className="">Last Name </div>
                            <div className="">[user.last_name]</div>
                            <div className="">Date-of-birth </div>
                            <div className="">[user.dob]</div>
                            <div className="">Gender</div>
                            <div className=" pr-5">[user.gender]</div>
                        </div>
                    </div>

                    <div className="text-white bg-gradient-to-r from-slate-950 to-slate-700 w-full pt-4 flex flex-col justify-around px-4 pb-4  gap-3 rounded-lg  m-auto ">
                        <div className=" text-xl">Address</div>
                        <div className=" grid grid-cols-2 grid-rows-3 md:w-[40%] gap-3">

                            <div className="">Area Pincode</div>
                            <div className="">[user.pincode]</div>

                            <div className="">City</div>
                            <div className="">[user.city]</div>

                            <div className="">State</div>
                            <div className="">[user.state]</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" grid grid-cols-2 grid-rows-4 gap-3 md:w-[40%]">
                <p>Password:</p>
                <input required className="shadow appearance-none border rounded py-2 px-3 text-gray-700" id="password" placeholder='Old password' type="password"/>
                <p>New Password:</p>
                <input required className="shadow appearance-none border rounded py-2 px-3 text-gray-700" id="password" type="password" placeholder="New password" onChange={(e)=>setP(e.target.value)} />
                <p>Confirm Password:</p>
                <input required className="shadow appearance-none border  rounded py-2 px-3 text-gray-700 " id="confirmpassword" type="password" placeholder="Confirm Password"  onChange={(e)=>setC(e.target.value)} />
            </div>

            <div className="flex flex-col items-center gap-2 pt-5 text-white">
                <div className='flex gap-5 items-center'>
                    
                    
                </div>
                <div className='flex gap-5 items-center'>
                    
                </div>
                <div className='flex gap-5 items-center'>
                    
                </div>
                <p className="text-red-600 opacity-0" id="diff_passwords">passwords dont match</p>
            </div>
        </div>
        </>
    );
}