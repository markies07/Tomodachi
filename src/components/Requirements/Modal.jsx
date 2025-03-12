import React, { useEffect, useState } from 'react'
import close from './assets/close.svg'
import resume from './assets/resume.png'
import medical from './assets/medical.png'
import vaccinationcard from './assets/vaccinationcard.png'
import nbiclearance from './assets/nbiclearance.png'
import policeclearance from './assets/policeclearance.png'
import barangayclearance from './assets/barangayclearance.png'
import sss from './assets/sss.png'
import pagibig from './assets/pagibig.png'
import philhealth from './assets/philhealth.png'
import tin from './assets/tin.png'
import diploma from './assets/diploma.png'
import employmentcert from './assets/employmentcert.png'
import birthcert from './assets/birthcert.png'
import marriagecert from './assets/marriagecert.png'
import idpictures from './assets/idpictures.png'
import validid from './assets/validid.png'
import folder from './assets/folder.png'
import fastener from './assets/fastener.png'
import envelope from './assets/envelope.png'


function Modal({closeModal, setItem, selected}) {

    const images = {
        resume,
        medical,
        vaccinationcard,
        nbiclearance,
        policeclearance,
        barangayclearance,
        sss,
        pagibig,
        philhealth,
        tin,
        diploma,
        employmentcert,
        birthcert,
        marriagecert,
        idpictures,
        validid,
        folder,
        fastener,
        envelope
      };

    const closeUI = () => {
        setItem('');
        closeModal();
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50"  style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
            <button className="absolute top-5 right-5">
                <img onClick={closeUI} className='w-10 cursor-pointer' src={close} alt="" />
            </button>

            <img src={images[selected]} alt="Enlarged Pet" className="max-w-full max-h-[80%]" />
        </div>
    )
}

export default Modal