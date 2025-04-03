import React, { useEffect } from 'react'
import banner from './assets/banner.webp'
import image1 from './assets/image1.jpeg'
import image2 from './assets/image2.svg'
import down from './assets/down.svg'
import mission from './assets/mission.png'
import vision from './assets/vision.svg'
import cnf from './assets/c&f.png'
import cyber from './assets/cyber.png'
import kfi from './assets/kfi.png'
import klt from './assets/klt.png'
import ma from './assets/ma.png'
import phisonic from './assets/phisonic.png'
import rushtek from './assets/rushtek.png'
import bg from './assets/bg.png'

import AOS from 'aos';
import 'aos/dist/aos.css';


function Home() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);

    return (
        <div className='pt-19 pb-10'>
            {/* BANNER */}
            <img src={banner} alt="" />

            {/* DOWN ANIMATION */}
            <div className='w-full justify-center hidden lg:flex pb-7'>
                <img className='w-8 animate-bounce' src={down} alt="" />
            </div>

            {/* WHO WE ARE - WHAT WE DO */}
            <div className='pt-7 pb-4 overflow-x-hidden flex flex-col sm:px-10 items-center justify-center'>
                <p className='font-extrabold sm:text-lg md:text-xl lg:text-2xl border-b-[3px] px-2 border-[#FF0000]'>Who We Are - What We Do</p>

                {/* WHO WE ARE */}
                <div data-aos="fade-right" className='flex flex-col items-center pt-7 lg:pt-10 max-w-[60rem]'>
                    <p className='font-extrabold md:hidden text-sm text-[#990000] pb-3 w-full text-center md:text-start'>WHO WE ARE</p>
                    <div className='flex flex-col md:pt-7 justify-center items-center md:gap-3 md:flex-row'>
                        <div className='w-[80%]  md:w-[50%] max-w-96 relative'>
                            <p className='font-extrabold pl-5 hidden md:block absolute -top-7 text-sm text-[#990000] pb-3 w-full text-start'>WHO WE ARE</p>
                            <img className='w-[90%] mx-auto' src={image1} alt="" />
                            <div className='w-[90%] -z-10 h-full absolute -bottom-3 right-1 bg-[#990000]' />
                        </div>
                        <p className=' md:px-0 leading-6 md:pl-10 w-[80%] md:w-[50%] pt-10 md:pt-0 text-sm text-center md:text-start '>
                            <span className='font-bold'>Tomodachi Global Resources Inc.</span> is a human resource company that was establish in 2014 and handles a wide array of services in the Philippines. Aside from providing our services to our clients being on call 24/7, we direct manage, control and supervise as Contract Manufacturer, in relation to the quality parameters and guidelines set ahead by our client.
                        </p>
                    </div>
                </div>

                {/* WHAT WE DO */}
                <div data-aos="fade-left" className='flex flex-col items-center pt-7 lg:pt-10 max-w-[60rem]'>
                    <p className='font-extrabold md:hidden text-sm text-[#990000] pb-3 w-full text-center md:text-end'>WHAT WE DO</p>
                    <div className='flex flex-col md:pt-7 justify-center items-center md:gap-3 md:flex-row'>
                        <div className='w-[80%] order-2 md:order-1 md:w-[50%]'>
                            <p className='px-7 pt-7 text-base text-center md:text-end font-bold pb-3'>
                                We source skilled professionals
                            </p>
                            <p className='text-center md:text-end leading-6 text-sm md:pr-7'>
                                We are specialized in sourcing competent and skilled personnel who fulfill our clients standards. We rigorously identify and valued candidates to guarantee that our clients always receive the greatest service from us!
                            </p>
                        </div>    
                        <div className='w-[80%] order-1 md:order-2 md:w-[50%] max-w-96 relative'>
                            <p className='font-extrabold hidden md:block absolute -top-7 text-sm text-[#990000] pb-3 w-full text-end'>WHAT WE DO</p>
                            <img className='w-[90%] mx-auto' src={image2} alt="" />
                            <div className='w-[90%] -z-10 h-full absolute -bottom-3 right-1 bg-[#990000]' />
                        </div>
                        
                    </div>
                </div>
            </div>


            {/* ABOUT US */}
            <div className='flex flex-col sm:px-10 items-center justify-center pt-14 md:pt-20'>
                <p className='font-extrabold sm:text-lg md:text-xl lg:text-2xl border-b-[3px] px-2 border-[#FF0000]'>About Us</p>

                <div className='pt-10 w-[80%] md:w-full md:max-w-[50rem] max-w-96 flex flex-col gap-7 md:flex-row'>

                    {/* OUR MISSION */}
                    <div data-aos="zoom-in" className='p-7 w-full flex flex-col items-center justify-center' style={{boxShadow: '1px 1px 15px 2px rgba(0, 0, 0, 0.13)'}}>
                        <img className='w-16' src={mission} alt="" />
                        <p className='font-bold text-[#990000] pt-3'>Our Mission</p>
                        <p className='text-center text-sm pt-5 leading-6'>We provide the most competitive and efficient workforce with personalized service according to our customers’ satisfaction.</p>
                    </div>

                    {/* OUR VISION */}
                    <div data-aos="zoom-in" className='p-7 w-full flex flex-col items-center justify-center md:justify-start' style={{boxShadow: '1px 1px 15px 2px rgba(0, 0, 0, 0.13)'}}>
                        <img className='w-20' src={vision} alt="" />
                        <p className='font-bold text-[#990000] pt-3'>Our Vision</p>
                        <p className='text-center text-sm pt-5 leading-6'>To be the global human resource provider of choice.</p>
                    </div>

                </div>

            </div>


            {/* OUR CLIENTS */}
            <div className='flex relative overflow-hidden flex-col sm:px-10 items-center justify-center pt-14 md:pt-20'>
                <p className='font-extrabold sm:text-lg md:text-xl lg:text-2xl border-b-[3px] px-2 border-[#FF0000]'>Our Clients</p>

                {/* LOGO MOBILE */}
                <div className='w-full flex justify-center items-center flex-col gap-6 p-10 md:hidden'>
                    <img data-aos="zoom-out" src={cnf} alt="" />
                    <img data-aos="zoom-out" src={cyber} alt="" />
                    <div className='flex items-center justify-center object-fill w-full gap-5'>
                        <img data-aos="zoom-out" className='object-fill' src={ma} alt="" />
                        <img data-aos="zoom-out" className='object-fill' src={klt} alt="" />
                    </div>
                    <img data-aos="zoom-out" src={phisonic} alt="" />
                    <img data-aos="zoom-out" src={rushtek} alt="" />
                    <img data-aos="zoom-out" src={kfi} alt="" />
                </div>

                {/* LOGO DESKTOP */}
                <div className='w-full justify-center items-center flex-col gap-6 p-10 hidden md:flex'>
                    <div className='flex items-center gap-4'>
                        <img data-aos="zoom-out" src={cnf} alt="" />
                        <img data-aos="zoom-out" src={rushtek} alt="" />
                    </div>
                    <div className='flex items-center justify-center object-fill w-full gap-5'>
                        <img data-aos="zoom-out" className='object-fill' src={ma} alt="" />
                        <img data-aos="zoom-out" src={kfi} alt="" />
                        <img data-aos="zoom-out" className='object-fill' src={klt} alt="" />
                    </div>
                    <div className='flex items-center gap-4'>
                        <img data-aos="zoom-out" src={cyber} alt="" />
                        <img data-aos="zoom-out" src={phisonic} alt="" />
                    </div>
                    
                </div>

                <img className='absolute top-28 -left-48 -z-10 sm:top-28 sm:-left-40 w-80 sm:w-96' src={bg} alt="" />
                <img className='absolute bottom-10 -right-52 -z-10 sm:top-28 sm:-right-40 w-80 sm:w-96' src={bg} alt="" />

            </div>

        </div>
    )
}

export default Home