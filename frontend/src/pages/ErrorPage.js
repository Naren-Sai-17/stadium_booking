import React from 'react';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="mt-8 text-2xl font-bold">Oops! Something went wrong.</h1>
            <p className="mt-4 text-gray-700">
                This page does not exist
            </p>
        </div>
    );
};

export default ErrorPage;

