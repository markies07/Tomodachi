import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

function Requirements() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requirements, setRequirements] = useState([]);

  const toggleModal = (selectedRequirement) => {
    setIsModalOpen(!isModalOpen);
    setItem(selectedRequirement); // Store the full requirement object
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    subscribeToReq();
  },[])

  const subscribeToReq = () => {
    const reqQuery = query(collection(db, 'requirements'), orderBy("order"));

    const unsubscribeReq = onSnapshot(reqQuery, (snapshot) => {
        setRequirements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
    });

    return () => {
        unsubscribeReq();
    }
  }

    return (
      <div className='pt-24 pb-10 px-5'>
        <p className='font-bold lg:text-xl'>REQUIREMENTS NEEDED</p>

        {/* REQUIREMENTS */}
        <div className='pt-5 flex flex-col gap-2 lg:px-20'>

          {loading ? (
              <div className='flex rounded-sm justify-center items-center bg-[#D9D9D9] p-4'>
                  <p className='font-bold pr-3 text-sm text-center sm:text-base'>Loading...</p>
              </div>
          ) :
          requirements.map((requirement) => (
              <div key={requirement.id} className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
                  <p className='font-bold pr-3 text-sm sm:text-base'>{requirement.name}</p>
                  
                  <button onClick={() => toggleModal(requirement)} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
                  
              </div>
          ))}

        </div>

        {/* MODAL */}
        {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} selected={item} />}

      </div>
    )
}

export default Requirements