import React, { useState, useEffect, useRef } from 'react'
import Image from '../components/uploadImage';
import { useCookies } from 'react-cookie';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { updatePost, getPost } from '../api/postApi'

export async function loader({ params }) {
    const { postId } = params
    const response = await getPost(postId)
    // console.log(response)
    return response
}

function EditPost() {
    const navigate = useNavigate()
    const [data, setData] = useState(useLoaderData())
    const [cookies] = useCookies(['access-token'])
    const token = cookies['access-token']
    //pass these through a component that manages images for our post 
    const [img, setImg] = useState(data.images);
    const [upload, setUpload] = useState({ uploading: false, done: false })
    //setting up form data with images array empty for now
    const [formData, setFormData] = useState({
        id:data._id,
        content: data.content,
        images: data.images
    });

    const formRef = useRef()
    useEffect(() => {
        setFormData(prev => ({ ...prev, images: img }))
    }, [img])



    function handleChange(e) {
        // basic function to handle changes in title and content
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        if (formData.content) {
            formRef.current ? formRef.current[0].style.border = "3px solid #9ca3af" : ""
        }
    }

    // this function will call the send a request to our backend 
    // and redirect the user to Home page for now
    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.content) {
            formRef.current ? formRef.current[0].style.border = "3px solid red" : ""
            formRef.current ? formRef.current[0].focus() : ""
            return
        }
        // setUpload(prev=>({...prev, uploading:true}))
        if (img == formData.images) {
            // console.log("unchanged images", formData)
        }
        const form = await uploadImages()
        // console.log(form)
        const response = await updatePost(form, token)
        setUpload({ uploading: false, done: true })
        navigate(`/posts/${response._id}`)
        setUpload({ uploading: false, done: false })


    }

    async function uploadImages() {
        if (!img) {
            return formData
        }
        //initializing empty array
        const images = []
        // using for loop after trying .map and forEach
        for (let i = 0; i < img.length; i++) {
            let image = img[i];
            let imageData = new FormData();
            imageData.append('file', image);
            imageData.append("upload_preset", "o1hlhhqo");
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/drqdgsnat/image/upload', {
                method: 'POST',
                body: imageData
            })
            const data = await response.json()
            //storing the url in our array
            images.push(data.secure_url)

        }

        // this setFormData does not work 
        setFormData(prev => ({ ...prev, images: images }))
        const form = {
            ...formData,
            images
        }
        return Promise.resolve(form)
    }

    function close() {
        navigate(`/posts/${data._id}`)
    }


    return (
        <div className='w-[100vw] h-[100vh] fixed z-[100] left-0 translate-x-0 bg-black/70 overflow-scroll ' >
            {<span className={`absolute ${(upload.done || upload.uploading) ? "top-0" : "-top-20"} transition-all duration-200 ease-in-out w-full flex justify-center`}>
                <p className={`text-white  p-1 px-5 border-2 ${upload.done ? " bg-green-500 border-green-800" : "bg-main-orange border-darker-orange"} uppercase font-[Karla] text-lg font-semibold `}>{upload.done ? "DONE!" : "Uploading Post!"}</p>
            </span>}
            <div className='flex items-center justify-center mt-3 w-full mb-10'>
                <div className='max-w-full md:max-w-3/4 max-h-[100vh] min-w-1/2  bg-white border-2 border-slate-400 p-8 shadow-md'>
                    <h2>Edit Post</h2>
                    <hr className="h-px mb-5 mt-2 bg-gray-200 border-0 dark:bg-gray-700 rounded"></hr>
                    <form onSubmit={handleSubmit} ref={formRef} >
                        <textarea
                            id='content'
                            type="text"
                            name='content'
                            placeholder='Caption'
                            rows={4}
                            onChange={handleChange}
                            value={formData.content}
                            className='border-2 border-gray-400 w-full rounded resize-none p-2 mb-3'

                        />
                        <Image
                            images={img}
                            setImages={setImg}
                            imageLink={data.images}
                        />
                        <div className='flex w-full justify-end'>
                            <button type='button' onClick={close} className='p-2 px-3 mx-5 border-2 rounded bg-red-500 text-white focus:bg-red-600 hover:bg-red-600 transition-all duration-200 ease-in-out'>Cancel</button>
                            <button type='submit' className='text-white p-2 px-3 border-2 rounded bg-blue-400 focus:bg-blue-600 hover:bg-blue-600  transition-all duration-200 ease-in-out'><span className='text-white'>Submit</span></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPost



