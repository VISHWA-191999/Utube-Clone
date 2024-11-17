import React, { useEffect, useState } from 'react'


const SpinnerLoader = () => {

    const [currentProgress , setCurrentProgress] = useState(0);
    useEffect(() => {
        let spinnerLoader = setInterval(() => {
            // console.log(currentProgress)

            setCurrentProgress((prevProgress) => {
            // console.log(prevProgress)

                let newProgress = prevProgress + Math.random() * 40;
                // console.log(newProgress)

                if(newProgress > 100) newProgress = 100;

                if(newProgress === 100) clearInterval(spinnerLoader)

                    // console.log(newProgress)
                    
                    return newProgress;
                
            })
            
        },800)
        return () => clearInterval(spinnerLoader)
    },[])
  return (
    <div className='h-1 bg-red-500 transition-all duration-200 absolute z-40 top-0' 
    
    style={{width : `${currentProgress}%`}}>


    </div>
  )
}

export default SpinnerLoader