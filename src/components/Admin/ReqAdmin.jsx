import React, { useEffect, useState } from 'react'
import Login from './Login'
import addjob from './assets/addjob.svg';
import AddReq from './AddReq';
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';
import EditReq from './EditReq';
import Swal from 'sweetalert2';

function ReqAdmin() {
    const [isAddReqOpen, setIsAddReqOpen] = useState(false);
    const [isEditReqOpen, setIsEditOpen] = useState(false);
    const [reqID, setReqID] = useState(null);
    const [requirements, setRequirements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        subscribeToReq();
    },[])

    const subscribeToReq = () => {
        const reqQuery = query(collection(db, 'requirements'));

        const unsubscribeReq = onSnapshot(reqQuery, (snapshot) => {
            setRequirements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });

        return () => {
            unsubscribeReq();
        }
    }

    const toggleAddReq = () => {
        setIsAddReqOpen(!isAddReqOpen);
    }

    const toggleEditReq = (selected) => {
        setIsEditOpen(!isEditReqOpen);
        setReqID(selected);
    }

    const removeReq = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: 'This requirement will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#b73a00",
            cancelButtonColor: "#08aa00",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if(result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, "requirements", id));
                    Swal.fire("Deleted!", "The requirement has been removed.", "success");
                } catch (err) {
                    Swal.fire("Error!", "There was an issue deleting the requirement.", "error");
                    console.error("Error removing requirement:", err);
                }
            }
        })
    }


    return (
        <div className='pt-24 pb-10 px-5'>
            <div className='flex justify-between'>
                <p className='font-bold lg:text-xl'>REQUIREMENTS NEEDED</p>

                <button onClick={toggleAddReq} className='bg-white hover:bg-[#ffeeee] duration-150 cursor-pointer flex gap-2 justify-end items-center rounded-md shadow-md p-2 sm:px-4'>
                    <img className='w-7' src={addjob} alt="" />
                    <p className='hidden font-semibold text-sm sm:block text-[#990000]'>ADD REQUIREMENT</p>
                </button>
            </div>

            <div className='pt-5 flex flex-col gap-2 lg:px-20'>

                {loading ? (
                    <div className='flex rounded-sm justify-center items-center bg-[#D9D9D9] p-4'>
                        <p className='font-bold pr-3 text-sm text-center sm:text-base'>Loading...</p>
                    </div>
                ) :
                requirements.map((requirement) => (
                    <div key={requirement.id} className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
                        <p className='font-bold pr-3 text-sm sm:text-base'>{requirement.name}</p>
                        <div className='flex gap-2'>
                            <button onClick={() => toggleEditReq(requirement.id)} className='text-xs rounded-sm cursor-pointer bg-[#08aa00] font-medium px-3 py-2 hover:bg-[#46b740] duration-200 text-white'>EDIT</button>
                            <button onClick={() => removeReq(requirement.id)} className='text-xs rounded-sm cursor-pointer bg-[#c50000] font-medium px-3 py-2 hover:bg-[#f80000] duration-200 text-white'>REMOVE</button>
                        </div>
                    </div>
                ))}

            </div>

            {/* ADD REQUIREMENT */}
            <div className={isAddReqOpen ? 'block' : 'hidden'}>
                <AddReq closeAddReq={toggleAddReq} />
            </div>

            <div className={isEditReqOpen ? 'block' : 'hidden'}>
                <EditReq closeEditReq={toggleEditReq} reqID={reqID} />
            </div>

            {/* LOGIN */}
            <div>
                <Login />
            </div>


        </div>
    )
}

export default ReqAdmin