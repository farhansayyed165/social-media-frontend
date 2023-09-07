import { React, useState, useEffect } from "react"
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux';
import { Auth } from '../features/userSlice';
import { useLocation, useOutletContext, Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";
import {ReactComponent as GroupSelfie} from '../assets/Login.svg'
import {ReactComponent as LoginResponsive} from '../assets/Login-responsive.svg'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import './login.css'



export default function Login() {
    // let redirectToPreviousPage 
    const navigate = useNavigate()
    const [navigateto, setNavigateTo] = useOutletContext()

    const redirectToPreviousPage = useLocation().state?.redirectLink ? useLocation().state.redirectLink : "/"

    const dispatch = useDispatch()
    const [cookies, setCookies] = useCookies(['access-token'])
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState(useLocation().state?.message)

    function handleSubmit(e) {
        e.preventDefault()
        setNavigateTo(redirectToPreviousPage)
        loginUser(loginData)
            .then(res => {
                setCookies('access-token', res.accessToken, { path: '/', maxAge: 864000 })
                const { fullname, email, password, avatar, gender, username, _id, following, followers, saved } = res.user;
                dispatch(Auth({ fullname, email, password, avatar, username, _id, followers, following, saved, login: true }));
            })

    }
    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    function closePopup() {
        setMessage(false)
    }
    function navigateBack(){
        navigate(-1)
    }
    return (
        <div className="h-screen bg-slate-300 font-Inter">
            <button type="button" onClick={navigateBack} className="rounded-full absolute top-0 left-0 p-5 border-2 border-[#F9A826] mx-4 mt-5"><AiOutlineArrowLeft/></button>
            <div className={`${message ? 'absolute' : 'hidden'}  w-full m-auto left-0 right-0 top-0 bottom-0 z-50 bg-black/10`}>
                <div className="absolute w-[250px] h-[100px] border-2 border-red-500 m-auto left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-white rounded flex-col">
                    <h2 className=" font-semibold mb-4">{message}</h2>
                    <button onClick={closePopup} className="bg-[#F9A826] border-2 border-[#C7861E] rounded-sm text-white px-4">OK</button>
                </div>
            </div>
            <GroupSelfie className="login-group absolute right-0 xl:max-w-[66%] lg:max-w-[66%] md:max-w-1/2 max-h-full p-1 "/>
            <LoginResponsive className="login-responsive max-h-full p-1 absolute right-0 max-w-1/2"/>
            <div className="flex lg:max-w-1/3 md:max-w-1/2 sm:max-w-1/2 flex-col h-screen items-center bg-white">

                <div className="w-full h-2/3 flex  mt-[15vh] items-center  flex-col">
                    <div className="w-9/10 text-xl">
                        <span className="mb-2 mt-5">Don't have an account?</span>
                        <Link to={"/signup"} className="mb-2 mt-1 mx-4 text-[#F9A826] font-semibold">Signup Here</Link>
                        {/* <div className="flex items-center justify-center">
                                <span className="absolute bg-white px-2">OR</span>
                                <hr className="block w-full h-2px my-[30px] border-black dark:bg-gray-700 rounded"></hr>
                        </div> */}
                        <hr className="block w-9/10 h-2px my-12 border-black dark:bg-gray-700 rounded"></hr>
                        <h1 className="w-full text-2xl text-bold mb-6">Login</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="login-form w-9/10">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            onChange={handleChange}
                            placeholder="Your Email Address"
                            value={loginData.email}
                            name='email'
                            className="w-9/10 p-2 rounded border-2 block border-slate-400 mb-10 font-[Karla]"
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            id='password'
                            type="password"
                            onChange={handleChange}
                            placeholder="Your Password"
                            value={loginData.password}
                            name='password'
                            className="w-9/10 p-2 rounded border-2  block border-slate-400 mb-10 font-[Karla]"
                        />

                        <button className="bg-[#F9A826] text-white px-4 py-1 border-[#C7861E] border-2 rounded font-[Karla] font-semibold text-lg">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
