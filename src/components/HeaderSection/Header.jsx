import React, { useState } from "react";
import { useAppContext } from "../../useContextHook/useContextApi";
import { useTheme } from "../../useContextHook/useTheme";
import { CgClose } from "react-icons/cg";
import { SlMenu } from "react-icons/sl";
import Desktop_logo from "../../assets/yt_dekstop.png";
import mobile_logo from "../../assets/youtube_mobile.png";
import { Link, useNavigate } from "react-router-dom";
import SpinnerLoader from "../../utils/SpinnerLoader";
import { IoIosSearch, IoMdMic } from "react-icons/io";
import { IoMicOff } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { FiMoon, FiSun } from "react-icons/fi";

import useSpeechRecognitions from "../../useContextHook/useSpeechRecognition";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, mobileMenu, setMobileMenu } = useAppContext();
  const { isDarkMode, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const {listening,stopListening,startListening,browserSupportSpeechRecognition}=useSpeechRecognitions(setSearchQuery);

  
  const mobileToggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleSearchQuery = () => {
   
    if (searchQuery?.length > 0) {
      navigate(`search/${searchQuery}`);
    }
  };

  const clearSearchQueryHandle = () => {
    setSearchQuery("");
  };

  return (
    <div
      className={`sticky top-0 z-10 flex flex-row items-center justify-between h-20 shadow-lg  px-4 md:px-5 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } ${isDarkMode ? "text-white" : "bg-gray-700"}`}
    >
      {/* {console.log(!loading)} */}
      {loading && <SpinnerLoader />}
      <div className="flex h-5 items-center">
        <div
          onClick={mobileToggleMenu}
          className={`flex md:hidden  md:mr-6 cursor-pointer items-center justify-center h-9 w-10`}
        >
          {mobileMenu ? (
            <CgClose className="text-lg" />
          ) : (
            <SlMenu className="text-lg " />
          )}
        </div>

        <Link to="/" className="flex items-center h-20">
          <img
            src={Desktop_logo}
            alt="utube desktop logo"
            className={`hidden md:block h-full object-contain ${
              isDarkMode ? "invert" : ""
            }`}
          />
          <img
            src={mobile_logo}
            alt="utube mobile logo"
            className={`md:hidden h-14 object-contain ${
              isDarkMode ? "invert" : ""
            }`}
          />
        </Link>
      </div>

      <div className="flex items-center group relative ">
        <div
          className={`flex h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0 ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <div className="w-10 items-center justify-center hidden flex group-focus-within:md:flex">
            <IoIosSearch className="text-xl" />
          </div>
          <input
            type="text"
            placeholder="search anything u want ....."
            className={`pl-5 pr-5 text-sm bg-transparent outline-none md:pl-0 w-32 sm:w-44 md:w-64 lg:w-[500px] ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => {
              console.log(e)
              console.log(e.key)

              if(e.key =="Enter") {
                console.log("inside")
                handleSearchQuery();
              }
            }}
            value={searchQuery}
          />

          {searchQuery && (
         
            <button className="absolute right-24 md:right-32 top1/2 transform translate-y-1/2" 
            onClick={clearSearchQueryHandle}>
              <CgClose className="text-xl" />
            </button>
            
          )}
        </div>
       <button className={`flex items-center justify-center w-[40px] md:w-[60px] h-10 rounded-r-3xl border border-l-0  ${isDarkMode ? "border-x-gray-700" : "border-gray-300"} ${isDarkMode ? "bg-gray-300" : "bg-gray-200"}`}
       onClick={handleSearchQuery}>
          
          <IoIosSearch className="text-3xl"/>
       </button>
       <button className={`flex items-center justify-center ml-2 w-[40px] md:w-[60px] h-8 md:h-10 rounded-full ${isDarkMode ? "hover:bg-blue-700" : "hover:bg-gray-300"} ${isDarkMode ? "bg-gray-300" : "bg-white"}`}
      onClick={()=> {
        if(!browserSupportSpeechRecognition) {
          alert("Browser doesn't support speech recognition");
        }
        else if(listening){
          stopListening()
        }
        else{
          startListening();
        }
      }}
      >
        {listening ? <IoMicOff className="text-xl"/> :<IoMdMic className="text-xl"/> }
        

       </button>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <button className={`hidden md:flex items-center justify-center h-10 w-10 rounded-full ${isDarkMode ? "hover:bg-blue-700" : "hover:bg-gray-300"} ${isDarkMode ? "bg-gray-300" : "bg-white"}  `}>
          <MdVideoCall className="text-xl"/>
        </button>

        <button className={`hidden md:flex items-center justify-center h-10 w-10 rounded-full ${isDarkMode ? "hover:bg-blue-700" : "hover:bg-gray-300"} ${isDarkMode ? "bg-gray-300" : "bg-white"} `}>
          <FaBell className="text-xl"/>
        </button>

        <div className="flex space-x-0 md:space-x-2">
        <button className={`hidden md:flex items-center justify-center h-10 w-10 rounded-full ${isDarkMode ? "hover:bg-blue-700" : "hover:bg-gray-300"} ${isDarkMode ? "bg-gray-300" : "bg-white"} `}>
          <RiAccountCircleLine className="text-xl"/>
        </button>

        <button className={`flex items-center justify-center h-10 w-10 rounded-full ${isDarkMode ? "bg-yellow-500" : "bg-gray-800"}  ${isDarkMode ? "bg-gray-300" : "bg-white"}  `}
        onClick={toggleTheme}>
         {isDarkMode ? (
          <FiSun className="text-xl bg-yellow-400 rounded-full"/>
         ) : (
          <FiMoon className={`text-xl ${isDarkMode ? "text-white" : ""}`}/>
         )
        }
        </button>

        </div>

      </div>
    </div>
  );
};

export default Header;
