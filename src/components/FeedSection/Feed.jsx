import React from 'react'
import { useAppContext } from '../../useContextHook/useContextApi'
import { useTheme } from '../../useContextHook/useTheme';
import Sidebar from '../SidebarSection/Sidebar';
import VideoList from '../VideoSection/VideoList';

export const Feed = () => {

  const {loading,videoData} = useAppContext();
  const {isDarkMode} =useTheme();
  console.log(videoData);
  return (
    <div className={`flex flex-row h-screen overflow-hidden ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"}`}>
      <Sidebar/>
     
        <div className='w-full grow overflow-y-auto overflow-hidden'>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5'>
         {!loading && videoData && videoData.map((item) => (
          <div key={item?.id}>
            <VideoList video={item} />
          </div>
        ))}
         </div>

      </div>

    </div>
  )
}
