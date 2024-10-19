import React from 'react'
import { useSelector } from 'react-redux';

const UserCard = () => {
  const user = useSelector((state) => state.auth.user);
  console.log('usererer',user);
  

  return (
    <div className="max-w-sm mx-auto bg-orange-100 shadow-orange-200 shadow-lg rounded-lg overflow-hidden">
    <div className="flex flex-col  items-center p-6">
      <img
        className="w-2/3 h-1/2 rounded-md  object-cover"
        src="https://via.placeholder.com/150"
        alt="User profile"
      />
      <div className="flex flex-col justify-center items-center mt-5 m-2">
        <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
    <div className="p-4 border-t border-gray-200">
      <button className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600">
        Edit Profile
      </button>
    </div>
  </div>
  )
}

export default UserCard