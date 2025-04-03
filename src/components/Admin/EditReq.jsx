import React, { useEffect, useState } from 'react';
import close from './assets/close.svg';
import image from './assets/image.svg';
import remove from './assets/remove.svg';
import { notifyError, notifySuccess } from '../CustomToast';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import axios from 'axios';

function EditReq({ reqID, closeEditReq }) { 
    const [reqName, setReqName] = useState('');
    const [reqImage, setReqImage] = useState(null);
    const [prevImageUrl, setPrevImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false); // Track changes

    // FETCH EXISTING REQUIREMENT
    useEffect(() => {
        if (reqID) {
            const fetchReq = async () => {
                setLoading(true);

                const reqRef = doc(db, 'requirements', reqID);
                const reqSnap = await getDoc(reqRef);

                if (reqSnap.exists()) {
                    const reqData = reqSnap.data();
                    setReqName(reqData.name);
                    setPrevImageUrl(reqData.imageUrl); // Store existing image
                    setReqImage(reqData.imageUrl); // Initially set to the fetched image
                }
                setLoading(false);
            };
            fetchReq();
        }
    }, [reqID]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setReqImage(e.target.files[0]); // Store selected file
            setHasChanges(true);
        }
    };

    const handleUpload = async () => {
        if (!reqName) {
            notifyError("Please provide a name!");
            return;
        }

        let imageUrl = prevImageUrl; // Default to previous image if unchanged

        if (reqImage && reqImage !== prevImageUrl) { // Only upload if new image is selected
            const formData = new FormData();
            formData.append('file', reqImage);
            formData.append('upload_preset', 'tomodachi');

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dzran6obb/image/upload`,
                    formData
                );

                imageUrl = response.data.secure_url;
            } catch (error) {
                console.error("Upload Error: ", error);
                notifyError("Error uploading image.");
                setLoading(false);
                return;
            }
        }

        await saveToFirestore(reqName, imageUrl);
    };

    const saveToFirestore = async (name, imageUrl) => {
        setIsSaving(true);
        try {
            const reqRef = doc(db, "requirements", reqID);
            await updateDoc(reqRef, {
                name: name,
                imageUrl: imageUrl,
            });

            notifySuccess("Requirement updated successfully!");
            closeEditReq(); // Close modal after saving
        } catch (error) {
            notifyError("Error updating requirement. Please try again.");
            console.error("Firestore update error:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleRemoveImage = () => {
        setReqImage(null);
        setHasChanges(true);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <div className='bg-white relative rounded-lg w-[90%] max-w-[25rem] px-7 py-7 min-h-80'>
                <img onClick={closeEditReq} className='absolute cursor-pointer w-6 sm:w-7 top-4 right-4' src={close} alt="Close" />
                <p className="font-bold text-xl text-center pt-4 sm:pt-0">Edit Requirement</p>

                {loading ? (
                    <p className='font-bold text-lg w-full h-full flex justify-center items-center py-20'>Loading...</p>
                ) : (
                    <>
                        <div className='mt-3'>
                            <p className='font-semibold'>Name:</p>
                            <input 
                                value={reqName} 
                                onChange={(e) => { setReqName(e.target.value); setHasChanges(true); }} 
                                className='bg-[#D9D9D9] w-full rounded-sm p-2 pl-3 outline-none' 
                                type="text" 
                            />
                        </div>

                        <div className='mt-3'>
                            <p className='font-semibold'>Image:</p>
                            <div className='bg-[#D9D9D9] flex justify-center items-center overflow-hidden flex-col gap-2 w-full h-60 rounded-sm'>
                                {reqImage ? (
                                    <div className='w-full flex h-full relative'>
                                        <button onClick={handleRemoveImage} className='absolute cursor-pointer top-2 right-2 bg-[#FF0000] rounded-full text-xs p-2'>
                                            <img className='w-5' src={remove} alt="Remove" />
                                        </button>
                                        <img src={typeof reqImage === 'string' ? reqImage : URL.createObjectURL(reqImage)} className='w-full object-contain' alt="Requirement" />
                                    </div>
                                ) : (
                                    <>
                                        <img onClick={() => document.getElementById('image').click()} className='w-16 cursor-pointer' src={image} alt="Upload" />
                                        <p className='font-medium text-[#727272]'>Upload Image</p>
                                    </>
                                )}
                                <input onChange={handleImageChange} className='hidden' type="file" accept='image/*' id="image" />
                            </div>
                        </div>

                        <div className='w-full flex justify-center'>
                            <button
                                onClick={handleUpload}
                                disabled={isSaving || !hasChanges} // Prevent unnecessary updates
                                className={`bg-[#08aa00] text-white font-semibold text-xs sm:text-sm cursor-pointer 
                                hover:bg-[#3c8d39] duration-300 mt-5 rounded-sm px-5 py-2 ${(!hasChanges || loading) && 'opacity-50 cursor-not-allowed'}`}
                            >
                                {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default EditReq;
