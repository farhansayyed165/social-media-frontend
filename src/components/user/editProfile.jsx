import React, { useState, useRef, useEffect } from 'react'
import { updateUser } from '../../api/userApi';
import { ImCross } from 'react-icons/im'
import EditAvatar from "./editAvatar"

function
    EditProfile({ showEdit, data, token, setOff }) {
    const [avatar, setAvatar] = useState()
    const nameRef = useRef()
    useEffect(() => {
        nameRef.current.focus()
    }, [showEdit])
    const [userDetail, setUserDetail] = useState(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail(prev =>
        ({
            ...prev,
            [name]: value
        })
        )
    }

    async function uploadImage() {
        if (avatar == userDetail.avatar) {
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
        const data = await uploadImage()
        const res = await updateUser(data, token)

        console.log(res);
        setOff(false)
        window.location.reload()

    }
    function goBack(e) {
        e.preventDefault()
        setOff(false)
    }
    return (
        <div className={showEdit ? "absolute z-50 w-full h-full bg-black/30 rounded top-0 left-0" : "hidden"} >
            <div className={`flex justify-center items-center w-full h-full rounded`}>
                <form onSubmit={handleSubmit} className='bg-white relative w-[60%] rounded'>
                    <button type="button" className='absolute top-0 right-0 z-50 mr-2 mt-2' onClick={goBack}><ImCross size={20} /></button>

                    <div className='flex relative flex-col w-9/10 sm:w-10/12 m-auto p-4 py-10 rounded '>
                        <h1 className='font-semibold font-'>Edit Your Profile </h1>
                        <div className='relative flex justify-center w-full my-2'>

                            <EditAvatar data={userDetail.avatar} avatar={avatar} setAvatar={setAvatar}></EditAvatar>
                        </div>
                        <input
                            type="text"
                            placeholder='fullname'
                            onChange={handleChange}
                            value={userDetail.fullname}
                            name='fullname'
                            className='w-full'
                            ref={nameRef}
                        />
                        <input
                            type="text"
                            placeholder='username'
                            onChange={handleChange}
                            value={userDetail.username}
                            name='username'
                            className='w-full'
                        />
                        <input
                            type="text"
                            placeholder='Headline'
                            onChange={handleChange}
                            value={userDetail.subText}
                            name='subText'
                            className='w-full'
                        />
                        <textarea
                            type="text"
                            placeholder='About'
                            onChange={handleChange}
                            value={userDetail.about}
                            name='username'
                            rows={4}
                            className='w-full resize-none border-2 border-gray-500 p-2 rounded my-2'
                        />
                        <input
                            type="email"
                            placeholder='email'
                            onChange={handleChange}
                            value={userDetail.email}
                            name='email'
                            className='w-full'
                        />
                        <br />
                        <button className='bg-main-orange border-2 mt-2 border-main-orange font-[Karla] active:border-darker-orange uppercase text-white font-bold hover:shadow-md shadow text-md px-4 py-2 rounded outline-none focus:outline-none sm:self-center mb-1 ease-linear transition-all duration-150'>SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile