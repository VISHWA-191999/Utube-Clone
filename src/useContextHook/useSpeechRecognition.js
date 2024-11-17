import React, { useEffect } from 'react'
import SpeechRecognition ,{useSpeechRecognition} from 'react-speech-recognition'


const useSpeechRecognitions = (setSearchQuery) => {

    const {transcript,listening,resetTranscript,browserSupportSpeechRecognition}=useSpeechRecognition();
    useEffect(()=> {
        if(transcript){
            setSearchQuery(transcript)
        }
    },[transcript,setSearchQuery])

    const startListening = ()=> SpeechRecognition.startListening({continuous:true})
    const stopListening =() => {
        SpeechRecognition.stopListening();
        resetTranscript();
    }
  return {
    transcript,listening,startListening,stopListening,browserSupportSpeechRecognition
  }
}

export default useSpeechRecognitions;