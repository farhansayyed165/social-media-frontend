import React, { useState } from 'react'
import { likePost } from '../../api/postApi'
import { useNavigate, Navigate,useLocation } from 'react-router-dom'
import {AiFillLike, AiOutlineLike} from 'react-icons/ai'

function LikeButton({ login, postId, token, postData, setPostData, user }) {
  const navigate = useNavigate()
  const path = useLocation().pathname

  // console.log(postData.likes)
  function like() {
    if (login) {
      likePost(postId, token)
      .then(res => {
        setPostData(prev=>{
          return {
            ...prev,
            likes:res.likes
          }
        })
      })
    }
    else {
      return navigate("/login",{state:{
        message:"You must login first",
        redirectLink:path
      }})
      // <Navigate state={{ redirectLink: path }} to={"/login"} />
    }

  }
  const likes = postData?.likes.includes(user._id) ? true : false

  return (
    <span className='flex'>
      <button onClick={like} className='mx-2'>{likes ? <AiFillLike/> : <AiOutlineLike/>}</button>
      <p>{postData?.likes.length}</p>
    </span>
  )
}

export default LikeButton