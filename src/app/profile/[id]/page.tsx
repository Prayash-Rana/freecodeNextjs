"use client";

import { useParams } from 'next/navigation';

const ProfilePage = () => {
  const params = useParams(); // Access route parameters

  return (
    <div className='min-h-screen flex justify-center items-center'>
      Profile page with id{' '}
      <span className='p-2 mx-2 bg-orange-400 rounded-lg'>{params.id}</span>
    </div>
  );
};

export default ProfilePage;
