import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/AuthSlice";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

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
  const signupapicall = async () => {
    dispatch(registerUser({ name, email, password })).then((data) => {
        console.log('signup',data);
        
      if (data?.payload?.success) {
        alert(data.payload.message);
        setName("");
        setEmail("");   
        setPassword("");
        setErrors({});
        navigate("/login");
      } else {
        alert(data.payload.message);
        setName("");
        setEmail("");
        setPassword("");
        setErrors({});
      }
    });
  };
  const signupData = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      signupapicall();
      console.log("Form submitted successfully");
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="w-full   h-screen bg-yellow-300 font-Merriweather flex  justify-center items-center">
      <div className="w-[20rem] flex flex-col justify-around items-center bg-white p-6 rounded-lg shadow">
        <h2 className="text-4xl mb-8 mt-4">Signup</h2>
        <form onSubmit={signupData} className="w-full">
          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Name"
              className="p-2 rounded-md w-full border"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Name"
            />
            {errors.name && (
              <span className="error text-xs text-red-700">{errors.name}</span>
            )}
          </div>
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
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-orange-400 rounded-lg"
          >
            Signup
          </button>
        </form>
        <div className="flex items-center justify-center bg-white p-2 mt-6 mb-2 rounded-md shadow-inner cursor-pointer">
          <FcGoogle className="text-xl" />
          <span className="pl-2">Signup with Google</span>
        </div>
        <div className="mt-2 text-xs">
          <h2>
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-green-800 text-sm hover:cursor-pointer">
                Login
              </span>
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Register;
