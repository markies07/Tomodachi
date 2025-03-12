import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import close from './assets/close.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MessageUs({ closeUI }) {
    const formRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const templateParams = {
            fullName: formData.fullName,
            contactNumber: formData.contactNumber,
            message: formData.message
        };

        emailjs.send("service_feg4pgq", "template_adt6qnn", templateParams, "9J_0pvP8gRKTJdK4C")
            .then((response) => {
                setIsLoading(false);
                toast.success("Message Sent Successfully!", { position: "top-right", style: {backgroundColor: '#FAFAFA', fontFamily: 'Arial'}, hideProgressBar: true});
                console.log("SUCCESS!", response.status, response.text);
                setFormData({ fullName: '', contactNumber: '', message: '' });
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error("Failed to send message!", { position: "top-right", style: {backgroundColor: '#FAFAFA', fontFamily: 'Arial'}, hideProgressBar: true});
                console.error("FAILED...", error);
            });
    };

    return (
        <div className='fixed inset-0 flex justify-center items-center z-50 bg-black/80'>
            <div className="relative p-5 bg-white w-[90%] sm:w-[35rem] flex flex-col">
                <img className='w-8 cursor-pointer md:w-9 p-1 absolute top-4 right-4' src={close} onClick={closeUI} alt="Close" />

                <p className='font-extrabold text-2xl text-[#990000] text-center pt-2'>Message Us</p>

                <form ref={formRef} onSubmit={handleSubmit} className='pt-5 text-sm sm:text-base flex flex-col gap-3'>
                    <div className='flex flex-col md:flex-row gap-3'>
                        <input className='bg-[#D9D9D9] outline-none px-3 py-2 -full'
                            type="text" name="fullName" value={formData.fullNwame} onChange={handleChange} placeholder='Full Name' required />
                        <input className='bg-[#D9D9D9] outline-none px-3 py-2 w-full'
                            type="number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder='Contact Number' required />
                    </div>

                    <textarea className='bg-[#D9D9D9] outline-none px-3 py-2 w-full md:h-40 h-32'
                        name="message" value={formData.message} onChange={handleChange} placeholder='Enter your message...' required />

                    <button type="submit" className='text-white font-bold bg-[#990000] cursor-pointer hover:bg-[#771b1b] duration-150 py-2'>
                        {isLoading ? 'SENDING...' : 'SEND'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MessageUs;
