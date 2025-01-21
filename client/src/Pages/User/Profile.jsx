import React from "react";
import UserCard from "../../Common/UserCard";
import AddressCard from "../../Components/User/AddressCard";
import { useSelector } from "react-redux";

const Profile = () => {
  const id = useSelector((state) => state.auth.user.id);

  return (
    <div className="h-svh justify-center flex  items-center">
      <div className="w-1/2">
      <UserCard id={id} />
      </div>
      <div className="w-1/2">
      <AddressCard id={id} />
      </div>
    </div>
  );
};

export default Profile;
