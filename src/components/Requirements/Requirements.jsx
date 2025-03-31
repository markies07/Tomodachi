import React, { useEffect, useState } from 'react'
import Modal from './Modal';

function Requirements() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState('');

  const toggleModal = (selected) => {
    setIsModalOpen(!isModalOpen);
    setItem(selected);
  }

  console.log(item)


    useEffect(() => {
            window.scrollTo(0, 0);
    }, []);



    return (
      <div className='pt-24 pb-10 px-5'>
        <p className='font-bold lg:text-xl'>REQUIREMENTS NEEDED</p>

        {/* REQUIREMENTS */}
        <div className='pt-5 flex flex-col gap-2 lg:px-20'>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>Resume</p>
            <button onClick={() => toggleModal('resume')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>Medical</p>
            <button onClick={() => toggleModal('medical')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>Vaccination Card</p>
            <button onClick={() => toggleModal('vaccinationcard')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>NBI Clearance</p>
            <button onClick={() => toggleModal('nbiclearance')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>Police Clearance</p>
            <button onClick={() => toggleModal('policeclearance')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>Barangay Clearance</p>
            <button onClick={() => toggleModal('barangayclearance')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>SSS E1/E4/Verification Slip Form</p>
            <button onClick={() => toggleModal('sss')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>Pagibig MDF</p>
            <button onClick={() => toggleModal('pagibig')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>PhilHealth New ID/PMRF</p>
            <button onClick={() => toggleModal('philhealth')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>TIN Form</p>
            <button onClick={() => toggleModal('tin')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>School Credential (Diploma/TOR)</p>
            <button onClick={() => toggleModal('diploma')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>Employment Certificate</p>
            <button onClick={() => toggleModal('employmentcert')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>Birth Certificate</p>
            <button onClick={() => toggleModal('birthcert')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>Marriage Certificate</p>
            <button onClick={() => toggleModal('marriagecert')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>2 Different Valid ID</p>
            <button onClick={() => toggleModal('validid')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>1x1 and 2x2 ID Picture</p>
            <button onClick={() => toggleModal('idpictures')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>Long White Folder</p>
            <button onClick={() => toggleModal('folder')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>Paper Fastener</p>
            <button onClick={() => toggleModal('fastener')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

          <div className='flex rounded-sm justify-between items-center bg-[#D9D9D9] p-3'>
            <p className='font-bold pr-3 text-sm sm:text-base'>Long Brown Envelope</p>
            <button onClick={() => toggleModal('envelope')} className='text-xs rounded-sm cursor-pointer bg-[#990000] font-medium px-3 py-2 hover:bg-[#a74141] duration-200 text-white'>VIEW <br className='sm:hidden' /> SAMPLE</button>
          </div>

        </div>

        {/* MODAL */}
        <div className={isModalOpen ? 'block' : 'hidden'}>
          <Modal closeModal={setIsModalOpen} setItem={setItem} selected={item} />
        </div>

      </div>
    )
}

export default Requirements