import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Swal from 'sweetalert2';
import Login from './Login';
import addjob from './assets/addjob.svg';
import drag from './assets/drag.svg';
import AddReq from './AddReq';
import EditReq from './EditReq';

function ReqAdmin() {
    const [isAddReqOpen, setIsAddReqOpen] = useState(false);
    const [isEditReqOpen, setIsEditOpen] = useState(false);
    const [reqID, setReqID] = useState(null);
    const [requirements, setRequirements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'requirements'), orderBy("order"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRequirements(data);
            setLoading(false);
        });
    
        return unsubscribe;
    }, []);

    const toggleAddReq = () => setIsAddReqOpen(!isAddReqOpen);
    const toggleEditReq = (id) => {
        setIsEditOpen(!isEditReqOpen);
        setReqID(id);
    };

    const removeReq = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: 'This requirement will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#b73a00",
            cancelButtonColor: "#08aa00",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                await deleteDoc(doc(db, "requirements", id));
                Swal.fire("Deleted!", "The requirement has been removed.", "success");
            } catch (err) {
                Swal.fire("Error!", "There was an issue deleting the requirement.", "error");
                console.error("Error removing requirement:", err);
            }
        }
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;
    
        const reorderedItems = Array.from(requirements);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);
    
        // Update local state
        setRequirements(reorderedItems);
    
        // Persist new order to Firestore
        reorderedItems.forEach(async (item, index) => {
            const itemRef = doc(db, "requirements", item.id);
            try {
                await updateDoc(itemRef, { order: index });
            } catch (err) {
                console.error("Failed to update order:", err);
            }
        });
    };

    return (
        <div className='pt-24 pb-10 px-5'>
            <div className='flex justify-between'>
                <p className='font-bold lg:text-xl'>REQUIREMENTS NEEDED</p>
                <button onClick={toggleAddReq} className='bg-white hover:bg-[#ffeeee] duration-150 cursor-pointer flex gap-2 items-center rounded-md shadow-md p-2 sm:px-4'>
                    <img className='w-7' src={addjob} alt="" />
                    <p className='hidden font-semibold text-sm sm:block text-[#990000]'>ADD REQUIREMENT</p>
                </button>
            </div>

            <div className='pt-5 flex flex-col gap-2 lg:px-20'>
                {loading ? (
                    <div className='flex rounded-sm justify-center items-center bg-[#D9D9D9] p-4'>
                        <p className='font-bold pr-3 text-sm text-center sm:text-base'>Loading...</p>
                    </div>
                ) : (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="requirements">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {requirements.map((req, index) => (
                                        <Draggable key={req.id} draggableId={req.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    className='flex gap-4 lg:gap-5 mb-2'
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <img className='w-5 cursor-grab' src={drag} alt="drag" />
                                                    <div className='flex rounded-sm w-full justify-between items-center bg-[#D9D9D9] p-3'>
                                                        <p className='font-bold pr-3 text-sm sm:text-base'>{req.name}</p>
                                                        <div className='flex gap-2'>
                                                            <button onClick={() => toggleEditReq(req.id)} className='text-xs rounded-sm cursor-pointer bg-[#08aa00] font-medium px-3 py-2 hover:bg-[#46b740] duration-200 text-white'>EDIT</button>
                                                            <button onClick={() => removeReq(req.id)} className='text-xs rounded-sm cursor-pointer bg-[#c50000] font-medium px-3 py-2 hover:bg-[#f80000] duration-200 text-white'>REMOVE</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
            </div>

            {isAddReqOpen && <AddReq closeAddReq={toggleAddReq} />}
            {isEditReqOpen && <EditReq closeEditReq={toggleEditReq} reqID={reqID} />}

            <div>
                <Login />
            </div>
        </div>
    );
}

export default ReqAdmin;
