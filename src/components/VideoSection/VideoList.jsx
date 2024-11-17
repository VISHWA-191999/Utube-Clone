import React, { useEffect, useState } from 'react'
import { useTheme } from '../../useContextHook/useTheme'
import { Link } from 'react-router-dom';
import { formatDuration, formatViewCount } from '../../utils/Helper';
import { fetchApiForYoutubeData } from '../../utils/fetchApi';
import { formatPublishTime } from '../../utils/Helper';

const VideoList = ({video}) => {

  console.log("video data from videolist",video);
  const {isDarkMode} = useTheme();
  const [channelData, setChannelData] = useState();
  console.log("inside videolist");

  const fetchChannelData = async () => {
    let data=await fetchApiForYoutubeData(`channels`,{
      part:'snippet,contentDetails,statistics',
      id:video?.snippet?.channelId
    })
    setChannelData(data?.items[0]);

  }

  useEffect(()=>{
    fetchChannelData();
  },[video]);
  return (
    <div>
      <Link to={`video/${video.snippet.categoryId}/${video.id}`}>
      <div className='flex flex-col mb-8'>
        <div className='relative md:rounded-xl overflow-hidden'>
          <img src={video?.snippet?.thumbnails?.medium?.url} alt={video.snippet.title} 
          className='w-full h-full object-cover rounded-md mb-2'/>

          <span className='absolute bottom-4 right-0 bg-gray-800 text-white text-xs p-1 m-1 rounded'>
            {formatDuration(video?.contentDetails.duration)}
          </span>
         </div>
         <div className='flex mt-3'>
            <div className='flex items-center'>
              <div className='flex h-12 w-12 rounded-full overflow-hidden'>
              <img src={video?.snippet?.thumbnails?.high?.url} alt={video.snippet.title} 
          className='w-full h-full object-cover rounded-lg mb-2'/>

              </div>


            </div>
            <div className={`flex flex-col ml-3 overflow-hidden ${isDarkMode ? "bg-gray-900 text-gray-300 " : " text-gray-900"}`}>
              <h3 className='text-md font-bold'>{video?.snippet?.title}</h3>
              <h3 className={`text-xs font-medium ${isDarkMode ? "" : "text-teal-500"}`}>{video?.snippet?.channelTitle}</h3>



              {/* <div className={`text-xs ${isDarkMode ? "text-gray-400": "text-gray-600"}`}>
                {formatViewCount(video?.statistics?.viewCount) } views {formatPublishTime()} 

              </div> */}

              <div className={`text-xs ${isDarkMode ? "text-gray-400": "text-gray-600"}`}>
                {formatViewCount(video?.statistics?.viewCount) } views 

              </div>
              


            </div>

          </div>
      

      </div>
      </Link>
    </div>
  )
}

export default VideoList