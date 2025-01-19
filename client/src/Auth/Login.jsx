import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { FcGoogle } from "react-icons/fc";
import { loginUser } from '../Redux/AuthSlice';
import { Link } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const submitLoginCread = async () => {
        dispatch(loginUser({ email, password })).then((data) => {
          if (data?.payload?.success) {
            console.log(data);
            alert(data?.payload?.message);
            setEmail("");
            setPassword("");
            setErrors({});
          } else {
            console.log(data?.payload?.message);
            alert(data?.payload?.message);
          }
        });
       
      };
    
      const validateForm = () => {
        const errors = {};
    
        if (!email.trim()) {
          errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = "Email is invalid";
        }
    
        if (!password.trim()) {
          errors.password = "Password is required";
        } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) {
          errors.password =
            "Password must contain at least one number and one special character, and be at least 8 characters long";
        }
    
        return errors;
      };
    
      const loginData = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
          submitLoginCread();
          console.log("Form submitted successfully");
        } else {
          setErrors(errors);
        }
      };

      
  return (
    <div className='w-full   h-screen bg-yellow-300 font-Merriweather flex  justify-center items-center'>
       <div className="w-[20rem] h-[28rem] flex flex-col justify-around items-center bg-white p-6 rounded-lg shadow">
        <h2 className="text-4xl font-madimione mb-4">Login</h2>
        <form onSubmit={loginData} className="w-full">
          <div className="w-full mb-4">
            <input
              type="email"
              placeholder="Email"
              className="p-2 rounded-md w-full border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
            {errors.email && (
              <span className="error text-xs text-red-700">{errors.email}</span>
            )}
          </div>
          <div className="w-full mb-4">
            <input
              type="password"
              placeholder="Password"
              className="p-2 rounded-md w-full border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            {errors.password && (
              <span className="error text-xs text-red-700">
                {errors.password}
              </span>
            )}
            <h5 className="text-right text-sm text-blue-500 cursor-pointer mt-1">
              Forgot password?
            </h5>
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-orange-400 rounded-lg"
          >
            Shop
          </button>
        </form>
        <div className="flex items-center justify-center bg-white p-2 mt-4 rounded-md shadow-inner cursor-pointer">
          <FcGoogle className="text-xl" />
          <span className="pl-2">Signup with Google</span>
        </div>
        <div className="mt-2 text-xs">
          <h2>
            Didn't have an account?{" "}
            <Link to={"/register"}>
              <span className="text-green-800 text-sm hover:cursor-pointer">
                Register
              </span>
            </Link>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Login