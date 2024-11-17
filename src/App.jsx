import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Header from './components/HeaderSection/Header'
import { Feed } from './components/FeedSection/Feed'
import SearchVideoResult from './components/SearchSection/SearchVideoResult'
import VideoList from './components/VideoSection/VideoList'
import { AppContext } from './useContextHook/useContextApi'
import { ThemeProvider } from './useContextHook/useTheme'
import ErrorBoundary from './utils/ErrorBoundary'
import VideoDetails from './components/VideoSection/VideoDetails'



function App() {
 
  return (
    <AppContext>
   <ThemeProvider>
    <BrowserRouter>   
    <div className='flex flex-col w-full   '>
     
     <ErrorBoundary>

    <Header/>
    </ErrorBoundary>
    <Routes>
      <Route path='/' element= {<Feed/>}/> 
      <Route path='/search/:searchQuery' element={<SearchVideoResult/>} />
      {/* <Route path='/video/:categoryId/:videoId' element={<VideoList/>} /> */}
      <Route path='video/:categoryId/:videoId' element={<VideoDetails/>}/>
    </Routes>
   </div>
   </BrowserRouter>
   </ThemeProvider>
   </AppContext>
  )
}

export default App
