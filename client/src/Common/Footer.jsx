import React from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FiInstagram, FiYoutube } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";


const Footer = () => {
  return (
    <div className="bg-slate-50 pt-5 ">
      <div className="flex w-full  pt-5 pb-5 ">
        <div className="w-1/4 flex flex-col items-center ">
          <div>
            <h2 className="text-xl font-semibold">ABOUT</h2>
          </div>
          <div className="pl-8 mt-2 font-medium">
            <div>
              <div className="cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:underline">
                Contact Us
              </div>
              <div className="cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:underline">
                About Us
              </div>
              <div className="cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:underline">
                Careers
              </div>
              <div className="cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:underline">
                Stories
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 flex flex-col  items-center">
          <div>
            <h2 className="text-xl font-semibold">HELP</h2>
          </div>
          <div className="pl-16 mt-2 font-medium">
            <div>
              <div className="cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:underline">
                Payments
              </div>
              <div className="cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:underline">
                Shipping
              </div>
              <div className="cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:underline">
                Cancellation <br />& Returns
              </div>
              <div className="cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:underline">
                FAQ
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 flex flex-col  items-center">
            <div>
            <h2 className="text-xl font-semibold">CONSUMER POLICY</h2>

            </div>
          <div className="pl-8 mt-2 font-medium">
            <div className="cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:underline">
              Cancellation & Returns
            </div>
            <div className="cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:underline">
              Terms Of Use
            </div>
            <div className="cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:underline">
              Security
            </div>
            <div className="cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:underline">
              Privacy
            </div>
          </div>
        </div>
        <div className="w-1/4 flex flex-col  items-center">
          <h2 className="text-xl font-semibold">SOCIAL</h2>
          <div className="flex justify-center mt-3 w-full text-2xl font-semibold">
            <div className="h-10 w-10 mr-2 flex items-center justify-center  rounded-full  hover:bg-gradient-to-t from-[#833AB4] via-[#E1306C] to-[#FD7E14] hover:text-white cursor-pointer transition-colors duration-300">
              <FiInstagram />
            </div>
            <div className="h-10 w-10 mr-2 flex items-center justify-center rounded-full hover:bg-[#FF0000] hover:text-white transition-colors duration-300 cursor-pointer">
              <FiYoutube />
            </div>
            <div className="h-10 w-10 mr-2 flex items-center justify-center rounded-full hover:bg-[#25D366] hover:text-white cursor-pointer">
              <IoLogoWhatsapp />
            </div>
            <div className="h-10 w-10 mr-2 flex items-center justify-center rounded-full hover:bg-[black] hover:text-white cursor-pointer">
              < RiTwitterXFill/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;