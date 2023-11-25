import React, { useEffect } from 'react';

const ErrorPage = () => {
    useEffect(() => {
        document.title = 'Not Found - Sports League';
    }, [])
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-slate-950 to-slate-800">
            <h1 className="mt-8 text-white text-2xl font-bold">Oops! Something went wrong.</h1>
            <p className="mt-4 text-gray-500 text-center">
                This page does not exist. <br />
                You may get back to the dashboard <a href='/dashboard' className='inline text-sky-600 hover:underline hover:text-sky-400'>here.</a>
            </p>
        </div>
    );
};

export default ErrorPage;

