import React, { useEffect, useState } from 'react'
import number from './assets/number.svg'
import email from './assets/email.svg'
import marker from './assets/marker.svg'
import message from './assets/message.svg'
import MessageUs from './MessageUs'

function Contact() {
    const [isMessageOpen, setIsMessageOpen] = useState(false);

    useEffect(() => {
            window.scrollTo(0, 0);
    }, []);

    const toggleMessage = () => {
        setIsMessageOpen(!isMessageOpen);
    }

    return (
        <div className='pt-24 pb-10 px-5'>
            <p className='font-bold lg:text-xl'>CONTACT US</p>

            <p className='font-extrabold text-3xl md:text-4xl text-[#FF0000] text-center pt-7'>Let's Talk</p>
            <p className='text-sm md:text-base text-center pt-1 max-w-[30rem] mx-auto'>Because we know how important it is for you to succeed, we have an offer for you that will bring you next to success!</p>

            <div className='pt-10 flex flex-col max-w-[35rem] md:max-w-[40rem] mx-auto md:flex-row gap-3'>
                <div className='flex flex-col gap-3'>
                    {/* CONTACT */}
                    <div  className='p-5 rounded-sm' style={{boxShadow: '1px 1px 15px 2px rgba(0, 0, 0, 0.13)'}}>
                        <div className='flex gap-4 items-center'>
                            <img className='w-6' src={number} alt="" />
                            <p className='font-bold text-[#FF0000]'>Contact No.</p>
                        </div>
                        <p className='pt-3 text-sm'>0919-773-0826</p>
                    </div>

                    {/* EMAIL */}
                    <div  className='p-5 rounded-sm' style={{boxShadow: '1px 1px 15px 2px rgba(0, 0, 0, 0.13)'}}>
                        <div className='flex gap-4 items-center'>
                            <img className='w-7' src={email} alt="" />
                            <p className='font-bold text-[#FF0000]'>Email Address</p>
                        </div>
                        <p className='pt-3 text-sm'>tomodachioperations18@gmail.com</p>
                    </div>
                </div>

                {/* LOCATION */}
                <div className='p-5 rounded-sm md:px-6' style={{boxShadow: '1px 1px 15px 2px rgba(0, 0, 0, 0.13)'}}>
                    <div className='flex gap-4 items-center'>
                        <img className='w-6' src={marker} alt="" />
                        <p className='font-bold text-[#FF0000]'>Tomodachi Inc.</p>
                    </div>
                    <p className='pt-3 text-sm md:text-base md:leading-7'>3rd Floor Room-M Hsinchu Bldg., Crisanto Ave. Brgy. Manggahan, General Trias City, Cavite 4107</p>
                </div>
            </div>

            <div className='overflow-hidden rounded-sm mt-3 w-full md:max-w-[40rem] max-w-[35rem] mx-auto h-52' style={{boxShadow: '1px 1px 15px 2px rgba(0, 0, 0, 0.13)'}}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3866.351648288262!2d120.91044361268924!3d14.290989580973928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d558c1e1397b%3A0x31e9a4a9345d0e9b!2sTomodachi%20Cavite!5e0!3m2!1sen!2sph!4v1741823260795!5m2!1sen!2sph" className='w-full h-full' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div className='overflow-hidden rounded-sm mt-3 w-full md:max-w-[40rem] max-w-[35rem] mx-auto h-52' style={{boxShadow: '1px 1px 15px 2px rgba(0, 0, 0, 0.13)'}}>
                <iframe src="https://www.google.com/maps/embed?pb=!4v1742280494227!6m8!1m7!1sW5OlWz45NP5zyPzKbOni1w!2m2!1d14.29096368809184!2d120.9116635815742!3f74.40033!4f0!5f0.7820865974627469" className='w-full h-full' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            {/* MESSAGE */}
            <div onClick={toggleMessage} className='bg-[#ff0000] cursor-pointer duration-150 hover:bg-[#d21f1f] p-4 rounded-full fixed bottom-5 right-5 shadow-2xl' >
                <img className='w-7' src={message} alt="" />
            </div>

            {/* MESSAGE US */}
            <div className={isMessageOpen ? 'block' : 'hidden'}>
                <MessageUs closeUI={toggleMessage} />
            </div>

        </div>
    )
}

export default Contact