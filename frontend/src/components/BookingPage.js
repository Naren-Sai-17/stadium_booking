import React from 'react'
import OffCanvasNavbar from './OffCanvasNavbar'
import Navbar from './Navbar'

export default function BookingPage() {
    return (
        <>
            <div className='w-full bg-gradient-to-r from-slate-950 to-slate-700'>
                <OffCanvasNavbar />
                <Navbar />
                <div className="flex justify-items-start h-80 mx-[10%] my-[5%]">
                    <div className="w-1/4 flex items-center justify-center">
                        <img width="90%" src="images/card.jpg" className="border-white border" />
                    </div>
                    <div className="w-full flex flex-col justify-around px-5 border rounded-lg border-dashed">
                        <div className="text-orange-500 text-3xl font-bold text-center">
                            Regional Cup Finals
                        </div>
                        <div className="text-base border-0 text-white">
                            Description: <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, tempora nam accusamus esse cupiditate nostrum? Commodi sequi tempore iure necessitatibus iste qui? Repellendus voluptatibus asperiores sapiente repudiandae aspernatur? Blanditiis, enim!
                        </div>
                        <div className="text-center border-0 flex justify-around text-white">
                            <div>Date: </div>
                            <div>Time: </div>
                            <div>Venue: </div>
                        </div>
                        <div className="text-center text-lg border-0 text-white">
                            Book your tickets now!
                        </div>
                    </div>
                </div>

                <div className="m-10 text-center">
                    <button type="button" className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br shadow-orange-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Book tickets
                    </button>
                </div>


                <div className="m-10 text-center text-lg text-white">
                    Map
                    <div className="w-full flex justify-center pt-5">
                        <iframe className="w-1/2" width="60%" height="300px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population mapping</a></iframe>
                    </div>
                </div>

                <div className="text-center text-lg text-white mx-[10%]">
                    Other events near you
                    <div className="h-64 border rounded-sm border-dashed pt-5">

                    </div>
                </div>

                <footer className="bg-slate-800 text-white text-center py-10">
                    Contact us <br />
                    a | a | a | a
                </footer>
            </div>
        </>
    )
}
