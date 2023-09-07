import React from 'react';
import { useEffect } from 'react';
import { getComment } from '../../api/commentApi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { timeSince } from '../../utils/parseDate';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import {GrMore} from "react-icons/gr"
import InfiniteScroll from 'react-infinite-scroll-component';   

const Comments = ({ comment }) => {
    if (comment) {
        const [commentData, setCommentData] = useState(comment)
        // useEffect(() => {
        //     getComment(comment)
        //         .then(res => {
        //             const { content, updatedAt, user, username, likes } = res.comment;
        //             setCommentData({ content, updatedAt, user, username, likes })
        //         })
        // }, [])
        return (
            <div className=' relative border-1 my-5 p-1 '>
                <GrMore className='absolute top-0 right-0 mx-2 my-1'></GrMore>
                <span className='flex items-center mb-2'>
                    <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} alt="" className='w-[30px] rounded-full object-cover mr-4 shadow'/>
                    {commentData.username && <h4 className='mr-2'><Link to={`/profile/${commentData.username}`}>{commentData.user}</Link> </h4>}
                    <p className=' text-sm text-gray-500'>{timeSince(Date.parse(commentData.updatedAt))}</p>
                </span>

                <p className='text-gray-800 p-2'>{commentData.content}</p>
                <span className='flex items-center mt-2 px-2'>
                    <AiFillLike></AiFillLike>
                    <p className='ml-2'>{commentData.likes.length}</p>
                </span>
            </div>
        );
    } else {
        return (
            <div>No comments on this post</div>
        )
    }
}

export default Comments;
