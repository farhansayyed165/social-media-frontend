import React, {useState} from 'react'
import { Auth } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import { followHandler } from '../../api/userApi';

function FollowComponent({toFollowId, token, user, setData}) {
    const dispatch = useDispatch()
    const [follow, setFollow]  = useState(false)
    function handleFollow(e){
        followHandler(toFollowId, token)
        .then(res => {
            let {followers, following} = res.updatedViewingUser;
            setData(prev=>{
                return {...prev,
                followers,
                following}
            });
            
            const {fullname, email, avatar, username, _id} = res.updateUser
            const userFollowers = res.updateUser.followers
            const userFollowing= res.updateUser.following
            if(res.updateUser.following.includes(toFollowId)){
              setFollow(true)
            }
            else{
              setFollow(false)
            }
            dispatch(Auth({
                fullname, 
                email,  
                avatar, 
                username,
                _id,
                followers:userFollowers,
                following:userFollowing, 
                login:true}))
        })
    }
    // console.log(user)
  return (
    
    <button className={`${follow ? " bg-red-500 active:bg-red-600":"bg-blue-400 active:bg-blue-600" } tracking-wider uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:self-center mb-1 ease-linear transition-all duration-150`} type="button" onClick={handleFollow}>
                      {follow ? "Unfollow":"Follow"}
    </button>
    // <button onClick={handleFollow}>Follow</button>
  )
}

export default FollowComponent