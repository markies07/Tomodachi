import React, { useEffect, useState } from 'react'
import factory from './assets/factory.svg'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase';
import Qualifications from './Qualifications';
import novacant from './assets/novacant.svg';
import search from './assets/search.svg'; // Assuming you have this asset

function Jobs() {
    const [jobsDasma, setJobsDasma] = useState([]);
    const [jobsGentri, setJobsGentri] = useState([]);
    const [jobsRosario, setJobsRosario] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isQualOpen, setIsQualOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    // States for filtered jobs
    const [filteredJobsDasma, setFilteredJobsDasma] = useState([]);
    const [filteredJobsGentri, setFilteredJobsGentri] = useState([]);
    const [filteredJobsRosario, setFilteredJobsRosario] = useState([]);
    
    // States to control visibility of each location section
    const [showDasma, setShowDasma] = useState(true);
    const [showGentri, setShowGentri] = useState(true);
    const [showRosario, setShowRosario] = useState(true);

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

            // Process job data
            const dasmaJobs = dasmaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const gentriJobs = gentriSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const rosarioJobs = rosarioSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Set both original and filtered state
            setJobsDasma(dasmaJobs);
            setJobsGentri(gentriJobs);
            setJobsRosario(rosarioJobs);
            
            setFilteredJobsDasma(dasmaJobs);
            setFilteredJobsGentri(gentriJobs);
            setFilteredJobsRosario(rosarioJobs);
            
        } catch (err) {
            console.error("Error fetching jobs:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        
        if (!value) {
            // If search is cleared, show all locations and reset filtered jobs
            setShowDasma(true);
            setShowGentri(true);
            setShowRosario(true);
            setFilteredJobsDasma(jobsDasma);
            setFilteredJobsGentri(jobsGentri);
            setFilteredJobsRosario(jobsRosario);
            return;
        }

        // Filter jobs for each location
        const filteredDasma = jobsDasma.filter(job => 
            job.jobTitle.toLowerCase().includes(value)
        );
        const filteredGentri = jobsGentri.filter(job => 
            job.jobTitle.toLowerCase().includes(value)
        );
        const filteredRosario = jobsRosario.filter(job => 
            job.jobTitle.toLowerCase().includes(value)
        );

        // Update filtered jobs
        setFilteredJobsDasma(filteredDasma);
        setFilteredJobsGentri(filteredGentri);
        setFilteredJobsRosario(filteredRosario);

        // Update visibility of each location based on whether there are matching jobs
        setShowDasma(filteredDasma.length > 0);
        setShowGentri(filteredGentri.length > 0);
        setShowRosario(filteredRosario.length > 0);
    };

    const toggleQual = (jobID) => {
        setIsQualOpen(!isQualOpen);
        setSelectedJob(jobID);
    }

    return (
        <div className='pt-24 pb-10 px-5'>
            <div className='flex justify-between items-center'>
                <p className='font-bold lg:text-xl'>JOBS VACANCIES</p>
                <div className='w-32 relative sm:w-52'>
                    <img className='absolute w-5 top-[5px] left-2 sm:top-[7px]' src={search} alt="" />
                    <input 
                        value={searchTerm} 
                        onChange={handleSearch} 
                        className='border-2 text-sm text-[#990000] sm:text-base font-medium w-full py-1 pl-8 px-3 outline-none border-[#990000] placeholder:text-[#990000] capitalize rounded-sm' 
                        type="text" 
                        placeholder='Search Job' 
                    />
                </div>
            </div>

            {/* JOBS */}
            <div className='pt-8 md:pt-10 flex flex-col gap-10'>

                {/* DASMARINAS */}
                {showDasma && (
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
                                    <p className='font-semibold flex text-[#990000] justify-center shrink-0'>Loading...</p>
                                </div>
                            ) :
                            filteredJobsDasma.length === 0 ? (
                                <div className='flex flex-col gap-3 py-10 justify-center items-center bg-white rounded-sm text-sm sm:text-base'>
                                    <img className='w-10' src={novacant} alt="" />
                                    <p className='font-semibold flex text-[#990000] justify-center shrink-0'>No Vacancies</p>
                                </div>
                            ) :
                            filteredJobsDasma.map((job) => (
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
                )}

                {/* GENERAL TRIAS */}
                {showGentri && (
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
                                    <p className='font-semibold flex text-[#990000] justify-center shrink-0'>Loading...</p>
                                </div>
                            ) :
                            filteredJobsGentri.length === 0 ? (
                                <div className='flex flex-col gap-3 py-10 justify-center items-center bg-white rounded-sm text-sm sm:text-base'>
                                    <img className='w-10' src={novacant} alt="" />
                                    <p className='font-semibold flex text-[#990000] justify-center shrink-0'>No Vacancies</p>
                                </div>
                            ) :
                            filteredJobsGentri.map((job) => (
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
                )}

                {/* ROSARIO */}
                {showRosario && (
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
                                    <p className='font-semibold flex text-[#990000] justify-center shrink-0'>Loading...</p>
                                </div>
                            ) :
                            filteredJobsRosario.length === 0 ? (
                                <div className='flex flex-col gap-3 py-10 justify-center items-center bg-white rounded-sm text-sm sm:text-base'>
                                    <img className='w-10' src={novacant} alt="" />
                                    <p className='font-semibold flex text-[#990000] justify-center shrink-0'>No Vacancies</p>
                                </div>
                            ) :
                            filteredJobsRosario.map((job) => (
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
                )}
            </div>

            {/* Show message when no locations match search */}
            {!showDasma && !showGentri && !showRosario && searchTerm && (
                <div className='flex flex-col items-center justify-center py-10 bg-white rounded-lg mt-5'>
                    <img className='w-16' src={novacant} alt="" />
                    <p className='font-semibold text-[#990000] mt-4'>No jobs matching "{searchTerm}" found in any location</p>
                </div>
            )}

            <div className={isQualOpen ? 'block' : 'hidden'}>
                <Qualifications closeQual={toggleQual} jobID={selectedJob} setSelectedJob={setSelectedJob} />
            </div>
        </div>
    )
}

export default Jobs