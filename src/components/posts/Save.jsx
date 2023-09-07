import React from 'react'
import { SavePost } from '../../api/postApi'
import { useDispatch } from 'react-redux'
import { Auth } from '../../features/userSlice'
import { addUserDetailsPersist } from '../../utils/addUserDetailsPersist'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'

function Save({postId, setPostData, user, token}) {
  const dispatch = useDispatch()
    function handleSave(){
        SavePost(postId,token)
        .then(res=>{
          // addUserDetailsPersist(Auth, dispatch,res.updatedUser)
          const {fullname, email, password, avatar, gender, username, _id,followers,following,saved}=res.updatedUser
          const data = {fullname, email, password, avatar, gender, username, _id,followers,following,saved, login:true}
          dispatch(Auth(data));
          setPostData(prev=>{
            return{
              ...prev,
              render:!prev.render
            }
          })
        })
    }
    const saveButtonText = user.saved?.includes(postId) ? <FaBookmark/>:<FaRegBookmark/>
  return (
    <button onClick={handleSave}>{saveButtonText}</button>
  )
}

export default Save