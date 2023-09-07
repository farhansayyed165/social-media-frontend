import React from 'react'
import SmallPost from './SmallPost'

function HomePost({ post, user, token }) {
  return (
    <>
      <SmallPost data={post} user={user} token={token}/>
    </>
  )
}

export default HomePost