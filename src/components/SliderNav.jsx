import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GrClose } from 'react-icons/gr'
import { BsSearch } from 'react-icons/bs'

function SliderNav({ open, close, handleLogout, token, user, setHamburg, hamburg }) {
  function closeSlider() {
    setHamburg(false)
    document.body.style.overflow = 'unset';
    document.body.style.overflowX = 'hidden';
  }
  function openCreatePost() {
    open()
    closeSlider()
  }
  const loggedInNavElements = (
    <>
      <li>
        <button onClick={openCreatePost} title="Create a Post" className="">Create Post</button>
      </li>
      <li>
        <Link to={`/${user.username}`}>Profile</Link>
      </li>
      <li>
        <Link to={"/"}>Settings</Link>
      </li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </>
  )
  const notLoggedInNavElements = (
    <>
      <li>
        <Link to={"/login"}>Login</Link>
      </li>
      <li>
        <Link to={"/signup"}>Signup</Link>
      </li>
    </>
  )
  return (
    <section className={`sm:hidden fixed top-0  w-full z-[60] bg-black/40 flex justify-center items-center`}>
      <div
        onClick={closeSlider}
        className={`${hamburg ? " " : " opacity-0 pointer-events-none"} z-50 transition-all duration-300 w-full h-screen absolute left-0 top-0 bg-black/30`}>

      </div>
      <nav className={`flex  absolute  top-0 right-0 z-50 h-screen w-3/4 bg-white bg border-2 shadow-lg transition-transform duration-300 ${hamburg ? "translate-x-0" : "translate-x-full"}`}>

        <GrClose size={30} className={` ${hamburg ? "inline-block" : "hidden"} cursor-pointer slider sm:hidden absolute top-0 right-0 z-[100] mr-3 mt-3 `} onClick={closeSlider} />
        <ul className=" pl-2 mt-10 z-[51]">
          <Link to={`/${user.username}`} className="flex items-center">
            <img src={user.avatar} alt={`${user.fullname}'s profile picture`} className="w-20 h-20 border-2 border-main-orange rounded-full object-cover mr-4 shadow" />
            <span>
              <h1 className=" text-h1Clamp font-[Karla] ">{user.fullname}</h1>
              <p className="text-gray-500 text-pClamp ml-0.5">{user.username}</p>
            </span>
          </Link>
          {token ? loggedInNavElements : notLoggedInNavElements}
        </ul>
      </nav>
    </section>
  )
}

export default SliderNav