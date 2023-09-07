import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext, Link } from 'react-router-dom'
import { getUser } from '../api/userApi'
import { useState } from 'react'
import EditProfile from '../components/user/editProfile'
import EditAvatar from '../components/user/editAvatar'
import { updateUser } from '../api/userApi'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { Auth } from "../features/userSlice"
import { checkPassword } from '../api/userApi'
import {ReactComponent as ComingSoon} from "../assets/coming_soon.svg"
import PrivateAccount from '../components/PrivateAccount'
import { deleteUser } from '../api/userApi'

export function loader(e) {
  return e
}

function Settings() {
  const user = useOutletContext().user
  const dispatch = useDispatch()

  const [userData, setUserData] = useState("")
  const [editData, setEditData] = useState()
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" })
  const [sections, setSections] = useState({ profile: true, account: false, sub: false })
  const [avatar, setAvatar] = useState()

  const [loading, setLoading] = useState(false)



  useEffect(() => {
    getUser(user.username)
      .then(res => {
        setUserData(res)
        setEditData(res)
        setAvatar(res.avatar)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev =>
    ({
      ...prev,
      [name]: value
    })
    )
  }

  async function uploadImage() {
    if (avatar == editData.avatar) {
      return editData
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
      ...editData,
      avatar: data.secure_url
    }
    return Promise.resolve(formData)
  }

  const token = useOutletContext().token

  async function handleSubmit(e) {
    e.preventDefault()
    console.log("inside submit")
    setLoading(true)
    const data = await uploadImage()
    delete data.password
    const response = await updateUser(data, token)
    const { fullname, email, password, avatar, gender, username, _id, following, followers, saved } = response;
    dispatch(Auth({ fullname, email, password, avatar, username, _id, gender, followers, following, saved, login: true }));
    console.log(response)
    setLoading(false)
    window.location.reload()



  }
  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswords(prev =>
    ({
      ...prev,
      [name]: value
    })
    )
  }

  function handlePasswordSubmit(e) {
    e.preventDefault()
    setLoading(true)
    if(passwords.new == passwords.confirm && passwords.current){
      const data = {email:userData.email, password:passwords.current, newPassword:passwords.new}
      checkPassword(data, token)
      .then(res=>{
        const { fullname, email, password, avatar, gender, username, _id, following, followers, saved } = res;
        dispatch(Auth({ fullname, email, password, avatar, username, _id, gender, followers, following, saved, login: true }));
        console.log(res)
        setLoading(false)
        window.location.reload()
      }
      )
    }
  }

  const sub = useRef()
  const profile = useRef()
  const account = useRef()


  function profileChange(e) {
    profile.current.scrollIntoView({behavior:"smooth"})
    setSections({ profile: true, account: false, sub: false })
  }
  function accountChange(e) {
    account.current.scrollIntoView({behavior:"smooth"})
    setSections({ profile: false, account: true, sub: false })
  }
  function subChange(e) {
    sub.current.scrollIntoView({behavior:"smooth"})
    setSections({ profile: false, account: false, sub: true })
  }


  function deleteAccount(e){
    e.preventDefault()
    deleteUser(userData, token)
    .then()

  }
  return (
    <>

      <main className='w-full flex flex-col items-center'>
        {/* NAV */}
        <section className='w-[90%] flex flex-col items-start'>
          <nav className='font-[karla] text-xl flex w-[90%] mt-4 overflow-scroll [scrollbar-width:none] pb-2'>
            <div ref={profile} className={` ${sections.profile ? "bottom-shadow" : ""}  mx-6 searchToggle text-center cursor-pointer transition-all duration-150 `} name="profile" onClick={profileChange}>
              <h1>Profile</h1>
              <span className={`block h-[2px] mt-1 ${sections.profile ? "bg-main-orange" : ""} w-full rounded-md transition-all duration-200 ease-in-out`}></span>
            </div>
            <div ref={account} className={`${sections.account ? "bottom-shadow" : ""} mx-5  searchToggle text-center cursor-pointer transition-all duration-150 `} name="account" onClick={accountChange}>
              <h1>Account</h1>
              <span className={`block h-[2px] mt-1 ${sections.account ? "bg-main-orange" : ""} w-full rounded-md transition-all duration-200 ease-in-out`}></span>
            </div>
            <div ref={sub} className={` ${sections.sub ? "bottom-shadow" : ""} mx-5  searchToggle text-center cursor-pointer  transition-all duration-150`} name="sub" onClick={subChange}>
              <h1>Subscription</h1>
              <span className={`block h-[2px] mt-1 ${sections.sub ? "bg-main-orange" : ""} w-full rounded-md  transition-all duration-200 ease-in-out`}></span>
            </div>
          </nav>
          <section className='w-[90%] mt-10'>

            {/* PROFILE SECTION */}
            {
              sections.profile &&
              <div className=' w-2/3 '>
                <div className='my-7'>
                  <h3 className='font-semibold text-lg mb-2'>Name</h3>
                  <h4>{userData?.fullname}</h4>
                </div>
                <div className='my-7'>
                  <h3 className='font-semibold text-lg mb-2'>Username</h3>
                  <h4>
                    {userData?.username}
                  </h4>
                </div>
                <div className='my-7'>
                  <h3 className='font-semibold text-lg mb-2'>Email Address </h3>
                  <h4>
                    {userData?.email}
                  </h4>
                </div>
                <div className='my-7'>
                  <h3 className='font-semibold text-lg mb-2'>Gender</h3>
                  <h4>{userData?.gender}</h4>
                </div>
                <button type='button' className='p-2 bg-blue-600 rounded shadow-blue-800 hover:bg-blue-800 shadow text-white font-semibold'>Saved</button>
              </div>
            }


            {/* ACCOUNTS SECTION */}
            {sections.account &&

              <div className="[width:max(300px, 66vw)]">
                <h1>Account Settings</h1>
                <hr className="h-px mb-5 mt-2 bg-gray-200 border-0 dark:bg-gray-700 rounded"></hr>

                {/* PRIVATE ACCOUNT */}
                  <PrivateAccount user={userData} setSections={setSections}/>

                {/* EDIT FORM */}
                <h2 className='text-xl font-[Karla] '>Edit</h2>
                <hr className="h-px mb-5 mt-2 bg-gray-200 border-0 dark:bg-gray-400 sm:w-2/3 w-full  rounded"></hr>
                <form className="sm:w-2/3 w-full mb-10" onSubmit={handleSubmit}>
                  <div className='flex flex-col items-center mb-2 relative w-full'>
                    <EditAvatar data={editData?.avatar} avatar={avatar} setAvatar={setAvatar}></EditAvatar>
                    <p className=''>Avatar</p>
                  </div>
                  <p className='mt-2 mb-0'>Name</p>
                  <input type="text" name="fullname" placeholder='Name' className='w-full my-0 mb-5' value={editData.fullname} onChange={handleChange} />
                  <p className='mt-2 mb-0'>Username</p>
                  <input type="text" name="username" placeholder='Username' className='w-full my-0 mb-5' value={editData.username} onChange={handleChange} />
                  <p className='mt-2 mb-0'>Email</p>
                  <input type="email" name="email" placeholder='Email' className='w-full my-0 mb-5' value={editData.email} onChange={handleChange} />

                  <label htmlFor="gender" className='w-full'>Gender:</label>
                  <select name="gender" id='gender' value={editData.gender} onChange={handleChange} className='w-full  p-2 bg-gray-100 border-2 border-gray-500 mb-4 rounded  '>
                    <option value="" className='font-Karla'>Please select one…</option>
                    <option value="female" className='font-Karla'>Female</option>
                    <option value="male" className='font-Karla'>Male</option>
                    <option value="non-binary" className='font-Karla'>Non-Binary</option>
                    <option value="other" className='font-Karla'>Other</option>
                    <option value="prefer not to answer" className='font-Karla'>Perfer not to Answer</option>
                  </select>

                  <button type='submit' className={`bg-main-orange text-white font-[Karla] text-xl rounded-md p-2 ${loading ? " pointer-events-none" : ""} `}>{loading ? <AiOutlineLoading3Quarters className='rotating' /> : "Save"}</button>
                </form>

                {/* CHANGE PASSWORD  */}
                <h2 className='text-xl font-[Karla] '>Change Password</h2>
                <hr className="h-px mb-5 mt-2 bg-gray-200 border-0 dark:bg-gray-400 sm:w-2/3 w-full  rounded"></hr>
                <form className="w-full sm:w-2/3 " onSubmit={handlePasswordSubmit}>
                  <p className='mt-2 mb-0'>Current Password</p>
                  <input type="password" name="current" placeholder='Current Password' className='w-full my-0 mb-5' value={passwords.current} onChange={handlePasswordChange} />
                  <p className='mt-2 mb-0'>New Password</p>
                  <input type="password" name="new" placeholder='New Password' className='w-full my-0 mb-5' value={passwords.new} onChange={handlePasswordChange} />
                  <p className='mt-2 mb-0'>Confirm Password</p>
                  <input type="password" name="confirm" placeholder='Confirm New Password' className='w-full my-0 mb-5' value={passwords.confirm} onChange={handlePasswordChange} />
                  <button type="submit" className=' bg-main-orange text-white font-[Karla] text-xl rounded-md p-2'>Set Password</button>
                </form>

                {/* DELETE ACCOUNT  */}
                <h2 className='text-xl font-[Karla] mt-10'>Delete</h2>
                <hr className="h-px mb-5 mt-2 bg-red-400 border-0 sm:w-2/3 w-full  rounded"></hr>

                <button type='button' className="bg-red-500 text-white block p-2 mb-9 rounded font-bold text-lg uppercase font-[Karla]" onClick={deleteAccount}>Delete Account</button>
              </div>
            }
            {sections.sub && 
            <div className='w-full h-screen flex flex-col items-center justify-start relative'>
              <ComingSoon className=" md:w-1/2 md:h-auto   w-[80%] h-auto object-top"></ComingSoon>
              <h1 className='text-center font-[Karla] lg:text-3xl md:text-xl text-lg mt-2'>This Feature is Coming Soon!</h1>
            </div>
            }
          </section>
        </section>
      </main>
    </>
  )
}

export default Settings