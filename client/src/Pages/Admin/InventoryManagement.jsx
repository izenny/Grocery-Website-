import React from "react";
import { Link, Outlet } from "react-router-dom";

const InventoryManagement = () => {
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-[20%] shadow-sm pr-3 ">
        <div className="m-1 h-full flex flex-col justify-center">
          <Link to={"addnewproduct"}>
            <div className=" w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center ">
              <h2>Add New Products</h2>
            </div>
          </Link>
          <Link to={"editproducts"}>
            <div className=" w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center ">
              <h2>Edit Products</h2>
            </div>
          </Link>
          <Link to={"viewallproducts"}>
            <div className=" w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center ">
              <h2>View All Products</h2>
            </div>
          </Link>
          <Link to={"viewlowstocks"}>
            <div className=" w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center ">
              <h2>View Low Stock Products</h2>
            </div>
          </Link>

          <Link to={"addstocks"}>
            <div className=" w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center ">
              <h2>Add Stocks</h2>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default InventoryManagement;
