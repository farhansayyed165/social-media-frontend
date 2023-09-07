import React, { useState,useRef } from 'react';
import { createUser, loginUser } from '../api/userApi';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Auth } from '../features/userSlice'
import { useCookies } from 'react-cookie';
import { credentialsLogin } from '../utils/loginUser';
import { ReactComponent as SignupSVG } from '../assets/Join.svg'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import EditAvatar from '../components/user/editAvatar';
import './login.css'


const CreateUser = () => {
    const [navigateTo, setNavigateTo] = useOutletContext()
    const navigate = useNavigate()
    const [cookies, setCookies] = useCookies(['access-token', 'refresh-token'])
    const [userDetail, setUserDetail] = useState({ fullname: "", username: "", password: "", confirmPassword: "", email: "", gender: "", subText:"", about:"" })
    const [avatar, setAvatar]= useState() 
    const redirectToPreviousPage = useLocation().state?.redirectLink ? useLocation().state.redirectLink : "/";
    const dispatch = useDispatch();
    const [toggleSection, setToggleSection] = useState(true)
    const form = useRef()
    async function uploadImage() {
        if (avatar == userDetail.avatar || !avatar) {
          return userDetail
        }
        const imageData = new FormData();
        imageData.append("file", avatar)
        imageData.append("upload_preset", "o1hlhhqo");
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/drqdgsnat/image/upload', {
          method: 'POST',
          body: imageData
        })
        const data = await response.json()
        const formData = {
          ...userDetail,
          avatar: data.secure_url
        }
        return Promise.resolve(formData)
      }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!userDetail.fullname || !userDetail.username || !userDetail.password || !userDetail.confirmPassword || !userDetail.email || !userDetail.gender) {
            return console.log("Error! All feilds are mandatory")
        }
        if (!(userDetail.email.split('@'))) {
            return console.log("email sahi kar")
        }
        if (userDetail.password != userDetail.confirmPassword) {
            return console.log("password sahi kar")
        }
        setNavigateTo(redirectToPreviousPage)
        const data = await uploadImage()
        const res = await createUser(data)
        console.log(res)

        const loginData = { email: res.user.email, password: res.user.password }
        credentialsLogin(loginData, setCookies, dispatch, Auth, navigate, redirectToPreviousPage);
     
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setUserDetail(prev => ({
            ...prev,
            [name]: value
        }))
    }
    function navigateBack() {
        navigate(-1)
    }
    function toggle(e) {
        e.preventDefault()
        setToggleSection(!toggleSection)
    }
    return (
        <div className='flex h-screen bg-gradient-to-r from-main-orange  to-slate-300 overflow-hidden'>
            <button type="button" onClick={navigateBack} className="rounded-full overflow-hidden bg-white absolute top-0 left-0 p-5 border-2 border-[#F9A826] m-8 mt-10 ml-10"><AiOutlineArrowLeft /></button>
            <div className='w-1/2 m-8 border-2 mr-0  overflow-x-hidden border-r-0 bg-slate-300 sm:flex hidden items-center justify-center signup-svg'>
                <SignupSVG className='w-full m-0 signup-svg px-2'></SignupSVG>
            </div>
            <div className='w-full sm:w-1/2 flex flex-col items-center border-2 sm:ml-0 m-8 border-l-0 bg-white overflow-x-hidden'>
                <form onSubmit={handleSubmit} className='flex w-full justify-center overflow-y-hidden overflow-x-hidden pb-10 '>
                    <div className={`flex flex-col items-center translate-y-6 delay-200  w-9/10 transition-all duration-100 overflow-hidden ease-in-out ${toggleSection ? "" : " opacity-0 absolute -z-10  pointer-events-none"} p-2`}>

                        <h1 className='text-center font-semibold text-xl mb-2'>Welcome!</h1>
                        <p className='lg:mb-7 md:mb3 text-center text-pClamp'>Join our community of creators and innovators! Sign up today to unlock a world of possibilities. Start your journey with us and let's build something amazing together!</p>
                        <input
                            type="text"
                            placeholder='Name'
                            onChange={handleChange}
                            value={userDetail.fullname}
                            name='fullname'
                            className='w-9/10'
                        />
                        <input
                            type="text"
                            placeholder='Headline'
                            onChange={handleChange}
                            value={userDetail.subText}
                            name='subText'
                            className='w-9/10'
                        />
                        <textarea
                            type="text"
                            placeholder='About'
                            onChange={handleChange}
                            value={userDetail.about}
                            name='about'
                            className='w-9/10 border-2 border-gray-500 p-2 resize-none rounded my-2'
                            rows={4}
                        />

                        <label htmlFor="gender" className='w-9/10 mt-2'>Gender:</label>
                        <select
                            name="gender" id='gender'
                            value={userDetail.gender}
                            onChange={handleChange}
                            className='w-9/10 p-2 bg-white border-2 border-gray-500 mb-2'
                        >
                            <option value="">Please select one…</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="non-binary">Non-Binary</option>
                            <option value="other">Other</option>
                            <option value="prefer not to answer">Perfer not to Answer</option>
                        </select>

                        <div className='w-full flex flex-row-reverse mx-4'>
                            <button type="button" className='button px-4 py-2 border-blue-800 hover:bg-blue-800 transition-all duration-150 bg-blue-500 border-2 text-white rounded sm:mt-5 self-start' onClick={toggle}>Next</button>
                        </div>
                    </div>
                    <div className={`flex flex-col  items-center translate-y-6 w-9/10 p-2 transition-all duration-300 ease-in-out ${toggleSection ? "translate-x-[100vw] -z-10 absolute" : ""}`}>
                        <div className='flex flex-col items-center mb-2 relative mt-3'>
                        <EditAvatar  avatar={avatar} setAvatar={setAvatar}></EditAvatar>
                        <p className='mt-3 mb-2 text-center text-pClamp'>Tap the image to add a profile picture</p>
                        </div>
                        <input
                            type="text"
                            placeholder='Username'
                            onChange={handleChange}
                            value={userDetail.username}
                            name='username'
                            className="w-9/10"
                        />
                        <input
                            type="email"
                            placeholder='Email'
                            onChange={handleChange}
                            value={userDetail.email}
                            name='email'
                            className="w-9/10"
                        />

                        <input
                            type="password"
                            placeholder='Password'
                            onChange={handleChange}
                            value={userDetail.password}
                            name='password'
                            className="w-9/10"
                        />
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            onChange={handleChange}
                            value={userDetail.confirmPassword}
                            name='confirmPassword'
                            className="w-9/10"
                        />
                        <div className='flex justify-between w-full mt-3'>
                        <button type="button" className=' px-4 py-2 border-blue-800 hover:bg-blue-800 transition-all duration-150 bg-blue-500 border-2 text-white rounded sm:mt-5 self-start' onClick={toggle}>Previous</button>
                        <button type='submit' className='px-4 py-2 border-darker-orange bg-main-orange border-2 text-white rounded sm:mt-5'>Submit</button>
                        </div>
                    </div>

                </form>
            </div>


        </div>
    );
}

export default CreateUser;
