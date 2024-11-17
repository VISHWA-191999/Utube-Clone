import React from 'react'
import { useTheme } from '../../useContextHook/useTheme'

const Menuitems = ({item,isSelected,onClick}) => {
  // console.log("inside MenuItems ", item)
  const{isDarkMode} =useTheme();

  return (
    
    <div onClick={item.type === 'category' ? onClick:undefined} 
     className={`px-4 py-3  flex items-center space-x-4 rounded-md cursor-pointer ${isDarkMode ? "bg-teal-200  hover:bg-gray-700" : "bg-teal-500 hover:bg-gray-100"} ${isSelected ? (isDarkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
     >
      <span className={`text-xl ${isDarkMode ? "text-gray-900" : "text-gray-100"} `}>
        {item.icon}

      </span>
      <span className={`text-sm ${isDarkMode ? "text-gray-900" : "text-gray-100"}`}>
        {item.name}

      </span>

    </div>
  )
}

export default Menuitems