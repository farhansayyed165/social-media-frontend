import { loginUser } from "../api/userApi"

export function credentialsLogin(loginData,setCookies,dispatch,Auth,navigate,redirectToPreviousPage){
    loginUser(loginData)
    .then(res=>{
        setCookies('access-token',res.accessToken, {path:'/',maxAge:864000})
        const {fullname, email, password, avatar, gender, username, _id,followers,following,saved,} = res.user
        dispatch(Auth({fullname, email, password, avatar, username,_id,gender,followers,following,saved, login:true}))
        navigate(-1)
    })
    return;
}