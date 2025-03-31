import React, { useEffect, useState } from 'react'
import factory from './assets/factory.svg'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase';
import Qualifications from './Qualifications';
import novacant from './assets/novacant.svg';

function Jobs() {

    const [jobsDasma, setJobsDasma] = useState([]);
    const [jobsGentri, setJobsGentri] = useState([]);
    const [jobsRosario, setJobsRosario] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isQualOpen, setIsQualOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchJobs();
    }, []);

    
    const fetchJobs = async () => {
        try {
            setLoading(true);

            // Queries for each location
            const jobsDasmaQuery = query(collection(db, "jobVacancies"), where("location", "==", "Dasmariñas"));
            const jobsGentriQuery = query(collection(db, "jobVacancies"), where("location", "==", "General Trias"));
            const jobsRosarioQuery = query(collection(db, "jobVacancies"), where("location", "==", "Rosario"));

            // Fetch all jobs in parallel
            const [dasmaSnapshot, gentriSnapshot, rosarioSnapshot] = await Promise.all([
                getDocs(jobsDasmaQuery),
                getDocs(jobsGentriQuery),
                getDocs(jobsRosarioQuery)
            ]);

            // Map results to state variables
            setJobsDasma(dasmaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setJobsGentri(gentriSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setJobsRosario(rosarioSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
            console.error("Error fetching jobs:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleQual = (jobID) => {
        setIsQualOpen(!isQualOpen);
        setSelectedJob(jobID);
    }


    return (
        <div className='pt-24 pb-10 px-5'>
            <p className='font-bold lg:text-xl'>JOBS VACANCIES</p>

            {/* JOBS */}
            <div className='pt-8 md:pt-10 flex flex-col gap-10'>

                {/* DASMARINAS */}
                <div className='relative bg-[#D9D9D9] pt-20 px-4 lg:mx-20 pb-4 rounded-lg'>
                    <div className='bg-[#990000] w-56 -top-4 left-4 absolute rounded-bl-2xl rounded-tr-2xl p-4 items-center flex gap-4'>
                        <img className='w-9' src={factory} alt="" />
                        <div className='text-white'>
                            <p className='text-xl font-bold'>Dasmariñas</p>
                            <p className='text-xs font-medium'>Full-time Job</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>

                        {/* VACANCIES */}
                        {isLoading ? (
                            <div className='flex justify-center items-center bg-white py-3 pr-2 rounded-sm text-sm sm:text-base'>
                                <p className=' font-semibold flex text-[#990000] justify-center shrink-0'>Loading...</p>
                            </div>
                        ) :
                        jobsDasma.length === 0 ? (
                            <div className='flex flex-col gap-3 py-10 justify-center items-center bg-white rounded-sm text-sm sm:text-base'>
                                <img className='w-10' src={novacant} alt="" />
                                <p className='font-semibold flex text-[#990000] justify-center shrink-0'>No Vacancies</p>
                            </div>
                        ) :
                        jobsDasma.map((job) => (
                            <div key={job.id} className='flex justify-between items-center bg-white py-3 pr-2 rounded-sm text-sm sm:text-base'>
                                <div className='flex font-semibold items-center w-full pr-3 text-[#990000]'>
                                    <p className='w-12 sm:w-16 flex justify-center shrink-0'>({job.vacancies})</p>
                                    <p className='w-full leading-5'>{job.jobTitle}</p>
                                </div>
                                <button onClick={() => toggleQual(job.id)} className='bg-[#990000] text-white font-medium text-xs py-1 px-2 cursor-pointer hover:bg-[#a74141] duration-300 rounded-sm sm:px-3 sm:font-bold sm:py-2'>INFO</button>
                            </div>
                        ))}

                    </div>
                </div>

                {/* GENERAL TRIAS */}
                <div className='relative bg-[#D9D9D9] pt-20 px-4 lg:mx-20 pb-4 rounded-lg'>
                    <div className='bg-[#990000] w-56 -top-4 left-4 absolute rounded-bl-2xl rounded-tr-2xl p-4 items-center flex gap-4'>
                        <img className='w-9' src={factory} alt="" />
                        <div className='text-white'>
                            <p className='text-xl font-bold'>General Trias</p>
                            <p className='text-xs font-medium'>Full-time Job</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>

                        {/* VACANCIES */}
                        {isLoading ? (
                            <div className='flex justify-center items-center bg-white py-3 pr-2 rounded-sm text-sm sm:text-base'>
                                <p className=' font-semibold flex text-[#990000] justify-center shrink-0'>Loading...</p>
                            </div>
                        ) :
                        jobsGentri.length === 0 ? (
                            <div className='flex flex-col gap-3 py-10 justify-center items-center bg-white rounded-sm text-sm sm:text-base'>
                                <img className='w-10' src={novacant} alt="" />
                                <p className='font-semibold flex text-[#990000] justify-center shrink-0'>No Vacancies</p>
                            </div>
                        ) :
                        jobsGentri.map((job) => (
                            <div key={job.id} className='flex justify-between items-center bg-white py-3 pr-2 rounded-sm text-sm sm:text-base'>
                                <div className='flex font-semibold items-center w-full pr-3 text-[#990000]'>
                                    <p className='w-12 sm:w-16 flex justify-center shrink-0'>({job.vacancies})</p>
                                    <p className='w-full leading-5'>{job.jobTitle}</p>
                                </div>
                                <button onClick={() => toggleQual(job.id)} className='bg-[#990000] text-white font-medium text-xs py-1 px-2 cursor-pointer hover:bg-[#a74141] duration-300 rounded-sm sm:px-3 sm:font-bold sm:py-2'>INFO</button>
                            </div>
                        ))}

                    </div>
                </div>


                {/* ROSARIO */}
                <div className='relative bg-[#D9D9D9] pt-20 px-4 lg:mx-20 pb-4 rounded-lg'>
                    <div className='bg-[#990000] w-56 -top-4 left-4 absolute rounded-bl-2xl rounded-tr-2xl p-4 items-center flex gap-4'>
                        <img className='w-9' src={factory} alt="" />
                        <div className='text-white'>
                            <p className='text-xl font-bold'>Rosario</p>
                            <p className='text-xs font-medium'>Full-time Job</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>

                        {/* VACANCIES */}
                        {isLoading ? (
                            <div className='flex justify-center items-center bg-white py-3 pr-2 rounded-sm text-sm sm:text-base'>
                                <p className=' font-semibold flex text-[#990000] justify-center shrink-0'>Loading...</p>
                            </div>
                        ) :
                        jobsRosario.length === 0 ? (
                            <div className='flex flex-col gap-3 py-10 justify-center items-center bg-white rounded-sm text-sm sm:text-base'>
                                <img className='w-10' src={novacant} alt="" />
                                <p className='font-semibold flex text-[#990000] justify-center shrink-0'>No Vacancies</p>
                            </div>
                        ) :
                        jobsRosario.map((job) => (
                            <div key={job.id} className='flex justify-between items-center bg-white py-3 pr-2 rounded-sm text-sm sm:text-base'>
                                <div className='flex font-semibold items-center w-full pr-3 text-[#990000]'>
                                    <p className='w-12 sm:w-16 flex justify-center shrink-0'>({job.vacancies})</p>
                                    <p className='w-full leading-5'>{job.jobTitle}</p>
                                </div>
                                <button onClick={() => toggleQual(job.id)} className='bg-[#990000] text-white font-medium text-xs py-1 px-2 cursor-pointer hover:bg-[#a74141] duration-300 rounded-sm sm:px-3 sm:font-bold sm:py-2'>INFO</button>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <div className={isQualOpen ? 'block' : 'hidden'}>
                <Qualifications closeQual={toggleQual} jobID={selectedJob} setSelectedJob={setSelectedJob} />
            </div>

        </div>
    )
}

export default Jobs