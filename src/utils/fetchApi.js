import axios from "axios"

//We have taken this http get url from utube documentation -> reference
// By using this we can fetch data 
const BASE_URL = 'https://www.googleapis.com/youtube/v3'
// Here we have genrated youtube api key from console.cloud.google.com 
// to fetch live data from utube i.e. videos , video playlist , images , details ,etc
//utube clone 1
// const API_KEY = "AIzaSyCnT_fHBFi93mLzbusAGSy1CgtVfvxxG70"
//utube clone 3
const API_KEY = "AIzaSyBfif9xmNFAg-U3mK8IJSwfFENT9PdLRZc" 
//utube clone 1
// const API_KEY ="AIzaSyBHfv23YA2ZlxrThZv-1Br874Yvcq1USAA";

// created for fetching data with respect to its endpoint and the params which we will pass
export const fetchApiForYoutubeData = async (endpoints , parameters) => {

    try {
      const response= await  axios.get(`${BASE_URL}/${endpoints}`,  {
            params : {
                
            ...parameters,
            key:API_KEY
            }
        })

        //console.log(response)

        console.log("This is my respose " , response.data)
        return response.data;
        
    } catch (error) {
        console.error(error, 'error while fetching utube data')
    }
  

}

