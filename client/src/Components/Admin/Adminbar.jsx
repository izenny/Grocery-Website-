import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { LuUser2 } from "react-icons/lu";
import { RiCustomerService2Line } from "react-icons/ri";
import { IoIosLeaf } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/AuthSlice";
const Adminbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandle = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      alert("error");
    }
  };
  return (
    <div className="shadow p-1">
      <div className="flex flex-col md:flex-row h-[4rem] justify-between items-center">
        <div className="flex items-center w-1/6 justify-center h-full ml-4">
          <IoIosLeaf className="text-green-800 mr-1 text-3xl" />
          <Link to="/admin/home">
            <h2 className="text-3xl text-orange-500 font-Merriweather">
              Grocery
            </h2>
          </Link>
        </div>
        <div className="flex-1 text-[.9em] h-full">
          <ul className="flex h-full items-center justify-around font-serif">
            <Link to="/admin/customermanagement">
              <li className="hover:scale-110 hover:text-green-700 transform transition-transform duration-200 cursor-pointer">
                User Management
              </li>
            </Link>

            <Link to="/admin/ordermanagement">
              <li className="hover:scale-110 hover:text-green-700 transform transition-transform duration-200 cursor-pointer">
                Order Management
              </li>
            </Link>

            <Link to="/admin/inventorymanagement">
              <li className="hover:scale-110 hover:text-green-700 transform transition-transform duration-200 cursor-pointer">
                Inventory Management
              </li>
            </Link>

            {/* <Link to="/admin/discountsandoffers">
                <li className="hover:scale-110 hover:text-green-700 transform transition-transform duration-200 cursor-pointer">
                  Discounts and Offers
                </li>
              </Link> */}

            <Link to="/admin/reportsandanaltics">
              <li className="hover:scale-110 hover:text-green-700 transform transition-transform duration-200 cursor-pointer">
                Reports and Analytics
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex justify-evenly items-center w-1/5 mr-4">
          {/* <Link to="/admin/settings">
              <div className="text-2xl shadow-md bg-white hover:text-green-700 p-2 rounded-xl cursor-pointer hover:scale-110">
                <AiOutlineSetting />
              </div>
            </Link> */}

          <Link to="/admin/customerservice">
            <div className="text-2xl shadow-md bg-white hover:text-green-700 p-2 rounded-xl cursor-pointer hover:scale-110">
              <RiCustomerService2Line />
            </div>
          </Link>

          <Link to="/admin/profile">
            <div className="text-2xl shadow-md bg-white hover:text-green-700 p-2 rounded-xl cursor-pointer hover:scale-110">
              <LuUser2 />
            </div>
          </Link>

          <div
            onClick={logoutHandle}
            className="text-lg font-madimione shadow-md flex justify-center items-center gap-2 bg-white hover:text-red-600  p-2 rounded-xl cursor-pointer hover:scale-110"
          >
            <RiLogoutCircleRLine /> Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminbar;
