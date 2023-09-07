import React, { useState } from 'react';
import { useLoaderData, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { timeSince } from '../utils/parseDate';
import { Link } from 'react-router-dom';
import MoreOptionsPost from '../components/posts/MoreOptionsPost';
import Carousel from '../components/Carousel';
import LikeButton from '../components/posts/LikeButton';
import Save from '../components/posts/Save';
import CreateComment from '../components/comment/CreateComment';
import CommentInfScroll from '../components/comment/CommentInfScroll';
import { getPost } from '../api/postApi';
import { getCommentsPaginated } from '../api/commentApi';
import { CgComment } from 'react-icons/cg'
import { GrMore } from "react-icons/gr"


export async function loader({ params }) {
    const { postId } = params;
    const response = await getPost(postId)
    const comments = await getCommentsPaginated(response._id)
    return {response, comments}
}



const Post = () => {
    const navigate = useNavigate()
    const postId = useParams().postId
    const [data, setData] = useState(useLoaderData().response)


    const [cookies] = useCookies(['access-token'])
    const token = cookies['access-token']
    const user = useSelector((state) => {
        const value = state.user.user ? state.user.user : state.user
        return value
    })
    // console.log(user);
    const loginRequiredComponent = user.login ? <Save postId={postId} setdata={setData} user={user} token={token} /> : ""



    const path = useLocation().pathname

    const createComponent = user.login ? <CreateComment postId={postId} setdata={setData} /> : <div className='mb-2'>
        To comment, you need to either
        <Link to={"/login"} state={{ redirectLink: path }}> login </Link>
        or
        <Link to={"/signup"} state={{ redirectLink: path }}> create an account</Link>!
    </div>



    return (
        <main className='w-full relative flex  justify-center mt-2   bg-white'>
            <div className='w-full hidden md:flex md:w-10/12  max-h-[90vh]  bg-white shadow-lg'>
                <div className='px-4 mt-2 w-1/2 max-h-[90vh] overflow-scroll hide-scroll hidden md:flex items-center'>
                    {
                        <Carousel items={data.images} maxW={true} />
                    }
                </div>
                <div className='relative w-1/2 p-3 mx-4  overflow-scroll hide-scroll'>
                <div className='relative'>
                    <MoreOptionsPost token={token} user={user} setPostData={setData} postData={data} post={true}/>
                </div>
                    <div className='mb-4'>
                        <span className='flex items-center'>
                            <Link to={`/${data.user.username}`} className='mr-10'>
                                <div className='profile flex items-center my-3'>
                                    <img className='w-12 h-12 rounded-full object-cover mr-4 shadow' src={data.user.avatar} alt={`${data.user.fullname}'s profile image`} />
                                    <h1 className='text-lg font-semibold text-gray-900 -mt-1'>{data.user.fullname}</h1>
                                </div>
                            </Link>
                            <p className='text-gray-600 my-3 mt-2 '>{timeSince(Date.parse(data.addedDate))}</p>
                        </span>
                        <p className='text-gray-800 mb-5'>{data.content}</p>
                        <div className='w-full flex items-center justify-evenly mt-3'>
                            <LikeButton login={user.login} postId={data._id} token={token} postData={data} setPostData={setData} user={user}></LikeButton>
                            <span className='flex items-center jsutify-center'>
                                <CgComment className='mx-1'></CgComment>
                                <p className='mx-1'>{data.comments.length}</p>
                            </span>
                            {loginRequiredComponent}
                        </div>
                    </div>
                    <div>
                        {createComponent}
                        {useLoaderData.comments ? <CommentInfScroll data={data} commentsArray={useLoaderData().comments}></CommentInfScroll>: 
                        <h1 className='text-center w-full font-semibold'>Be the first to comment!</h1>
                        }
                    </div>  
                </div>
            </div>

            <div className='md:hidden my-4 border-2 py-2 px-5 w-full text-[0.9rem]'>
                <div className=''>
                    <div className='relative'>
                    <MoreOptionsPost token={token} user={user} setPostData={setData} postData={data}/>
                    </div>
                    <Link to={`/${data.user.username}`}>
                        <div className=' flex items-center  mt-3 mb-2'>
                            <img className='w-12 h-12 rounded-full object-cover mr-4 shadow' src={data.user.avatar} alt={`${data.user.fullname}'s profile image`} />
                            <h1 className='text-lg font-semibold text-gray-900 -mt-1'>{data.user.fullname}</h1>
                        </div>
                    </Link>
                    <p className='text-gray-700 text-left mb-6 text-xs'>{timeSince(Date.parse(data.addedDate))} ago</p>
                    <div onClick={() => { navigate(`/posts/${data._id}`) }} className='max-w-full mb-8'>

                        <h1 className='max-w-md text-left my-2 font-semibold text-lg'>{data.title}</h1>
                        <h5 className='text-gray-700 max-w-full text-left'>{data.content}</h5>
                    </div>

                    {
                        data.images.length > 0 ?    <div className="w-full">
                            <Carousel items={data.images} maxW /> 
                        </div>
                         : <></>
                    }
                    <div className='flex items-center justify-evenly '>

                        <LikeButton token={token} login={user.login} postData={data} setPostData={setData} postId={data._id} user={user}></LikeButton>

                        <div className="flex items-center justify-center mx-10 my-4"><CgComment /><p className='mx-2'>{data.comments.length}</p></div>
                        {loginRequiredComponent}
                    </div>
                </div>
                <hr className="h-px mb-8 bg-gray-200 border-0 dark:bg-gray-700 rounded"></hr>
                <div className='text-[0.9rem]'>
                    {createComponent}
                    
                </div>
            </div>
        </main>
    );
}

export default Post;
