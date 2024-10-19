import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosLeaf } from "react-icons/io";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/AuthSlice";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import ProfileItems from "./ProfileItems";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.items).length;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const logoutHandle = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      alert("error");
    }
  };
  return (
    <div className="flex flex-col h-full w-full">
      <div className="shadow p-1 ">
        <div className="flex h-[4rem] justify-between items-center">
          <div className="flex items-center w-1/6 justify-center h-full ml-4">
            <IoIosLeaf className="text-green-800 mr-1 text-3xl" />
            <h2 className="text-3xl text-orange-500 font-Merriweather">
              Grocery
            </h2>
          </div>
          <div className="flex-1 h-full">
            <ul className="flex h-full items-center justify-around font-serif">
              <Link
                to="/user/home"
                className="hover:scale-110 hover:text-green-700 transform transition-transform duration-200 cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="categories"
                className="hover:scale-110 hover:text-green-700 transform transition-transform duration-200 cursor-pointer"
              >
                Category
              </Link>
              <Link
                to="newoffers"
                className="hover:scale-110 hover:text-green-700 transform transition-transform duration-200 cursor-pointer"
              >
                New Offers
              </Link>
              <Link
                to="aboutus"
                className="hover:scale-110 hover:text-green-700 transform transition-transform duration-200 cursor-pointer"
              >
                About Us
              </Link>
              {/* <Link
                to="contact"
                className="hover:scale-110 hover:text-green-700 transform transition-transform duration-200 cursor-pointer"
              >
                Contact
              </Link> */}
            </ul>
          </div>
          <div className="flex justify-evenly items-center flex-1 mr-4">
            <div className="flex relative">
              <input
                type="text"
                className="input shadow-md font-sans px-5 py-1 rounded-xl w-56 transition-all outline-none"
              />
              <IoSearch className="absolute top-2 right-3" />
            </div>
            <Link
              to="cart"
              className="text-2xl relative shadow-md bg-white hover:text-green-700 p-2 rounded-xl cursor-pointer hover:scale-110"
            >
              <IoCartOutline />
              <div className="absolute -top-2 -right-1 text-white text-xs bg-green-500 font-mono font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </div>
            </Link>
            <Link
              to="favorites"
              className="text-2xl shadow-md bg-white hover:text-green-700 p-2 rounded-xl cursor-pointer hover:scale-110"
            >
              <AiOutlineHeart />
            </Link>
            {/* <Link
              to="profile"
              className="text-2xl shadow-md bg-white hover:text-green-700 p-2 rounded-xl cursor-pointer hover:scale-110"
            >
              <LuUser2 />
            </Link> */}
            <div
              onClick={toggleDropdown}
              className="text-2xl shadow-md bg-white hover:text-green-700 p-2 rounded-xl cursor-pointer hover:scale-110"

            >
              <LuUser2 />
            </div>
            <ProfileItems isOpen={isOpen} toggleDropdown={toggleDropdown}/>

            <div
              onClick={logoutHandle}
              className="text-lg font-madimione shadow-md flex justify-center items-center gap-2 bg-white hover:text-red-600  p-2 rounded-xl cursor-pointer hover:scale-110"
            >
              <RiLogoutCircleRLine /> Logout
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Navbar;
