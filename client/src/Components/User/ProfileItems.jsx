// import React from "react";
// import { Link } from "react-router-dom";

// const ProfileItems = ({ isOpen }) => {
//   return (
//     <div className="relative">
//       {isOpen && (
//         <div className="absolute z-10 right-0 mt-9 w-56 bg-white shadow-lg rounded-md">
//           <ul className="py-2">
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               <Link to="profile">View Profile</Link>
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               <Link to="orders">My Orders</Link>
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               <Link to="notifications">Notifications</Link>
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               <Link to="settings">Settings</Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileItems;
import React from "react";
import { Link } from "react-router-dom";

const ProfileItems = ({ isOpen, toggleDropdown }) => {
  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute z-10 right-0 mt-9 w-56 bg-white shadow-lg rounded-md">
          <ul className="py-2">
            <li onClick={toggleDropdown} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="profile">View Profile</Link>
            </li>
            <li onClick={toggleDropdown} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="orders">My Orders</Link>
            </li>
            <li onClick={toggleDropdown} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="notifications">Notifications</Link>
            </li>
            <li onClick={toggleDropdown} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="settings">Settings</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileItems;
