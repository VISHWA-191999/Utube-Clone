import React from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { formatViewCount } from "../../utils/Helper";

const VideoComments = ({ comment }) => {
    // console.log("comments",comment)
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center mb-4 mt-4 rounded-lg">
      <img
        src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
        alt={comment?.snippet?.title}
        className="w-12 h-12 rounded-full mb-2 lg:mb-0 lg:mr-4"
      />
      <div className="flex-1 ">
        <div className="flex gap-2">
            <h3 className="text-sm lg:text-base font-semibold">
                {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}

            </h3>
           
        </div>
        <p className="text-sm lg:text-base mt-2">
            {comment?.snippet?.topLevelComment?.snippet?.textDisplay}

        </p>
        <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1 ">
                <FaThumbsUp/>
                <span className="text-xs lg:text-sm">
                    {formatViewCount(comment?.snippet?.topLevelComment?.snippet?.likeCount)}
                </span>

            </div>
            <div className="flex items-center space-x-2">
                <FaThumbsDown/>

            </div>

        </div>
      </div>
    </div>
  );
};

export default VideoComments;