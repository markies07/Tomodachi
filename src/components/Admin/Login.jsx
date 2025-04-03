import React, { useState } from 'react'
import tomochan from './assets/tomochan.svg'
import { notifyError, notifySuccess } from '../CustomToast';

function Login() {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === 'tomodachi2014') {
            setIsLoggedin(true);
            notifySuccess('Logged in successfully!')
        } else {
            notifyError('Invalid username or password!');
        }
    };

    return (
        <div className={`${isLoggedin ? 'hidden' : 'block'} fixed z-10 right-0 top-0 px-5 py-5 sm:px-10 sm:py-10 bg-secondary min-h-screen max-h-screen overflow-auto w-full flex flex-col justify-center items-center bg-white`}>
            
            <p className='absolute top-[75px] font-semibold rounded-br-2xl left-0 px-7 pr-8 py-3 bg-[#FF2323] text-white'>ADMIN</p>

            <img className='w-36 pb-5' src={tomochan} alt="" />

            <div className='flex flex-col justify-start gap-5 w-full max-w-96 px-5 pb-10'>
                <div className='flex flex-col gap-1'>
                    <p className='font-semibold'>User Name:</p>
                    <input onChange={(e) => setUsername(e.target.value)} className='bg-[#D9D9D9] rounded-sm p-2 pl-3 outline-none' type="text" />
                </div>

                <div className='flex flex-col gap-1'>
                    <p className='font-semibold'>Password:</p>
                    <input onChange={(e) => setPassword(e.target.value)} className='bg-[#D9D9D9] rounded-sm p-2 pl-3 outline-none' type="password" />
                </div>
            </div>

            <button onClick={handleLogin} className='bg-[#FF2323] hover:bg-[#cd2e2e] duration-150 cursor-pointer text-white font-semibold rounded-sm px-7 py-1'>LOGIN</button>

        </div>
    )
}

export default Login