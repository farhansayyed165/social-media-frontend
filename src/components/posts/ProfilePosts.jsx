import React, { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit';
import { getUserPosts, getPost } from '../../api/postApi';
import SmallPost from './SmallPost';

function ProfilePosts({  data, user, token }) {

  const [posts, setPosts] = useState([])
  useEffect(()=>{
    getUserPosts(data._id)
    .then(postsArray=>{
      postsArray.forEach(postId => {
      getPost(postId)
        .then(post => {
          setPosts(prev=>{
              if(prev.length < data.posts.length){
                  // console.log(prev.length, " prev lenght")
                  return [...prev, post]
              }  
              else{
                  return prev
              }
          })
        })
    })})
  },[])
  const renderPosts = posts.map((post, i) => {
    return (
      <div className='w-full flex items-center justify-center' key={i}>
        <SmallPost  data={post} id={i} token={token} user={user}></SmallPost>
      </div>
    )
  })
  return (
    <div className='flex justify-center flex-col items-center w-full  '>
      {renderPosts}
    </div>
  )
}

export default ProfilePosts