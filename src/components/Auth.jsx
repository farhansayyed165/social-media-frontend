import React, { useEffect, useState } from 'react'
import { useCookies } from "react-cookie";
import { Outlet, useNavigate, useLoaderData } from 'react-router-dom';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { UnAuth } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';


function Auth() {
    // const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(true)
    const [cookies, setCookies] = useCookies(['access-token']);
    const token = cookies['access-token'];
    if(token){

        useEffect(() => {
    
            fetch('http://localhost:5000/api/validateToken', {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.ok) {
                        console.log("res.ok", res.ok);
                        setLoggedIn(true)
                    }
                    else{
                        setLoggedIn(false)
                    }
                })
        }, [])
        if(loggedIn){
            
            return (
                <Outlet />
            )
        }
        else{
            return <Navigate to={"/login"} state={{message:"You must login first"}}/>
        }
    }
    else{
        return <Navigate to={"/login"} state={{message:"You must login first"}}/>
    }
}

export default Auth