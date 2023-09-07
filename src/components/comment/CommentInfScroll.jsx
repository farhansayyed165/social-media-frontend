import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getCommentsPaginated } from '../../api/commentApi'
import Comments from './Comments'

function CommentInfScroll({ data,commentsArray }) {
    const [comments, setComments] = useState(commentsArray.results)
    const [next, setNext] = useState(commentsArray?.next)
    const [hasMore, setHasMore] = useState(commentsArray.next ? true:false)

    // useEffect(() => {
    //     if(comments.length > 0){
    //         return
    //     }
    //     getCommentsPaginated(data._id)
    //         .then(res => {
    //             const results = res.results
    //             const next = res?.next
    //             setComments(prev => {
    //                 const newArray = prev.concat(results);
    //                 console.log(newArray)
    //                 return newArray
    //             })
    //             setNext(next);
    //             setHasMore(next ? true : false)
    //             console.log(comments)
    //         })
    //         return 

    // }, [])
    // let num = 0;
    // useEffect(() => {
    //     console.log(comments);
    //     num++;
    //     console.log("num", num);
    // }, [comments])
    function fetchMore() {
        getCommentsPaginated(data._id, next?.page)
            .then(res => {
                console.log(res)
                const results = res.results
                const next = res?.next
                setComments(prev => {
                    const newArray = prev.concat(results);
                    return newArray
                })
                setNext(next);
                setHasMore(next ? true : false)
            })
    }
    console.log(comments)
    const commentsComponent = comments ? comments.map((comment, id) => {
        return <Comments comment={comment} key={id} />

    }) : <></>
    return (
        <>

            {comments && <InfiniteScroll
                dataLength={comments?.length - 1}
                next={fetchMore}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {commentsComponent}
            </InfiniteScroll>}
        </>
    )
}

export default CommentInfScroll