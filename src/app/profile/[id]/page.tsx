import React from 'react'

const ProfilePage= ({params}: any) => {
  return (
    <div className='min-h-screen justify-center items-center flex'>
      profile page with id <span className='p-2 mx-2 bg-orange-400 rounded-lg'>{params.id}</span>
    </div>
  )
}

export default ProfilePage   
