import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

function NavDropDown({ user, handleLogout }) {
    const navigate = useNavigate()
    const params  = useParams().username
    const [show, setShow] = useState(false);
    function handleProfile(e){
        e.preventDefault()
        if(params){
            navigate(`/${user.username}`)
            setTimeout(()=>{
                window.location.reload()
            },100)
        }
        navigate(`/${user.username}`)
    }
    return (
        <div className="relative text-left min-w-[100px] max-h-[50px] sm:inline-block hidden " onClick={() => { setShow(!show) }}>
            <div className="w-full">
                <button type="button" className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md border-main-orange border-[2px] bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    <img src={user.avatar} alt={`${user.fullname}'s profile picture`} className='w-8 h-8 rounded-full object-cover mr-1 shadow' />

                    <svg className="-mr-1 h-5 w-5 text-main-orange" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className={`${show ? 'absolute' : 'hidden'} w-full overflow-hidden z-50 right-0 mt-2 origin-top-right rounded-md bg-white shadow-lg`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="" role="none">
                    <Link onClick={handleProfile}>
                        <span className="text-gray-700 block px-4 py-2 z-50 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Profile</span>
                    </Link>
                    <Link to={"/settings"}>
                        <span className="text-gray-700 block px-4 py-2 z-50 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Settings</span>
                    </Link>
                        <button type="submit" className="text-gray-700 block w-[400px] px-4 py-2 text-left text-sm" onClick={handleLogout} role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
                </div>
            </div>
        </div>

    )
}

export default NavDropDown