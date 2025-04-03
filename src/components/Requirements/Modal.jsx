import React, { useEffect, useState } from 'react'
import close from './assets/close.svg'


function Modal({closeModal, selected}) {

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50"  style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
            <button className="absolute top-5 right-5">
                <img onClick={closeModal} className='w-10 cursor-pointer' src={close} alt="" />
            </button>

            <img src={selected.imageUrl} alt="Requirements" className="max-w-full max-h-[80%]" />
        </div>
    )
}

export default Modal