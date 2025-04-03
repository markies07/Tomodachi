import React, { useState } from 'react'
import close from './assets/close.svg';
import image from './assets/image.svg'
import remove from './assets/remove.svg';
import { notifyError, notifySuccess } from '../CustomToast';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import axios from 'axios';

function AddReq({closeAddReq}) {

    const [reqName, setReqName] = useState('');
    const [reqImage, setReqImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setReqImage(e.target.files[0]); // Store selected file
        }
    };

    const handleUpload = async () => {
        if(!reqImage || !reqName) {
            notifyError("Please Provide both name and image!");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('file', reqImage);
        formData.append('upload_preset', 'tomodachi');

        try{
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dzran6obb/image/upload`,
                formData
            );

            const imageUrl = response.data.secure_url;
            await saveToFirestore(reqName, imageUrl);
        }
        catch(error){
            console.error("Upload Error: ", error);
        }
    }

    const saveToFirestore = async (name, imageUrl) => {
        try {
            const docRef = await addDoc(collection(db, "requirements"), {
                name: name,
                imageUrl: imageUrl,
            });
    
            setReqName('');
            setReqImage(null);
            closeAddReq();
            console.log("Requirement added:", docRef.id);
            notifySuccess("Requirement added successfully!");
        } catch (error) {
            notifyError('Error saving requirement. Please try again.');
            console.error("Error saving to Firestore:", error);
        }
        finally{
            setLoading(false);
        }
    };

    const handleRemoveImage = () => {
        setReqImage(null);
    };

    console.log(reqImage);

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <div className='bg-white relative rounded-lg w-[90%] max-w-[25rem] px-7 py-7 min-h-80'>
                <img onClick={closeAddReq} className='absolute cursor-pointer w-6 sm:w-7 top-4 right-4' src={close} alt="Close" />
                <p className="font-bold text-xl text-center pt-4 sm:pt-0">Add Requirement</p>
            
                <div className='mt-3'>
                    <p className='font-semibold'>Name:</p>
                    <input onChange={(e) => setReqName(e.target.value)} className='bg-[#D9D9D9] w-full rounded-sm p-2 pl-3 outline-none' type="text" />
                </div>

                <div className='mt-3'>
                    <p className='font-semibold'>Image:</p>
                    <div className='bg-[#D9D9D9] flex justify-center items-center  overflow-hidden flex-col gap-2 w-full h-60 rounded-sm'>
                        {reqImage ? (
                            <div className='w-full flex  h-full relative'>
                                <button onClick={() => handleRemoveImage()} className='absolute cursor-pointer top-2 right-2 bg-[#FF0000] rounded-full text-xs p-2'>
                                    <img className='w-5' src={remove} alt="" />
                                </button>
                                <img src={URL.createObjectURL(reqImage)} className='w-full object-contain' alt="" />
                            </div>
                        ) : (
                            <>
                                <img onClick={() => document.getElementById('image').click()} className='w-16 cursor-pointer' src={image} alt="" />
                                <p className='font-medium text-[#727272]'>Upload Image</p>
                            </>
                        )}
                        <input onChange={handleImageChange} className='hidden' type="file" accept='image/*' name="" id="image" />
                    </div>
                </div>

                <div className='w-full flex justify-center'>
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="bg-[#08aa00] text-white font-semibold text-xs sm:text-sm cursor-pointer 
                        hover:bg-[#3c8d39] duration-300 mt-5 rounded-sm px-5 py-2"
                    >{loading ? 'ADDING...' : 'ADD'}</button>
                </div>
            
            </div>
        </div>
    )
}

export default AddReq