import React, { useState } from 'react'
import tomologo from '../assets/tomologo.svg'
import close from '../assets/close.svg'
import burger from '../assets/burger.svg'
import { NavLink } from 'react-router-dom'

function Header() {
    const [isHeaderOpen, setIsHeaderOpen] = useState(false);

    const toggleHeader = () => {
        setIsHeaderOpen(!isHeaderOpen);
    }


    return (
        <div className='flex w-full select-none h-full relative overflow-hidden justify-between px-4 sm:px-7 py-5 items-center'>
            <div>
                <img className='w-40' src={tomologo} alt="" />
            </div>

            {/* MOBILE VIEW */}
            <div className='md:hidden'>
                <img className='cursor-pointer' onClick={toggleHeader} src={burger} alt="" />
            </div>

            {/* HIDDEN HEADER */}
            <div className={`w-full md:hidden h-full shadow-2xl bg-white min-h-screen transition-right duration-500 ease-in-out max-h-screen fixed top-0 ${isHeaderOpen ? 'right-0' : 'right-[-100rem]'}`}>
                <img onClick={toggleHeader} className='absolute cursor-pointer top-7 right-5' src={close} alt="" />

                {/* QUICK LINKS */}
                <div className='flex  flex-col w-full h-full items-center justify-center gap-7'>
                    <NavLink to={"/"} onClick={toggleHeader} className={({ isActive }) => isActive ? 'font-semibold cursor-pointer px-2 text-[#FF0000] border-[#FF0000] border-b-[3px]' : 'font-semibold cursor-pointer px-2 border-transparent border-b-[3px]'}>HOME</NavLink>
                    <NavLink to={"/jobs"} onClick={toggleHeader} className={({ isActive }) => isActive ? 'font-semibold cursor-pointer px-2 text-[#FF0000] border-[#FF0000] border-b-[3px]' : 'font-semibold cursor-pointer px-2 border-transparent border-b-[3px]'}>JOBS</NavLink>
                    <NavLink to={"/requirements"} onClick={toggleHeader} className={({ isActive }) => isActive ? 'font-semibold cursor-pointer px-2 text-[#FF0000] border-[#FF0000] border-b-[3px]' : 'font-semibold cursor-pointer px-2 border-transparent border-b-[3px]'}>REQUIREMENTS</NavLink>
                    <NavLink to={"/contact"} onClick={toggleHeader} className={({ isActive }) => isActive ? 'font-semibold cursor-pointer px-2 text-[#FF0000] border-[#FF0000] border-b-[3px]' : 'font-semibold cursor-pointer px-2 border-transparent border-b-[3px]'}>CONTACT</NavLink>
                </div>
            </div>

            {/* DESKTOP VIEW */}
            <div className='hidden md:flex text-sm lg:text-base gap-2 lg:gap-3'>
                <NavLink to={"/"} className={({ isActive }) => isActive ? 'font-semibold cursor-pointer px-2 text-[#FF0000] border-b-[3px]' : 'font-semibold cursor-pointer px-2 border-transparent border-b-[3px]'}>HOME</NavLink>
                <NavLink to={"/jobs"} className={({ isActive }) => isActive ? 'font-semibold cursor-pointer px-2 text-[#FF0000] border-b-[3px]' : 'font-semibold cursor-pointer px-2 border-transparent border-b-[3px]'}>JOBS</NavLink>
                <NavLink to={"/requirements"} className={({ isActive }) => isActive ? 'font-semibold cursor-pointer px-2 text-[#FF0000] border-b-[3px]' : 'font-semibold cursor-pointer px-2 border-transparent border-b-[3px]'}>REQUIREMENTS</NavLink>
                <NavLink to={"/contact"} className={({ isActive }) => isActive ? 'font-semibold cursor-pointer px-2 text-[#FF0000] border-b-[3px]' : 'font-semibold cursor-pointer px-2 border-transparent border-b-[3px]'}>CONTACT</NavLink>
            </div>

        </div>
    )
}

export default Header