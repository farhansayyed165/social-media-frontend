import React, {useState, useRef, useEffect} from 'react'

function PrivateAccount({user, setSections}) {

    const checkbox = useRef(true)
    const [state, setState] = useState(false)
    useEffect(()=>{
    setState(true)
    },[checkbox])

    function handleToggleCheckbox() {
        // checkbox.current.checked = !checkbox.current.checked
        // // setSections({ profile: false, account: true, sub: false })
        setState(!state)
        // console.log(checkbox.current.checked)
      }
    return (
        <div className='mb-8 flex justify-between items-center  w-full sm:w-2/3'>
            <p className="font-semibold text-lg ">Private my account</p>
            <div>
                <input type="checkbox" value="" className="sr-only" defaultChecked={state}  ref={checkbox} />
                <div onClick={handleToggleCheckbox} className={`h-[40px] ${checkbox.current?.checked ? "bg-orange-500" : "bg-main-orange "} transition-all duration-[250ms] w-[90px] shadow-inner shadow-md flex items-center p-0.5 rounded-3xl relative`}>
                    <div className={`${checkbox.current?.checked ? "translate-x-[52px]" : ""} mx-[2px] transition-all duration-300 w-[30px] p-1 h-[80%] bg-white rounded-full absolute shadow-lg`}></div>
                </div>
            </div>
        </div>
    )
}

export default PrivateAccount