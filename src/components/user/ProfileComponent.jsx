import React, {useState} from 'react'
import EditProfile from './editProfile'
import FollowComponent from './Follow'
import coverImg from '../../assets/pexels-miriam-espacio-2694037.jpg'

function ProfileComponent({ data, user, token, setData   }) {

  const [edit, setEdit] = useState(false)
  const toFollowId = data._id;
  const backgroundImageUrl = data?.backgroundImage ? data.backgroundImage : coverImg
// 'https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80'
  const editProfileComponent = (
    <>
      <button type='button' onClick={handleEdit} className=" bg-[#eea735] border- border-main-orange font-[Karla] active:border-darker-orange uppercase text-white font-bold hover:shadow-md shadow text-md px-4 py-2 rounded outline-none focus:outline-none sm:self-center mb-1 ease-linear transition-all duration-150">{"Edit profile"}</button>
    </>
  )

  const FollowComponentRender = user?.login ? <FollowComponent toFollowId={toFollowId} token={token} user={user} setData={setData} /> : <></>
  const renderEdit = (data.username == user?.username) ? editProfileComponent : FollowComponentRender
  function handleEdit(e) {
    e.preventDefault()
    setEdit(!edit)
 
  }

  return (
    <>
          { (data.username == user?.username) && <EditProfile token={token} data={data} showEdit={edit} setOff={setEdit}/>}
    <main className="profile-page ">
      <section className="relative block min-h-[500px]">
        <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" >
          <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center relative">
                    <img alt="..." src={data.avatar} className="shadow-xl rounded-full h-[170px] align-middle border-none absolute -m-16 -ml-10 lg:-ml-16 w-[170px] object-cover  " />
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right md:justify-normal sm:mt-[100px] md:mt-0 lg:block flex justify-center lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    {renderEdit}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{data.followers.length}</span><span className="text-sm text-blueGray-400">Followers</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{data.following.length}</span><span className="text-sm text-blueGray-400">Following</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{data.posts.length}</span><span className="text-sm text-blueGray-400">Posts</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-none mb-1 text-blueGray-700">
                  {data.fullname}
                </h3>
                <div className="mb-2 text-blueGray-600 mt-10">
                 {data?.subText}
                </div>
              </div>
              <div className="mt-4 py-10 border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {data?.about ? data.about : " 🚀"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}

export default ProfileComponent