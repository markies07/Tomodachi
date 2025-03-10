import React, { useEffect } from 'react'
import tomo from './assets/tomo.svg'

function Jobs() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='pt-24 pb-10 px-5'>
            <p className='font-bold lg:text-xl'>JOBS WE OFFER</p>

            {/* JOBS */}
            <div className='pt-10 flex xl:px-20 flex-col gap-12 sm:px-20 md:px-32 lg:px-0 lg:flex-row lg:gap-5 w-full'>

                {/* DASMARINAS */}
                <div className='bg-[#D9D9D9] w-full relative p-4 rounded-2xl'>
                    <img className='w-20 absolute -top-5 left-5' src={tomo} alt="" />
                    <p className='font-extrabold text-xl text-[#990000] pl-24'>Dasmariñas</p>
                    <p className='text-xs font-medium text-[#990000] pl-24'>Full-time Job</p>

                    {/* WORK */}
                    <div className='px-7 pt-5 font-semibold'>
                        <ul className='list-disc space-y-2'>
                            <li>General Workers</li>
                            <li>CNC Machine Operators</li>
                            <li>Press Machine Operators</li>
                            <li>Press Brake Machine Operators</li>
                            <li>Welders</li>
                            <li>Forklift Operator</li>
                            <li>Trailer Truck Drivers</li>
                            <li>Engineers</li>
                            <li>Delivery Van Driver</li>
                            <li>CCTV / Data Cabling Installer</li>
                        </ul>
                    </div>
                </div>

                {/* GENERAL TRIAS */}
                <div className='bg-[#D9D9D9] w-full relative p-4 rounded-2xl'>
                    <img className='w-20 absolute -top-5 left-5' src={tomo} alt="" />
                    <p className='font-extrabold text-xl text-[#990000] pl-24'>General Trias</p>
                    <p className='text-xs font-medium text-[#990000] pl-24'>Full-time Job</p>

                    {/* WORK */}
                    <div className='px-7 pt-5 font-semibold'>
                        <ul className='list-disc space-y-2'>
                            <li>Production Operators</li>
                            <li>QC Inspectors</li>
                            <li>SMT Operators</li>
                            <li>Soldering Operators</li>
                            <li>Office Staff</li>
                            <li>Warehouseman</li>
                            <li>Checker</li>
                        </ul>
                    </div>
                </div>

                {/* ROSARIO */}
                <div className='bg-[#D9D9D9] w-full relative p-4 rounded-2xl'>
                    <img className='w-20 absolute -top-5 left-5' src={tomo} alt="" />
                    <p className='font-extrabold text-xl text-[#990000] pl-24'>Rosario</p>
                    <p className='text-xs font-medium text-[#990000] pl-24'>Full-time Job</p>

                    {/* WORK */}
                    <div className='px-7 pt-5 font-semibold'>
                        <ul className='list-disc space-y-2'>
                            <li>Production Operators</li>
                            <li>Injection Operators</li>
                            <li>Ceramic Operators</li>
                            <li>Forklift Operators</li>
                            <li>Warehouseman</li>
                            <li>Delivery Truck Drivers</li>
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Jobs