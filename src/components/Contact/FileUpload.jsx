import React, { useRef, useState } from 'react';
import upload from './assets/upload.svg';

function FileUpload({ onFileChange, fileName, setFileName }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            onFileChange(e); // send event back to parent if needed
        }
    };

    return (
        <div className="bg-[#D9D9D9] rounded-sm px-3 py-2 flex justify-between items-center w-full">
            <span className={`${fileName ? 'text-[#323232]' : 'text-[#878787]'} truncate`}>{fileName || 'Attach your resume (doc/docx file only)'}</span>
            <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="bg-[#6B6B6B] justify-center text-xs duration-150 cursor-pointer hover:bg-[#535353] text-white font-semibold px-2 sm:pr-3 py-2 flex items-center gap-2 rounded-sm"
            >
                <img className='w-5' src={upload} alt="" />
                <span className='hidden sm:block'>UPLOAD FILE</span>
            </button>
            <input
                type="file"
                name="resumeFile"
                accept=".doc,.docx"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
                required
            />
        </div>
    );
}

export default FileUpload