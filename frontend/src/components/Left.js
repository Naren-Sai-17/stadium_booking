import React from 'react'

export default function Left({ imagePath, caption }) {
    return (
        <>
            <div className="h-screen flex justify-end">
                <div className="w-1/2 overflow-clip h-full flex flex-col justify-center items-center">
                    <img src={ imagePath } className="img w-3/4" alt="" />
                </div>
                <div className="textbox w-1/2 flex items-center justify-center text-orange-400 font-semibold text-3xl">
                    { caption }
                </div>
            </div>
        </>
    )
}
