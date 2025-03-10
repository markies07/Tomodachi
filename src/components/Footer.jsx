import React from 'react'
import tomowhite from '../assets/tomowhite.png'
import fb from '../assets/fb.svg'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <div className='bg-[#323232] py-3 flex flex-col items-center justify-center px-7'>
            <img className='w-40 lg:w-52 pb-3 pt-1' src={tomowhite} alt="" />

            <p className='text-[#D4D4D4] text-xs text-center pb-5'>To be the human resource provider of your choice, we provide the most competitive and efficient workforce with personalized service according to our customers’ satisfaction.</p>

            <a href="https://web.facebook.com/tomodachicavite" target="_blank">
                <img src={fb} alt="" />
            </a>

            <div className='flex justify-center gap-3 text-white text-xs w-full font-medium pt-7'>
                <NavLink to={'/'} className={({ isActive }) => isActive ? 'px-1 border-b-2 border-white' : 'px-1 border-b-2 border-transparent'}>HOME</NavLink>
                <NavLink to={'/jobs'} className={({ isActive }) => isActive ? 'px-1 border-b-2 border-white' : 'px-1 border-b-2 border-transparent'}>JOBS</NavLink>
                <NavLink to={'/requirements'} className={({ isActive }) => isActive ? 'px-1 border-b-2 border-white' : 'px-1 border-b-2 border-transparent'}>REQUIREMENTS</NavLink>
                <NavLink to={'/contact'} className={({ isActive }) => isActive ? 'px-1 border-b-2 border-white' : 'px-1 border-b-2 border-transparent'}>CONTACT</NavLink>
            </div>
            
            <p className='text-[#D4D4D4] text-xs text-center pt-5'>© 2025 Tomodachi Inc. All Rights Reserved.</p>

        </div>
    )
}

export default Footer