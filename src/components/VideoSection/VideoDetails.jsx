import React, { useEffect, useState } from "react";
import { useAppContext } from "../../useContextHook/useContextApi";
import { useParams } from "react-router-dom";
import { useTheme } from "../../useContextHook/useTheme";
import { fetchApiForYoutubeData } from "../../utils/fetchApi";
import { formatPublishTime, formatViewCount } from "../../utils/Helper";
import { FaDownload, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import VideoComments from "./VideoComments";
import RelatedVideos from "./RelatedVideos";

const VideoDetails = () => {
  const { categoryId, videoId } = useParams();
  const { setLoading } = useAppContext();
  const { isDarkMode } = useTheme();
  const [selectedVideoDetails, setSelectedVideoDetails] = useState();
  const [channelData, setChannelData] = useState();
  const [showFullDescription , setShowFullDescription] = useState(false);
  const [commentData, setCommentData] = useState();

  const fetchSelectedVideoDetails = async () => {
    setLoading(true);

    try {
      const data = await fetchApiForYoutubeData("videos", {
        part: "snippet,contentDetails,statistics",
        id: videoId,
      });

      console.log("data", data);
      setSelectedVideoDetails(data?.items[0]);
    } catch (error) {
      console.log("error fetching channel data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChannelData = async () => {
    if (selectedVideoDetails?.snippet?.channelId) {
      setLoading(true);
      try {
        const data = await fetchApiForYoutubeData(`channels`, {
          part: "snippet,contentDetails,statistics",
          id: selectedVideoDetails?.snippet?.channelId,
        });
       
        setChannelData(data?.items[0]);
      } catch (error) {
        console.log("error fetching channel data", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchVideoComments = async () => {
  
      setLoading(true);
      try {
        const data = await fetchApiForYoutubeData(`commentThreads`, {
          part: "snippet",
          videoId:videoId,
          maxResults:30
        });
        console.log(data);
        setCommentData(data?.items);
      } catch (error) {
        console.log("error fetching channel data", error);
      } finally {
        setLoading(false);
      }
    
  };


  useEffect(() => {
    fetchSelectedVideoDetails();
    fetchVideoComments();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [selectedVideoDetails]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  const description = selectedVideoDetails?.snippet?.description;
  const truncateDescription = description?.slice(0,240);

  return (
    <div
      className={`flex justify-center flex-row h-full ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="w-full flex flex-col p-4 lg:flex-row space-x-4 ">
        <div className="flex flex-col lg:w-[70%] px-4 py-3 lg:py-6 overflow-auto">
          <div className="h-[300px] md:h-[450px] lg:h-[500px] xl:h[600px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1 `}
              className="rounded-xl"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          {selectedVideoDetails && (
            <div className="mt-4 flex flex-col gap-6">
              <h2 className="text-2xl font-bold">
                {selectedVideoDetails?.snippet?.title}
              </h2>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                <div className="flex items-center mb-4 lg:mb-0">
                  <img src={channelData?.snippet?.thumbnails?.default?.url} alt={channelData?.snippet?.title} className="w-12 h-12 rounded-full"/>
                 <div className="mt-3 ml-2 lg:mt-0">
                 <h3 className="text-lg font-bold">
                    {channelData?.snippet?.title}

                  </h3>
                  <p className={`font-medium text-sm ${isDarkMode ? "text-gray-200" : "text-black"}`}>
                    {formatViewCount(channelData?.statistics?.subscriberCount)} {" "} subscribers

                  </p>
                 </div>
                 <button className={`bg-black text-white font-semibold px-6 lg:py-3 py-2 mt-2 ml-1 lg:ml-6 rounded-full ${isDarkMode ? "bg-teal-300 text-red-300" : "text-white bg-black"}`}>
                  Subscribe

                 </button>



                </div>
                <div className="flex items-center justify-between space-x-4">
                  <button className={`flex items-center space-x-2 rounded-full px-4 py-2 md:px-6 md:py-4 ${isDarkMode ? "bg-black": "bg-slate-200"}`}>
                    <FaThumbsUp/>
                    <span>
                      {formatViewCount(selectedVideoDetails?.statistics?.likeCount)}
                    </span>
                    <div className="h-5 w-[1px] bg-gray-400 mx-2"></div>
                    <FaThumbsDown/>

                  </button>

                  <button className={`flex items-center space-x-2 rounded-full px-4 py-2 md:px-6 md:py-4 ${isDarkMode ? "bg-black": "bg-slate-200"}`}>
                    <FaDownload/> 
                    <span> Download </span>
                    </button>

                </div>

              </div>

              <div className="bg-slate-200 rounded-xl p-4">
                <p className="text-gray-900">
                  {formatViewCount(selectedVideoDetails?.statistics?.viewCount)} {" "} views 
                
                </p>
                <p className="text-black">
                  {showFullDescription ? description : truncateDescription}
                  {description?.length > 240 && (
                    <button onClick={toggleDescription} className="text-blue-500 ml-2">
                      {showFullDescription ? 'show less' : 'show more'}

                    </button>
                  )}

                </p>

              </div>

            </div>
          )}
          <div className="mt-8">
            <p className={` ${isDarkMode ? "text-gray-200" : "text-black" } font-semibold text-lg`}>

              {formatViewCount(selectedVideoDetails?.statistics?.commentCount)} {" "}
              Comments

            </p>
          </div>
          {commentData?.map((comment) => (
           
            <VideoComments comment={comment} key={comment.id}></VideoComments>
          ))}
           
      </div>
      <div className="lg:w-[30%] p-4">
        <h3 className="text-xl font-bold mb-4"> Related Videos</h3>
        <RelatedVideos categoryId={categoryId}/>

      </div>
      </div>
     
    </div>
  );
};

export default VideoDetails;
