import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import { GrMore } from 'react-icons/gr';
import Save from './Save';

const MoreOptionsPost = ({postData, setPostData, user, token, post}) => {
    const navigate = useNavigate()
  const [showMore, setShowMore] = useState(false)

    function more(e) {
        e.preventDefault()
        setShowMore(!showMore)
      }
      function closeMore(e){
        e.preventDefault()
        setShowMore(false)
      }
      function navigateToEditPost(){
        navigate(`/edit/${postData._id}`)
      }
    return (
        <>
        <div className={`${showMore ? "" : " opacity-0 pointer-events-none"} fixed top-0 left-0 w-full h-full z-48`} onClick={closeMore}>
      </div>
      {post ? <div className={`absolute ${showMore ? "" : " opacity-0 pointer-events-none"} text-left w-[120px]  mt-10 mr-3  right-0 border-2 transition-all p-2 duration-200 ease-in-out bg-gray-100 shadow-lg rounded`}>
        <div className='w-full ml-auto flex flex-row-reverse mb-2 ' >
          <ImCross className=' cursor-pointer' onClick={closeMore}></ImCross>
        </div>
        <div> 
        
        <p className='cursor-pointer  py-2 pt-3'>Report</p>
          
          {user.login &&
            <span className='cursor-pointer  py-2 flex items-center'>
              <p className='mr-1'>Save</p>
              <Save user={user} token={token} setPostData={setPostData} postId={postData?._id}></Save>
            </span>
          }
        {(postData?.user.username == user?.username) && 
        <>
      
          <p className='cursor-pointer  py-2' onClick={navigateToEditPost}>Edit Post</p>
        
      
          <p className='text-red-500 cursor-pointer font-semibold py-2' >Delete post</p>
        
        </>
          }
        </div>
      </div>

         :
      
      <div className={`absolute ${showMore ? "" : " opacity-0 pointer-events-none"} text-left w-[120px] lg:translate-x-[450%] z-[49] md:translate-x-[300%] md:right-[unset] mt-10 mr-3  right-0 border-2 transition-all p-2 duration-200 ease-in-out bg-gray-100 shadow-lg rounded`}>
        <div className='w-full ml-auto flex flex-row-reverse mb-2 ' >
          <ImCross className=' cursor-pointer' onClick={closeMore}></ImCross>
        </div>
        <div> 
        
        <p className='cursor-pointer  py-2 pt-3'>Report</p>
          
          {user.login &&
            <span className='cursor-pointer  py-2 flex items-center'>
              <p className='mr-1'>Save</p>
              <Save user={user} token={token} setPostData={setPostData} postId={postData?._id}></Save>
            </span>
          }
        {(postData?.user.username == user?.username) && 
        <>
      
          <p className='cursor-pointer  py-2' onClick={navigateToEditPost}>Edit Post</p>
        
      
          <p className='text-red-500 cursor-pointer font-semibold py-2' >Delete post</p>
        
        </>
          }
        </div>
      </div>}
      <button className=' w-20 absolute right-0 -mr-3 cursor-pointer' onClick={more}>
          <GrMore className='w-20 absolute right-0 -mr-3 cursor-pointer' size={22}  ></GrMore>
        </button>
        </>
    );
}

export default MoreOptionsPost;
