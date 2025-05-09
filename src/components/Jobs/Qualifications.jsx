import React, { useEffect, useState } from 'react'
import close from './assets/close.svg'
import check from './assets/check.svg'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import MessageUs from '../Contact/MessageUs';

function Qualifications({closeQual, jobID, setSelectedJob}) {

    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const isApplying = true;

    const closeWindow = () => {
        closeQual();
        setSelectedJob(null);
        setIsLoading(true);
    }

    const toggleMessage = () => {
        setIsMessageOpen(!isMessageOpen);
    }

    useEffect(() => {
        if(jobID){
            const fetchJob = async () => {
                setIsLoading(true)
                const jobRef = doc(db, 'jobVacancies', jobID);
                const jobSnap = await getDoc(jobRef);
        
                if (jobSnap.exists()) {
                    const jobData = jobSnap.data();
                    setJob({ ...jobData, qualifications: jobData.qualifications || [] });
                }            
                setIsLoading(false);
            }
            fetchJob();
        }
    }, [jobID]);

    // console.log(job.qualifications)


    return (
        <div className="fixed inset-0 flex justify-center items-center z-50"  style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
            <div className='bg-white relative rounded-lg w-[90%] max-w-[35rem] px-5 py-7 sm:px-7  min-h-80'>
                <img onClick={closeWindow} className='absolute cursor-pointer w-6 sm:w-7 top-4 right-4' src={close} alt="" />
                
                {/* JOB TITLE */}
                <p className='font-bold pt-4 sm:pt-0 text-xl text-center'>{isLoading ? 'Loading...' : job?.jobTitle}</p>

                {/* QUALIFICATIONS */}
                <p className={isLoading ? 'hidden' : `font-bold text-sm pt-3`}>Qualifications:</p>

                <div className='flex flex-col gap-4 pl-4 pb-12 pt-5'>
                    {!isLoading && job?.qualifications?.map((qualification, index) => (
                        <div key={index} className='flex gap-3 items-start'>
                            <img className='w-4' src={check} alt="" />
                            <p className='text-sm font-medium'>{qualification}</p>
                        </div>
                    ))}

                </div>

                {/* APPLY NOW BUTTON */}
                <div className='mt-5 absolute bottom-5 w-full left-0 flex justify-center'>
                    <button onClick={toggleMessage} className={`${isLoading ? 'hidden' : 'block'} bg-green-600 hover:bg-green-700 duration-150 text-white rounded-md cursor-pointer px-4 py-2 text-xs sm:text-sm font-semibold`}>Apply Now</button>
                </div>
                    
            </div>

            {/* MESSAGE US */}
            <div className={isMessageOpen ? 'block' : 'hidden'}>
                <MessageUs closeUI={toggleMessage} isApplying={isApplying} />
            </div>
        </div>
    )
}

export default Qualifications