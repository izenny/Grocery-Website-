import React, { useEffect } from "react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "./Redux/AuthSlice";
import CheckAuth from "./Auth/CheckAuth";
import NotFoundPage from "./Common/NotFoundPage";
import UnAuthPage from "./Common/UnAuthPage";
import Navbar from "./Components/User/Navbar";
import InventoryManagement from "./Pages/Admin/InventoryManagement";
import AdminLayout from "./Components/Admin/AdminLayout";
import OrderManagement from "./Pages/Admin/OrderManagement";
import UserManagement from "./Pages/Admin/UserManagement";
import AdminProfile from "./Pages/Admin/AdminProfile";
import ReportsAndAnalytics from "./Pages/Admin/ReportsAndAnalytics";
import AdminHome from "./Pages/Admin/AdminHome";
import AddNewProduct from "./Components/Admin/AddNewProduct";
import EditProducts from "./Components/Admin/EditProducts";
import ViewAllProducts from "./Components/Admin/ViewAllProducts";
import ViewLowStocks from "./Components/Admin/ViewLowStocks";
import AddStocks from "./Components/Admin/AddStocks";
import Start from "./Pages/User/Start";
import UserLayout from "./Components/User/UserLayout";
import Categories from "./Pages/User/Categories";
import Cart from "./Pages/User/Cart";
import { fetchCart } from "./Redux/CartSlice";
import Profile from "./Pages/User/Profile";
import Order from "./Pages/User/Order";
import PlaceOrder from "./Pages/User/PlaceOrder";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  // console.log(user, isAuthenticated, isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);
  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(fetchCart({ id: user._id }));
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <div className="h-full w-full  overflow-y-scroll no-scrollbar flex  items-center justify-center  ">
      <Routes>
        <Route
          path="/"
          element={<CheckAuth user={user} isAuthenticated={isAuthenticated} />}
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth user={user} isAuthenticated={isAuthenticated}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<AdminHome />} />
          <Route path="customermanagement" element={<UserManagement />} />
          <Route path="ordermanagement" element={<OrderManagement />} />
          <Route path="inventorymanagement" element={<InventoryManagement />}>
            <Route path="addnewproduct" element={<AddNewProduct />} />
            <Route path="editproducts" element={<EditProducts />} />
            <Route path="viewallproducts" element={<ViewAllProducts />} />
            <Route path="viewlowstocks" element={<ViewLowStocks />} />
            <Route path="addstocks" element={<AddStocks />} />
          </Route>
          <Route path="reportsandanaltics" element={<ReportsAndAnalytics />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="customerservice" element={<InventoryManagement />} />
        </Route>
        {/* User Routes */}
        <Route
          path="/user"
          element={
            <CheckAuth user={user} isAuthenticated={isAuthenticated}>
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Start />} />
          <Route path="categories" element={<Categories />} />
          <Route path="newoffers" element={<Start />} />
          <Route path="aboutus" element={<Start />} />
          <Route path="cart" element={<Cart />} />
          <Route path="placeorder" element={<PlaceOrder />} />

          <Route path="profile" element={<Profile />} />
          <Route path="favorites" element={<Start />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
        <Route path="unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
};

export default App;
