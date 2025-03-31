import React, { useEffect, useState } from 'react';
import close from './assets/close.svg';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { notifyError, notifySuccess } from '../CustomToast';
import remove from './assets/remove.svg';
import add from './assets/add.svg';

function EditJob({ closeQual, jobID, setSelectedJob }) {
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [vacancies, setVacancies] = useState('')
    const [jobTitle, setJobTitle] = useState('');
    const [qualifications, setQualifications] = useState([]);
    const [isModified, setIsModified] = useState(false); 
    const [loading, setLoading] = useState(false);

    const closeWindow = () => {
        closeQual();
        setSelectedJob(null);
        setIsLoading(true);
    };

    // FETCHING JOB DATA
    useEffect(() => {
        if (jobID) {
            const fetchJob = async () => {
                setIsLoading(true);
                const jobRef = doc(db, 'jobVacancies', jobID);
                const jobSnap = await getDoc(jobRef);

                if (jobSnap.exists()) {
                    const jobData = jobSnap.data();
                    setVacancies(jobData.vacancies)
                    setJob(jobData);
                    setJobTitle(jobData.jobTitle || '');
                    setQualifications(jobData.qualifications || []); // Ensure 4 fields
                }
                setIsLoading(false);
            };
            fetchJob();
        }
    }, [jobID]);

    // HANDLE TITLE CHANGE
    const handleTitleChange = (e) => {
        setJobTitle(e.target.value);
        setIsModified(true);
    };

    const handleVacanciesChange = (e) => {
        setVacancies(e.target.value);
        setIsModified(true);
    }

    // HANDLE QUALIFICATION CHANGE
    const handleQualificationChange = (index, value) => {
        const updatedQualifications = [...qualifications];
        updatedQualifications[index] = value;
        setQualifications(updatedQualifications);
        setIsModified(true);
    };

    const addQualification = () => {
        setQualifications([...qualifications, '']);
        setIsModified(true);
    };

    const removeQualification = (index) => {
        const updatedQualifications = qualifications.filter((_, i) => i !== index);
        setQualifications(updatedQualifications);
        setIsModified(true);
    };

    // SAVE CHANGES TO FIRESTORE
    const handleSaveChanges = async () => {
        if (!jobTitle.trim()) {
            notifyError('Job title cannot be empty.');
            return;
        }
        setLoading(true);
        const jobRef = doc(db, 'jobVacancies', jobID);

        try {
            await updateDoc(jobRef, {
                vacancies,
                jobTitle,
                qualifications
            });
            notifySuccess('Job updated successfully!');
            setLoading(false);
            closeWindow();
        } catch (error) {
            console.error('Error updating job:', error);
            setLoading(false);
            notifyError("Failed to update job.");
        }
        finally{
            setIsLoading(false);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <div className='bg-white overflow-auto relative rounded-lg w-[90%] max-w-[35rem] px-5 py-7 sm:px-7 min-h-80'>
                <img onClick={closeWindow} className='absolute cursor-pointer w-6 sm:w-7 top-4 right-4' src={close} alt="Close" />

                <p className={`font-bold text-xl text-center ${isLoading ? 'hidden' : 'block'}`}>
                    Edit Job
                </p>

                <p className={`font-bold pt-4 sm:pt-0 text-xl text-center ${isLoading ? 'block' : 'hidden'}`}>
                    Loading...
                </p>

                {/* JOB TITLE INPUT */}
                <div className='flex gap-2 w-full'>

                    <div className='w-full'>
                        <p className={`font-bold text-sm pb-2 pt-5 ${isLoading ? 'hidden' : 'block'}`}>Job Title:</p>
                        <input
                            className={`bg-[#D9D9D9] outline-none px-3 font-semibold py-2 w-full ${isLoading ? 'hidden' : 'block'}`}
                            type="text"
                            value={jobTitle}
                            onChange={handleTitleChange}
                            required
                        />
                    </div>

                    <div className='w-28'>
                        <p className={`font-bold text-sm pb-2 pt-5 ${isLoading ? 'hidden' : 'block'}`}>Vacancies:</p>
                        <input
                            className={`bg-[#D9D9D9] outline-none px-3 font-semibold py-2 w-full ${isLoading ? 'hidden' : 'block'}`}
                            type="number"
                            value={vacancies}
                            onChange={handleVacanciesChange}
                            required
                        />
                    </div>

                </div>

                {/* QUALIFICATIONS */}
                <p className={isLoading ? 'hidden' : `font-bold text-sm pt-5`}>Qualifications:</p>

                <div className='flex flex-col gap-4 pt-2'>
                    {!isLoading && qualifications.map((qualification, index) => (
                        <div key={index} className='flex gap-2'>
                            <input
                                className="bg-[#D9D9D9] outline-none px-3 py-2 w-full"
                                type="text"
                                value={qualification}
                                onChange={(e) => handleQualificationChange(index, e.target.value)}
                                required
                            />

                            <button onClick={() => removeQualification(index)} className="bg-[#990000] rounded-sm cursor-pointer duration-150 hover:bg-[#b75555] px-3 text-white py-1">
                                <img className='w-5' src={remove} alt="" />
                            </button>
                        </div>
                    ))}

                    <button onClick={addQualification} className="bg-blue-400 cursor-pointer hover:bg-blue-500 rounded-sm duration-150 text-xs sm:text-sm flex font-medium gap-2 justify-center items-center text-white px-3 py-2">
                        <img className='w-5' src={add} alt="" />
                        Add Qualification
                    </button>
                </div>

                {/* SAVE CHANGES BUTTON */}
                <div className='flex justify-center mt-7'>
                    <button
                        onClick={handleSaveChanges}
                        disabled={!isModified}
                        className={`bg-[#08aa00] mr-1 text-white font-semibold text-xs sm:text-sm cursor-pointer 
                            hover:bg-[#3c8d39] duration-300 rounded-sm px-3 py-2 
                            ${isLoading ? 'hidden' : 'block'}`}
                    >
                        {loading ? 'Saving...' : 'Save Changes'} 
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditJob;
