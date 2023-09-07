import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Carousel from '../Carousel'
import LikeButton from './LikeButton'
import { CgComment } from 'react-icons/cg'
import { timeSince } from '../../utils/parseDate'
import MoreOptionsPost from './MoreOptionsPost'

function SmallPost({ data, user, token }) {
  const navigate = useNavigate()
  const [postData, setPostData] = useState(data)
  const content = data?.content ? (data.content.length > 200 ? data.content.substring(0, 200) + "..." : data.content) : ""


  return (
    <div className='lg:w-[700px] md:w-[500px]  my-4 border-2 rounded-md  py-2 px-5 w-full z-40 bg-white' >
      <div className='relative'>
        <MoreOptionsPost user={user} token={token} postData={postData} setPostData={setPostData}/>
        
        <Link to={`/${postData?.user.username}`} className=' '>
          <div className='profile flex items-center  mt-3 mb-2 w-[80%]'>
            <img className='w-12 h-12 rounded-full object-cover mr-4 shadow' src={postData?.user.avatar} alt={`${postData?.user.fullname}'s profile image`} />
            <h1 className='text-lg font-semibold text-gray-900 -mt-1'>{postData?.user.fullname}</h1>
          </div>
        </Link>
        <p className='text-gray-700 text-left mb-6 text-xs'>{timeSince(Date.parse(data?.addedDate))} ago</p>
        <div onClick={() => { navigate(`/posts/${data?._id}`) }} className='max-w-full mb-8 cursor-pointer'>

          <p className='text-gray-700 max-w-full text-left text-h3Clamp'>{content}</p>
        </div>

        {
          data?.images.length > 0 ? <Carousel items={data?.images} /> : <></>
        }
        <div className='flex items-center justify-center '>

          <LikeButton token={token} login={user.login} postData={postData} setPostData={setPostData} postId={data?._id} user={user}></LikeButton>

          <div className="flex items-center justify-center mx-10 my-4"><CgComment /><p className='mx-2'>{data?.comments?.length}</p></div>
        </div>
      </div>

    </div>
  )
}

export default SmallPost