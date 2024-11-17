import React from 'react'
import { useAppContext } from '../../useContextHook/useContextApi'
import { useTheme } from '../../useContextHook/useTheme';
import { categories, menuItems } from '../../utils/constant';
import Menuitems from './Menuitems';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const{mobileMenu , selectedCategory, setSelectedCategory} =useAppContext();
  const{isDarkMode} = useTheme();
  const navigate =useNavigate();
  const handleCategoryClick = (id,name) => {

    setSelectedCategory(id)
    if(name=='Home') {
      navigate('/')
    }

  }
  return (
    <div className={` md:block overflow-y-auto h-[75%] py-4 w-[300px] mt-2 fixed z-10 sm:overflow-y-auto sm:fixed sm:bg-white sm:z-10  md:relative z-0 ${mobileMenu ? "block" : "hidden"} ${isDarkMode ? "border-gray-700": "border-gray-200"}`}>
        <div className='flex flex-col px-5 mb-20'>

          {categories.map((item) => (
            // console.log(item),
            // console.log(selectedCategory),

            <Menuitems 
            key={item.id}
            item={item}
            isSelected={item.id === selectedCategory}
            onClick={()=> handleCategoryClick(item.id , item.name)}
            />
          )
            
          )}
          <hr className={`my-3 ${isDarkMode ? "border-gray-600":"border-gray-300"}`}/>

          {menuItems.map((item)=>(
            <Menuitems
            key={item.name}
            item={item}
            isSelected={false}/>
          ))}
            <hr className={`my-3 ${isDarkMode ? "border-gray-600":"border-gray-300"}`}/>
            <div className={`flex items-center justify-center text-lg font-semibold  flex-nowrap ${isDarkMode ? "text-blue-600 bg-teal-200":"text-yellow-600 bg-teal-300"} `}>
              made by : Vishwajeet Gaikwad

            </div>


        </div>
    </div>
  )
}

export default Sidebar