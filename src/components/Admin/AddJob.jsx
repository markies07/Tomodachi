import React, { useState } from 'react';
import close from './assets/close.svg';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { notifyError, notifySuccess } from '../CustomToast';
import remove from './assets/remove.svg';
import add from './assets/add.svg';

function AddJob({ closeAddJob, location, setLocation }) {
    const [jobTitle, setJobTitle] = useState('');
    const [vacancies, setVacancies] = useState('');
    const [qualifications, setQualifications] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);

    // HANDLE INPUT CHANGES
    const handleTitleChange = (e) => setJobTitle(e.target.value);
    const handleVacanciesChange = (e) => setVacancies(e.target.value);

    const handleQualificationChange = (index, value) => {
        const updatedQualifications = [...qualifications];
        updatedQualifications[index] = value;
        setQualifications(updatedQualifications);
    };

    const addQualification = () => {
        setQualifications([...qualifications, '']);
    };

    const removeQualification = (index) => {
        const updatedQualifications = qualifications.filter((_, i) => i !== index);
        setQualifications(updatedQualifications);
    };

    // ADD JOB FUNCTION
    const handleAddJob = async () => {
        if (!jobTitle.trim()) {
            notifyError('Job title cannot be empty.');
            return;
        }

        setLoading(true);

        try {
            await addDoc(collection(db, 'jobVacancies'), {
                location,
                jobTitle,
                vacancies,
                qualifications
            });

            notifySuccess('Job added successfully!');
            closeWindow();
        } catch (error) {
            console.error('Error adding job:', error);
            notifyError('Failed to add job.');
        } finally {
            setLoading(false);

            setJobTitle('');
            setVacancies('');
            setQualifications(['', '', '', '']);
        }
    };

    const closeWindow = () => {
        setLocation('');
        closeAddJob();
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <div className='bg-white relative rounded-lg w-[90%] max-w-[35rem] px-5 py-7 sm:px-7 min-h-80'>
                <img onClick={closeWindow} className='absolute cursor-pointer w-6 sm:w-7 top-4 right-4' src={close} alt="Close" />

                <p className="font-bold text-xl text-center">Add New Job</p>
                <p className="font-bold text-sm text-center">{location}</p>

                {/* JOB TITLE INPUT */}
                <div className='flex gap-2 w-full'>
                    <div className='w-full'>
                        <p className="font-bold text-sm pb-2 pt-5">Job Title:</p>
                        <input
                            className="bg-[#D9D9D9] outline-none px-3 font-semibold py-2 w-full"
                            type="text"
                            value={jobTitle}
                            onChange={handleTitleChange}
                            required
                        />
                    </div>

                    <div className='w-28'>
                        <p className="font-bold text-sm pb-2 pt-5">Vacancies:</p>
                        <input
                            className="bg-[#D9D9D9] outline-none px-3 font-semibold py-2 w-full"
                            type="number"
                            value={vacancies}
                            onChange={handleVacanciesChange}
                            required
                        />
                    </div>
                </div>

                {/* QUALIFICATIONS */}
                <p className="font-bold text-sm pt-5">Qualifications:</p>
                <div className='flex flex-col gap-4 pt-2'>
                    {qualifications.map((qualification, index) => (
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
                    <button onClick={addQualification} className="bg-blue-400 cursor-pointer rounded-sm hover:bg-blue-500 duration-150 text-xs sm:text-sm flex font-medium gap-2 justify-center items-center text-white px-3 py-2">
                        <img className='w-5' src={add} alt="" />
                        Add Qualification
                    </button>
                </div>

                {/* ADD JOB BUTTON */}
                <div className='flex justify-center mt-7'>
                    <button
                        onClick={handleAddJob}
                        className="bg-[#08aa00] text-white font-semibold text-xs sm:text-sm cursor-pointer 
                        hover:bg-[#3c8d39] duration-300 rounded-sm px-3 py-2"
                    >
                        {loading ? 'Adding...' : 'Add Job'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddJob;
