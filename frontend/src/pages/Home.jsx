import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    return (
        <div className='h-screen flex flex-col bg-gradient-to-b from-white to-slate-100'>
            <header className='w-full flex justify-between items-center shadow-lg px-4 sm:px-14 py-6 bg-white sticky top-0 z-50'>
                <div className='text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight'>
                    PayTM App
                </div>
                <div className='flex justify-between items-center gap-4'>
                    <button
                        onClick={() => navigate("/signup")}
                        className='rounded-lg bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-700 py-2.5 font-semibold px-6 hover:cursor-pointer focus:outline-none transform hover:scale-105 transition duration-200 ease-in-out shadow-md'>
                        Signup
                    </button>
                    <button
                        onClick={() => navigate("/signin")}
                        className='rounded-lg bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-700 py-2.5 font-semibold px-6 hover:cursor-pointer focus:outline-none transform hover:scale-105 transition duration-200 ease-in-out shadow-md'>
                        Signin
                    </button>
                </div>
            </header>

            <main className='flex-grow bg-gradient-to-b from-slate-100 to-slate-200 flex flex-col justify-center items-center text-center px-6 sm:px-8 md:px-16'>
                <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-gray-800 tracking-tight leading-tight'>
                    Welcome to <span className='text-blue-600'>PayTM App</span>
                </h1>
                <p className='text-xl sm:text-2xl mb-6 text-gray-700 font-medium max-w-2xl leading-relaxed'>
                    Payments made simple, secure, and seamless
                </p>
                <p className='text-lg sm:text-xl mb-8 text-gray-600 max-w-3xl leading-relaxed'>
                    Your money, your way. Check balances, send payments, and watch your spending habits unfold with a simple tap
                </p>
                <div className='w-24 h-1 bg-blue-600 rounded-full mb-8'></div>
            </main>

            <footer className='w-full bg-white py-6 flex justify-center items-center shadow-inner'>
                <div className='text-sm sm:text-base text-gray-600 font-medium'>
                    © 2024 PayTM App. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

export default Home