import { Outlet, useLocation, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Submit from "../pages/Submit"
import Headers from "./Headers";
import SliderNav from "./SliderNav";
import { UnAuth } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { GrAdd, GrClose } from 'react-icons/gr'
import { RxHamburgerMenu } from 'react-icons/rx'
import NavDropDown from "./user/NavDropDown";

export default function Layout() {
    const path = useLocation().pathname.split("/")[1]
    const [hamburg, setHamburg] = useState(false)
    const renderHeaders = (path == 'signup' || path == 'login') ? false : true
    const [showCreate, setShowCreate] = useState(false)
    const [cookies, setCookies, removeCookie] = useCookies(['access-token'])
    const token = (cookies['access-token']) ? cookies['access-token'] : undefined;
    const user = useSelector((state) => {
        const value = state.user.user ? state.user.user : state.user
        return value
    })

    const notLoggedInNavElements = (
        <>
            <NavLink to={"/login"} className={"sm:inline-block hidden"} state={{ redirectLink: path }} >Login</NavLink>
            <NavLink to={"/signup"} className={"sm:inline-block hidden"} state={{ redirectLink: path }}>Signup</NavLink>
        </>
    )
    const loggedInNavElements = (
        <>
            <button onClick={openCreatePost} title="Create a Post" className=" hidden bg-transperant text-black  bg-main-orange font-bold p-2  m-0 rounded sm:flex items-center justify-center text-xl "><GrAdd /></button>
            <NavDropDown user={user} handleLogout={handleLogout} />
        </>
    )
    const renderHeaderElements = token ? loggedInNavElements : notLoggedInNavElements

    const dispatch = useDispatch()
    function handleLogout(e) {
        dispatch(UnAuth({ login: false }))
        removeCookie('access-token', { path: '/' });
        window.location.reload()
    }

    function openCreatePost() {
        setShowCreate(true)
        document.body.style.overflow = 'hidden';
    }
    function closeCreatePost() {
        setShowCreate(false)
        document.body.style.overflow = 'unset';
    }


    const sliderNav = <SliderNav
    open={openCreatePost}
    close={closeCreatePost}
    handleLogout={handleLogout}
    user={user}
    token={token}
    render={renderHeaderElements}
    setHamburg={setHamburg}
    hamburg={hamburg}
/>
    return (
        <section >
            {renderHeaders && <Headers open={openCreatePost} slider={sliderNav} close={closeCreatePost} handleLogout={handleLogout} user={user} token={token} render={renderHeaderElements} setHamburg={setHamburg} hamburg={hamburg} />}
            {showCreate && <Submit close={closeCreatePost} />}
            {<SliderNav
                open={openCreatePost}
                close={closeCreatePost}
                handleLogout={handleLogout}
                user={user}
                token={token}
                render={renderHeaderElements}
                setHamburg={setHamburg}
                hamburg={hamburg}
            />}
            <Outlet context={{ user, token }} />
        </section>
    )
}