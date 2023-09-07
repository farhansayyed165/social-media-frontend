import React, { useState, useRef } from 'react';
import Image from '../components/uploadImage';
import { submitPost } from '../api/postApi';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Submit = ({ close }) => {
    // fetching cookies 
    const navigate = useNavigate()
    const [cookies] = useCookies(['access-token'])
    const token = cookies['access-token']
    const [buttonStyle, setButtonStyle] = useState("black")
    //pass these through a component that manages images for our post 
    const [img, setImg] = useState([]);
    const [upload, setUpload] = useState({uploading:false, done:false})
    //setting up form data with images array empty for now
    const [formData, setFormData] = useState({
        content: "",
        images: [],
    });

    const formRef = useRef()



    function handleChange(e) {
        // basic function to handle changes in title and content
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        if(formData.content){
            formRef.current ? formRef.current[0].style.border = "3px solid #9ca3af":""
        }
    }  

    // this function will call the send a request to our backend 
    // and redirect the user to Home page for now
    function handleSubmit(e) {
        e.preventDefault();
        if(!formData.content){
            formRef.current ? formRef.current[0].style.border = "3px solid red":""
            formRef.current ? formRef.current[0].focus():""
            return
        }
        setUpload(prev=>({...prev, uploading:true}))
        uploadImages()
            .then((form) => {
                submitPost(form, token)
                    .then((response) => {
                        setUpload({uploading:false, done:true})
                        navigate(`/posts/${response._id}`)
                        setTimeout(()=>{
                            setUpload({uploading:false, done:false})
                            close()
                        },400)
                    })
            })
        
    }

    //this function will loop through the images uploaded by user,
    // upload them to cloudinary
    // and then store the url into our state -> formData
    async function uploadImages() {
        //initializing empty array
        const images = []
        if(!img){
            return formData
        }
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


    return (
        <div className='w-full absolute z-50 h-full bg-black/70 overflow-scroll'>
            {<span className={`fixed ${(upload.done || upload.uploading) ? "top-0":"-top-20"} transition-all duration-200 ease-in-out w-full flex justify-center`}>
                <p className={`text-white  p-1 px-5 border-2 ${upload.done ? " bg-green-500 border-green-800":"bg-main-orange border-darker-orange"} uppercase font-[Karla] text-lg font-semibold `}>{upload.done ? "DONE!":"Uploading Post!"}</p>
            </span>}
            <div className='flex items-center justify-center mt-3 w-full mb-10'>
                <div className='w-3/4  bg-white border-2 border-slate-400 p-8 shadow-md'>
                    <h2>Create Post</h2>
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
                        />
                        <div className='flex w-full justify-end'>
                            <button type='button' onClick={close} className='p-2 px-3 mx-5 border-2 rounded bg-red-500 text-white focus:bg-red-600 hover:bg-red-600 transition-all duration-200 ease-in-out'>Cancel</button>
                            <button type='submit' style={{ color: buttonStyle }} className='text-white p-2 px-3 border-2 rounded bg-blue-400 focus:bg-blue-600 hover:bg-blue-600  transition-all duration-200 ease-in-out'><span className='text-white'>Submit</span></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Submit;
