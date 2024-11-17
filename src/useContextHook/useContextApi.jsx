import { createContext, useContext, useEffect, useState } from "react";
import { fetchApiForYoutubeData } from "../utils/fetchApi";


export const Context= createContext();

export const AppContext = ({children}) => {

    const [selectedCategory , setSelectedCategory] = useState('0');
    const [loading, setLoading] = useState(false);
    const [videoData, setVideoData] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);

    const fetchYoutubeData = async (params) => {
        setLoading(true)

        try {
            const response=await fetchApiForYoutubeData('videos',params)
            console.log(response);
            // console.log(response.items);

            setVideoData(response.items);
            console.log(videoData)
      
        } catch (error) {
            console.error(error,'error from context api data')
            
        }

        finally{
            setLoading(false)
        }

    }

    // created useEffect for pass params to fetchYoutubeData 
    console.log(videoData.items)
    

    useEffect ( () => {

        if(selectedCategory) {
            if(selectedCategory==='0') {
                fetchYoutubeData({
                    part:'snippet , contentDetails, statistics',
                    chart:"mostPopular",
                    regionCode : 'In',
                    maxResults:50,
                     chart:"mostPopular"
                    

                })

            }
            else {
                fetchYoutubeData({
                    part:'snippet,contentDetails,statistics',
                    regionCode:'In',
                    maxResults:30,
                    videoCategoryId: selectedCategory,
                    chart:"mostPopular"
                })
            }
        }

    },[selectedCategory]) 

    return (
        <Context.Provider
        value={{selectedCategory,
            setSelectedCategory,
            setMobileMenu,
            mobileMenu,
            videoData,
            loading,
            setLoading

        }}
        
        >
            {children}

        </Context.Provider>
    )

    
}

export const useAppContext = () => {
    return useContext(Context);
}