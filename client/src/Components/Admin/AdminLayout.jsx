import React from "react";
import Adminbar from "./Adminbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Common/Footer";

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen w-full ">
      <Adminbar />
      <main className="flex-1 overflow-y-auto w-full h-full ">
        <Outlet />
      </main>
      
    </div>
  );
};

export default AdminLayout;
