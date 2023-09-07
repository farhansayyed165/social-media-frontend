import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { createComment } from '../../api/commentApi';
import { useLocation } from 'react-router-dom';

const CreateComment = ({ postId, setPostData }) => {
    const path = useLocation().pathname
        const [cookies] = useCookies(['access-token'])
        const token = cookies['access-token']
        const [commentData, setCommentData] = useState({ content: "", postId: postId });
    
        const handleChange = (e)=>{
            const { name, value } = e.target;
            setCommentData(prev => 
                 ({
                    ...prev,
                    [name]: value
                })
             )

        }
    
        const handleSubmit = (e) => {
            e.preventDefault();
            createComment(commentData, token)
                .then(res => {
                    alert(res.message)

                    setCommentData(prev=>({...prev,content:""}))
                    window.location.reload()
                })
        }
        return (
            <>
                <form onSubmit={handleSubmit} className='mt-3 relative mb-10'>
                    <textarea
                        name="content"
                        id="create-comment-textarea"
                        placeholder='comments'
                        onChange={handleChange}
                        value={commentData.content}
                        rows={2}
                        className='border-2 border-gray-400 w-full rounded resize-none p-2 mb-2 flex items-center'
                    ></textarea>
                    <button type='submit' className='font-semibold tracking-wide uppercase text-white p-2 px-3 border-2 rounded bg-[hsla(42,100%,53%,1)] focus:bg-[#d68400] hover:bg-[#d68400]  transition-all duration-200 ease-in-out'>Submit</button>
                </form>

            </>
    
        );
    }
    
    

export default CreateComment;

