import React, { useEffect, useState, useRef } from 'react';
import EditCarousel from './EditCarousel';
import {BsFillImageFill} from 'react-icons/bs'

const Image = ({ images, setImages, imageLink }) => {
    const inputField = useRef(null)
    const [slideState, setSlideState] = useState(0)
    const [imageUrl, setImageUrl] = useState(imageLink ? imageLink : []);
    function ChangeUrl(e){
        const arr = [...images, ...e.target.files]
        setImages(arr)
        return arr
    }
    function onImageChange(e) {
        const data = ChangeUrl(e)
        const newImageUrls = [];
        data.forEach((image) => {
            newImageUrls.push(URL.createObjectURL(image))
        })
        
        setImageUrl(prev => ([...prev, ...newImageUrls]));

    }
    function handleClick(e){
        e.preventDefault()
        inputField.current.click()
    }
    function onEditClick(e){
        setImages(prev=>{
            const newArr = prev.splice(slideState, 1)
            return newArr
        })
    }
    return (
            <div className='mb-3    '>
                <button onClick={handleClick} className=' border-2 border-slate-600 rounded p-2'><BsFillImageFill/></button>
                <input type="file" multiple onChange={onImageChange} className='hidden' ref={inputField}/>
                <div className='flex'>
                    <EditCarousel items={imageUrl} edit={true} handleEditClick={onEditClick} slideState={slideState} setSlideState={setSlideState}></EditCarousel>
                </div>
            </div>
    );
}

export default Image;
