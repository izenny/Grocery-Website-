import React from 'react'
import { AiOutlineArrowRight } from "react-icons/ai";
import Vegitables from "../../assets/vegi.png";
import Shoppingbag from "../../assets/Shoppingbag.png";
const Start = () => {
  return (
    <div className="w-full  bg-yellow-300 flex flex-col">
  <div className=" w-full pt-4  flex flex-wrap ">
    <div className="w-1/3 ">
      <img src={Vegitables} alt="" className="h-full w-full object-contain" />
    </div>
    <div className="flex flex-col  justify-center items-center w-1/3  pl-12  ">
      <div className="text-center">
        <h2 className="text-5xl font-madimione leading-snug text-slate-50  ">
          Make Healthy Life With <span className="text-green-500">Fresh</span>{" "}
          Grocery Products
        </h2>
      </div>
      <div className="mt-5">
        <button className="flex justify-center items-center relative py-2 px-8 text-black text-base font-semibold border-none nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-orange-500 before:to-orange-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
          Shop Now
          <div className=" bg-white rounded-full ml-5 p-2">
            <AiOutlineArrowRight className="fill-green-600 hover:animate-ping hover:delay-500" />
          </div>
        </button>
      </div>
    </div>
    <div className="  w-1/3   ">
      <img src={Shoppingbag} alt="" className="h-full w-full object-cover" />
    </div>
  </div>
  <div className=" w-full bg-slate-50 pb-8 flex-1 flex flex-wrap pt-6 justify-around items-center  ">
    <div className="div h-[8em]  w-[15em] bg-white mt-2 rounded-[1em] overflow-hidden relative flex justify-center items-center group p-2 z-0">
      <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#ff5e00] group-hover:scale-[800%] duration-500 z-[-1]"></div>
      <h1 className=" text-center font-semibold  group-hover:text-white duration-500 text-[1.3rem]">
        Product from organic farm
      </h1>
    </div>
    <div className="div h-[8em] w-[15em] bg-white mt-2 rounded-[1em] overflow-hidden relative flex justify-center items-center group p-2 z-0">
      <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#ff5e00] group-hover:scale-[800%] duration-500 z-[-1]"></div>
      <h1 className=" text-center font-semibold  group-hover:text-white duration-500 text-[1.3rem]">
        Free Home Delivery
      </h1>
    </div>
    <div className="div h-[8em] w-[15em] bg-white mt-2 rounded-[1em] overflow-hidden relative flex justify-center items-center group p-2 z-0">
      <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#ff5e00] group-hover:scale-[800%] duration-500 z-[-1]"></div>
      <h1 className=" text-center font-semibold  group-hover:text-white duration-500 text-[1.3rem]">
        10% Discount on Fruits
      </h1>
    </div>
    <div className="div h-[8em] w-[15em] bg-white mt-2 rounded-[1em] overflow-hidden relative flex justify-center items-center group p-2 z-0">
      <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#ff5e00] group-hover:scale-[800%] duration-500 z-[-1]"></div>
      <h1 className=" text-center font-semibold  group-hover:text-white duration-500 text-[1.3rem]">
        20% discont on Vegitables
      </h1>
    </div>
  </div>
</div>

  )
}

export default Start