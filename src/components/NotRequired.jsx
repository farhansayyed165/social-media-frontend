import React, {useState} from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'


function WillNotLoadIfLoggedIn() {
    const [navigateTo, setNavigateTo] = useState("/")
    const user = useSelector((state)=>{
        const data = state.user.user ? state.user.user : null
        return data
    });
    if(user == null){
        return (
            <Outlet context={[navigateTo,setNavigateTo]}/>
          )
    }
    if(user.login == true){
        return <Navigate to={navigateTo} state={{message:"already logged in"}}/>
    }
    else{
        return (
          <Outlet context={[navigateTo,setNavigateTo]}/>
        )
    }
    
}

export default WillNotLoadIfLoggedIn