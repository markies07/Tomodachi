import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import close from './assets/close.svg';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { notifyError, notifySuccess } from '../CustomToast';
import FileUpload from './FileUpload';

function MessageUs({ closeUI, isApplying }) {
    const formRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        message: ''
    });
    const [fileName, setFileName] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        if (!selectedFile) {
            notifyError("Please select a file.");
            setIsLoading(false);
            return;
        }
    
        const fileData = new FormData();
        fileData.append('file', selectedFile);
        fileData.append('upload_preset', 'tomodachi');
    
        try {
            // 1. Upload the file to Cloudinary (correct endpoint!)
            const uploadRes = await fetch('https://api.cloudinary.com/v1_1/dzran6obb/raw/upload', {
                method: 'POST',
                body: fileData
            });
    
            const uploadResult = await uploadRes.json();
    
            if (!uploadResult.secure_url) {
                throw new Error('Failed to upload file to Cloudinary.');
            }
    
            // 2. Create the Google Docs Viewer link
            const fileLink = `https://docs.google.com/viewer?url=${uploadResult.secure_url}&embedded=true`;
    
            // 3. Prepare the email variables
            const emailData = {
                fullName: formData.fullName,
                contactNumber: formData.contactNumber,
                message: formData.message,
                file_url: fileLink, // now it's the Google Docs viewable link
            };
    
            // 4. Send email with EmailJS
            await emailjs.send(
                "service_feg4pgq",
                "template_adt6qnn",
                emailData,
                "9J_0pvP8gRKTJdK4C"
            );
    
            Swal.fire("Message sent!", "", "success");
            setFormData({
                fullName: '',
                contactNumber: '',
                message: ''
            });
            setSelectedFile(null);
            setFileName('');
            closeUI();
        } catch (err) {
            console.error(err);
            notifyError("Failed to send message!");
        } finally {
            setIsLoading(false);
        }
    };
    
    

    return (
        <div className='fixed inset-0 flex justify-center items-center z-50 bg-black/80'>
            <div className="relative rounded-md p-5 bg-white w-[90%] sm:w-[35rem] flex flex-col">
                <img className='w-8 cursor-pointer md:w-9 p-1 absolute top-4 right-4' src={close} onClick={closeUI} alt="Close" />
                <p className='font-extrabold text-2xl text-[#990000] text-center pt-2'>{isApplying ? 'Apply Job' : 'Message Us'}</p>

                <form ref={formRef} onSubmit={handleSubmit} className='pt-5 text-sm sm:text-base flex flex-col gap-3'>
                    <div className='flex flex-col md:flex-row gap-3'>
                        <input
                            className='bg-[#D9D9D9] rounded-sm outline-none px-3 py-2 -full'
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder='Full Name'
                            required
                        />
                        <input
                            className='bg-[#D9D9D9] rounded-sm outline-none px-3 py-2 w-full'
                            type="number"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            placeholder='Contact Number'
                            required
                        />
                    </div>

                    <textarea
                        className='bg-[#D9D9D9] rounded-sm outline-none px-3 py-2 w-full md:h-40 h-32'
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder='Enter your message...'
                        required
                    />

                    <div className={isApplying ? 'block' : 'hidden'}>
                        <FileUpload onFileChange={handleFileChange} fileName={fileName} setFileName={setFileName} />
                    </div>

                    <button
                        type="submit"
                        className='text-white font-bold rounded-sm bg-[#990000] cursor-pointer hover:bg-[#771b1b] duration-150 py-2'
                    >
                        {isLoading ? 'SENDING...' : 'SEND'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MessageUs;
