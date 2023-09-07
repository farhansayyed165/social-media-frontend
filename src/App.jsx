import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from './components/Layout.jsx'
import Home, { loader as HomeLoader } from './pages/Home'
import Login from './pages/Login.jsx'
import CreateUser from './pages/CreateUser'
import Profile from './pages/Profile'
import { loader as profileLoader } from './pages/Profile'
import Submit from './pages/Submit'
import Post, { loader as PostLoader } from './pages/Post'
import Auth from './components/Auth'
import WillNotLoadIfLoggedIn from './components/NotRequired'
import UsernameError from './components/error/UsernameError'
import Search from './pages/Search'
import Settings, {loader as SettingsLoader} from './pages/Settings'
import EditPost, {loader as EditPostLoader} from './pages/EditPost'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />} >
      <Route index element={<Home />} loader={HomeLoader} />

      <Route element={<WillNotLoadIfLoggedIn />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<CreateUser />} />
      </Route>

      <Route path='search'>
        <Route path=':search' element={<Search />} />
      </Route>


      <Route path=':username' element={<Profile />} errorElement={<UsernameError />} loader={profileLoader}></Route>
      <Route path='settings' element={<Settings/>} loader={SettingsLoader}/>
      <Route element={<Auth />} >
        <Route path='submit' element={<Submit />} />
      </Route>

        <Route path='edit'>
            <Route path=':postId' element={<EditPost/>} loader={EditPostLoader}></Route>
        </Route>
      <Route path='posts'>
        <Route path=':postId' element={<Post />} loader={PostLoader} />
      </Route>
      <Route path='/logout' element></Route>
  </Route>
))


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}


export default App
