import React, {useState, useEffect, useRef} from 'react'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'

function EditCarousel({ items, maxW, edit, handleEditClick, slideState, setSlideState}) {
    const [renderButtons, setRenderButtons] = useState({ previous: false, next: true })
    const slidesRef = useRef()
    const slides = items.map((item, i) => {
        return (
            <div className={`${slideState == i ? "current-slide" : "hidden"} w-full bg-gray-30 transition-all duration-700 ease-in-out flex justify-center items-center object-center z-40`} data-carousel-item key={i} slide={i}>
                {items.length > 1 && <div className='absolute top-0 z-50 right-0 bg-white/75 px-2 py-2 m-2 rounded-full'>
                    <p className=' font-normal text-xs z-'>{slideState + 1}</p>
                </div>}
                {
                    edit ? <span className='absolute top-0 left-0 z-[101] pt-2 pl-2 ' slide={i} onClick={handleEditClick}><ImCross size={20} slide={i} style={{ stroke: "black", strokeWidth: "1x"}} color='white' /> <span slide={i}></span></span> : <></>
                }
                {/* <span className='absolute top-0 left-0 pl-2 pt-2 z-[101]'><ImCross size={20} color='white'/></span>  */}
                <img src={item} alt="" className='max-w-full h-[400px] transition-all duration-700 ease-in-out object-cover items-center m-auto z-40' />
            </div>
        )
    })

    useEffect(() => {
        if (slideState == 0) {
            setRenderButtons({ previous: false, next: true })
            return;
        }
        if (slideState == items.length - 1) {
            setRenderButtons({ previous: true, next: false })
            return;
        }
        else {
            setRenderButtons({ previous: true, next: true })
            return;
        }

    }, [slideState]);

    function changeSlideNext() {
        if (!(slideState == items.length - 1)) {
            setSlideState(slideState + 1)
        }
        else {
            setSlideState(slideState)
        }
    }

    function changeSlidePrevious() {
        if (!(slideState == 0)) {
            setSlideState(slideState - 1)
        }
        else {
            setSlideState(slideState)
        }
    }

    return (
        <div className={`relative ${maxW ? `md:max-w-full lg:max-w-3/4 ` : "sm:max-w-[85%]"}  flex items-center justify-center m-auto `} data-carousel="slide">
            {/* Carouse-wrapper */}
            <div className='relative max-w-full bg-black flex items-center overflow-hidden rounded-lg transition-all duration-500 ease-linear' >
          
                {slides}
         
                {/* {Slides Control} */}
                {items.length > 1 ? <>

                    <button type='button' className={`${renderButtons.previous ? " " : "hidden"} z-[50] absolute  left-0  flex items-center justify-center h-[60%] px-4 cursor-pointer group focus:outline-none`} data-carousel-prev onClick={changeSlidePrevious}>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:white-800/30 group-hover:bg-white/30 dark:group-hover:bg-white-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <AiOutlineLeft></AiOutlineLeft>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button type="button" className={`${renderButtons.next ? " " : "hidden"} z-[50] absolute top-0 right-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none`} data-carousel-next onClick={changeSlideNext}>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:white-800/30 group-hover:bg-white/30 dark:group-hover:bg-white-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <AiOutlineRight></AiOutlineRight>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </> : <></>}
            </div>
        </div>
    )
}

export default EditCarousel