import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { searchUser, searchPosts } from '../api/searchApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import SmallPost from '../components/posts/SmallPost';
import { useOutletContext } from "react-router-dom";



function Search() {
  const Context  = useOutletContext()
  const [userData, setUserData] = useState([])
  const [postData, setPostData] = useState([])
  const [toggleSection, setToggleSection] = useState(false)
  const [next, setNext] = useState()
  const [hasMore, setHasMore] = useState()
  const searchParams = useParams().search
  console.log("Search\n", searchParams)

    useEffect(() => {
      searchUser(searchParams, 1)
      .then(userList=>{
          setUserData(userList.results)
          setNext(prev=>({...prev,users:userList.next}))
          setHasMore(prev=>({...prev,users:userList.next ? true:false, }))
      })
      searchPosts(searchParams, 1)
      .then(postList=>{
          setPostData(postList.results)
          setNext(prev=>({...prev, posts:postList.next}))
          setHasMore(prev=>({...prev,posts:postList.next ? true:false}))
      })
    }, [])

  console.log("user",userData)
  console.log("post",postData)


  async function fetchMorePosts() {
    const res = await searchPosts(searchParams, next.posts)
    setPostData(prev => {
      const newArray = prev.concat(res.results)
      return newArray
    })
    setNext(prev => {
      return {
        ...prev,
        posts: res.next
      }
    })
    setHasMore(prev => ({
      ...prev,
      posts: res.next ? true : false
    }))
  }
  async function fetchMoreUsers() {
    const res = await searchUser(searchParams, next.users)
    setUserData(prev => {
      const newArray = prev.concat(res.results)
      return newArray
    })
    setNext(prev => {
      return {
        ...prev,
        users: res.next
      }
    })
    setHasMore(prev => ({
      ...prev,
      users: res.next ? true : false
    }))

  }

  return (
    <>
      <main className='mt-5 mx-auto w-9/10'>
        <h1 className='text-lg font-semibold '>Search results for " {searchParams} "</h1>

        <div className='flex justify-around mb-5'>
          <Link className='searchToggle' onClick={() => { setToggleSection(false) }}>
            <h2 className='text-center text-xl mb-2 font-[Karla]'>Users</h2>
            <span className={`block h-[2px] w-full rounded-md ${toggleSection ? "border-[1px] border-gray-300" : "bg-main-orange"} transition-all duration-200 ease-in-out`}></span>
          </Link>
          <Link className='searchToggle' onClick={() => { setToggleSection(true) }}>
            <h2 className='text-center text-xl mb-2 font-[Karla]'>Posts</h2>
            <span className={`block h-[2px] w-full rounded-md ${toggleSection ? "bg-main-orange" : "border-[1px] border-gray-300"} transition-all duration-200 ease-in-out`}></span>
          </Link>
        </div>
        
        {!toggleSection && <section className='flex'>
          <InfiniteScroll
            dataLength={userData?.length - 1}
            next={fetchMoreUsers}
            hasMore={hasMore?.users ? true:false}
            loader={<h4>Loading...</h4>}>
            {userData ? userData?.map((user, i) => {
              return <Link className="" to={`/${user.username}`} key={i}>
                <div className='flex my-9'>
                  <img src={user.avatar} className=" w-20 rounded-full object-cover mr-4 shadow" alt="" />
                  <div className=''>
                    <h1 className='text-lg font-semibold'>{user.fullname}</h1>
                    <p className='text-sm text-gray-400'>{user.username}</p>
                    <p className=' tracking-wider'>{user?.subText ? user.subText : "Student - Computer Science"} </p>
                  </div>
                </div>
              </Link>
            }):<></>}
          </InfiniteScroll>
        </section>}


        {toggleSection && <section className='flex items-center w-full justify-center'>
          <InfiniteScroll
            dataLength={postData?.length - 1}
            next={fetchMorePosts}
            hasMore={hasMore?.posts ? true:false}
            loader={<h4>Loading...</h4>}>
            {postData?.map((post, i) => {
              return <SmallPost data={post} token={Context.token} user={Context}/>
            })}
          </InfiniteScroll>
        </section>}
      </main>
    </>
  )
}

export default Search