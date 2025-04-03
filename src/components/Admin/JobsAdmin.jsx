import React, { useEffect, useState } from 'react'
import factory from './assets/factory.svg'
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../../firebase';
import Qualifications from '../Jobs/Qualifications';
import novacant from './assets/novacant.svg';
import addjob from './assets/addjob.svg';
import EditJob from './EditJob';
import Swal from 'sweetalert2';
import AddJob from './AddJob';
import Login from './Login';

function JobsAdmin() {
    const [jobsDasma, setJobsDasma] = useState([]);
    const [jobsGentri, setJobsGentri] = useState([]);
    const [jobsRosario, setJobsRosario] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isQualOpen, setIsQualOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const [isAddJobOpen, setIsAddJobOpen] = useState(false);
    const [location, setLocation] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        subscribeToJobs();
    }, []);

    console.log(location)

    
    const subscribeToJobs = () => {
    
        // Queries for each location
        const jobsDasmaQuery = query(collection(db, "jobVacancies"), where("location", "==", "Dasmariñas"));
        const jobsGentriQuery = query(collection(db, "jobVacancies"), where("location", "==", "General Trias"));
        const jobsRosarioQuery = query(collection(db, "jobVacancies"), where("location", "==", "Rosario"));
    
        // Real-time listeners for each location
        const unsubscribeDasma = onSnapshot(jobsDasmaQuery, (snapshot) => {
            setJobsDasma(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
    
        const unsubscribeGentri = onSnapshot(jobsGentriQuery, (snapshot) => {
            setJobsGentri(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
    
        const unsubscribeRosario = onSnapshot(jobsRosarioQuery, (snapshot) => {
            setJobsRosario(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
    
        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            unsubscribeDasma();
            unsubscribeGentri();
            unsubscribeRosario();
        };
    };

    const toggleQual = (jobID) => {
        setIsQualOpen(!isQualOpen);
        setSelectedJob(jobID);
    }

    const toggleAddJob = (location) => {
        setIsAddJobOpen(!isAddJobOpen);
        setLocation(location);
    }


    // REMOVE JOB
    const removeJob = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This job will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#b73a00",
            cancelButtonColor: "#08aa00",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, "jobVacancies", id));
                    Swal.fire("Deleted!", "The job has been removed.", "success");
                } catch (err) {
                    Swal.fire("Error!", "There was an issue deleting the job.", "error");
                    console.error("Error removing job:", err);
                }
            }
        });
    };


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

                    <button onClick={() => toggleAddJob('Dasmariñas')} className='bg-white hover:bg-[#ffeeee] duration-150 cursor-pointer flex gap-2 items-center rounded-md shadow-sm p-2 sm:px-3 absolute top-4 right-4'>
                        <img className='w-7' src={addjob} alt="" />
                        <p className='hidden font-semibold text-sm sm:block text-[#990000]'>ADD JOB</p>
                    </button>

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
                                <button onClick={() => toggleQual(job.id)} className='bg-[#08aa00] mr-1 text-white font-medium text-xs py-1 px-2 cursor-pointer hover:bg-[#3c8d39] duration-300 rounded-sm sm:px-3 sm:font-bold sm:py-2'>EDIT</button>
                                <button onClick={() => removeJob(job.id)} className='bg-[#b73a00] text-white font-medium text-xs py-1 px-2 cursor-pointer hover:bg-[#992727] duration-300 rounded-sm sm:px-3 sm:font-bold sm:py-2'>REMOVE</button>
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

                    <button onClick={() => toggleAddJob('General Trias')} className='bg-white hover:bg-[#ffeeee] duration-150 cursor-pointer flex gap-2 items-center rounded-md shadow-sm p-2 sm:px-3 absolute top-4 right-4'>
                        <img className='w-7' src={addjob} alt="" />
                        <p className='hidden font-semibold text-sm sm:block text-[#990000]'>ADD JOB</p>
                    </button>

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
                                <button onClick={() => toggleQual(job.id)} className='bg-[#08aa00] mr-1 text-white font-medium text-xs py-1 px-2 cursor-pointer hover:bg-[#3c8d39] duration-300 rounded-sm sm:px-3 sm:font-bold sm:py-2'>EDIT</button>
                                <button onClick={() => removeJob(job.id)} className='bg-[#b73a00] text-white font-medium text-xs py-1 px-2 cursor-pointer hover:bg-[#992727] duration-300 rounded-sm sm:px-3 sm:font-bold sm:py-2'>REMOVE</button>
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

                    <button onClick={() => toggleAddJob('Rosario')} className='bg-white hover:bg-[#ffeeee] duration-150 cursor-pointer flex gap-2 items-center rounded-md shadow-sm p-2 sm:px-3 absolute top-4 right-4'>
                        <img className='w-7' src={addjob} alt="" />
                        <p className='hidden font-semibold text-sm sm:block text-[#990000]'>ADD JOB</p>
                    </button>

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
                                <button onClick={() => toggleQual(job.id)} className='bg-[#08aa00] mr-1 text-white font-medium text-xs py-1 px-2 cursor-pointer hover:bg-[#3c8d39] duration-300 rounded-sm sm:px-3 sm:font-bold sm:py-2'>EDIT</button>
                                <button onClick={() => removeJob(job.id)} className='bg-[#b73a00] text-white font-medium text-xs py-1 px-2 cursor-pointer hover:bg-[#992727] duration-300 rounded-sm sm:px-3 sm:font-bold sm:py-2'>REMOVE</button>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {/* QUALIFICATIONS */}
            <div className={isQualOpen ? 'block' : 'hidden'}>
                <EditJob closeQual={toggleQual} jobID={selectedJob} setSelectedJob={setSelectedJob} />
            </div>

            {/* ADD JOB */}
            <div className={isAddJobOpen ? 'block' : 'hidden'}>
                <AddJob closeAddJob={toggleAddJob} location={location} setLocation={setLocation} />
            </div>

            {/* LOGIN */}
            <div>
                <Login />
            </div>

        </div>
    )
}

export default JobsAdmin