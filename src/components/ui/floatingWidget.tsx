import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"

import { MixerHorizontalIcon, PaperPlaneIcon } from "@radix-ui/react-icons"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Toggle } from "@/components/ui/toggle"
import widgetIcon from '/icons/creation.svg'
import micIcon from '/icons/icon-mic.svg'

import React, { useState } from "react";

// create a component named floatingWidget

export default function FloatingWidget() {


      // State to keep track of the input value
      const [inputValue, setInputValue] = useState('');

      // Function to handle input changes
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
      };

  const sendRequest = async () => {


    // Create a FormData object
    const formData = new FormData();
    formData.append('activities', 'eLake, BetaSeeker');
    formData.append('defaultStartingTime', '09:00');
    formData.append('defaultEndingTime', '18:00');
    formData.append('breakDefaultStartTime', '12:00');
    formData.append('breakDefaultEndTime', '13:00');
    formData.append('text', inputValue);
  
    try {
      // Send a POST request with the form data
      const response = await fetch('http://localhost:8080/summarize', {
        method: 'POST',
        body: formData, // the FormData object will set the Content-Type to multipart/form-data
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Handle the response from the server
      const data = await response.json();
      console.log(data);
      // Do something with the response data
  
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleButtonClick = async () => {
    await sendRequest(); // Wait for the POST request to complete
    setToDefault();      // Then do the next thing
  };

  const [footerState, setFooterState] = useState("default");

  // const handleMicClick = () => {
  //   setFooterState("mic");
  // };

  const handleSendClick = () => {
    // Perform logic based on the return, and update the footer state accordingly
    setFooterState("confirmation");
  };

  const setToDefault = () => {
    // Perform logic based on the return, and update the footer state accordingly
    setFooterState("default");
  };
  




const [isRecording, setIsRecording] = useState(false);
const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

const handleMicClick = () => {
  if (isRecording && mediaRecorder) {
    // Stop recording
    mediaRecorder.stop();
    setIsRecording(false);
  } else {
    // Start recording
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (e) => {
          setAudioBlob(e.data);
        };

        recorder.start();
        setIsRecording(true);
      })
      .catch(error => {
        console.error('Error accessing the microphone', error);
      });
  }
}

  const handleSendAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append('activities', 'eLake, BetaSeeker');
      formData.append('defaultStartingTime', '09:00');
      formData.append('defaultEndingTime', '18:00');
      formData.append('breakDefaultStartTime', '12:00');
      formData.append('breakDefaultEndTime', '13:00');
      formData.append('audio', audioBlob, 'recording.mp3');
  
      try {
        const response = await fetch(`http://localhost:8080/audioSummary`, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log(data);
        // Handle the response here
  
      } catch (error) {
        console.error('There was an error!', error);
      }
    }
  }

  return (
    <>
      <Popover modal={false}>
        <div className="absolute right-0 bottom-0 mb-8 mr-8">
          <PopoverTrigger>
            <Toggle aria-label="Toggle assistant" className='data-[state=on]:bg-primary data-[state=on]:hover:bg-primary/90 hover:bg-primary/90 h-16 w-16 rounded-full bg-primary'>
              <img src={widgetIcon} alt="Widget icon" />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent onInteractOutside={(event) => { event.preventDefault(); }} className="p-0 flex flex-col box-border w-[425px] h-[80vh] backdrop-blur bg-popover/70" side="top" sideOffset={16} align="end" sticky="always">
            <div className="px-2 pt-1 flex place-content-end">
              <Button variant="ghost" className="rounded-full h-[44px] w-[44px] p-0">
                <MixerHorizontalIcon className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="px-6 h-full flex-grow scroll-smooth ">
              <div className="pb-5">
                <p>
                  Labore adipisicing cillum ad est dolore laborum exercitation consequat qui non reprehenderit eiusmod aliqua duis. Tempor laborum in elit ipsum dolor quis magna esse labore cillum. Labore amet magna irure amet. Cillum ut amet magna et laboris Lorem nulla ex enim non ullamco laboris sunt ipsum. Ea minim esse ullamco. Cupidatat consequat exercitation id.
                  Aliqua amet cupidatat magna. Occaecat ullamco et cupidatat adipisicing eiusmod adipisicing ex magna excepteur sit. Ullamco Lorem dolor sint ea. Pariatur deserunt dolore proident. Velit excepteur do excepteur quis officia. Deserunt non quis pariatur occaecat ex minim labore ex. Fugiat eu exercitation ullamco nisi ex veniam laboris duis incididunt nulla eiusmod in sit nisi ullamco.
                  Cillum qui consequat elit duis proident et in laborum in adipisicing. Minim eu labore occaecat labore Lorem aliquip pariatur voluptate. Proident aute voluptate commodo Lorem officia velit proident minim excepteur duis dolore officia non fugiat. Exercitation culpa ad nisi minim ex. Ea labore qui ea ipsum irure amet ut excepteur mollit sit velit ut qui. Sint cillum aliqua consectetur excepteur nulla aliquip cupidatat aliquip enim.
                  Eu officia ullamco cupidatat laboris nisi dolor elit magna excepteur et enim. Magna minim qui aute. Anim esse elit qui qui commodo irure minim velit sint reprehenderit. Laboris do excepteur Lorem mollit officia minim sit excepteur pariatur commodo enim.
                  Occaecat Lorem do incididunt tempor non mollit irure esse. Fugiat ipsum non irure. Mollit cupidatat dolor fugiat dolore labore irure velit nostrud nostrud aute consequat enim ea cillum. Qui commodo minim dolore nisi occaecat et ad ex aliqua ut voluptate.
                </p>
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
            <Separator />

            {footerState === "default" && (
              <div className="px-4 h-24 flex items-center space-x-2">
                {/* Render default footer elements */}
              <Button
                className="shrink-0 rounded-full h-[44px] w-[44px] p-0"
                onClick={handleMicClick}
              >
              <img src={micIcon} alt="Mic icon" />
              </Button>
              <Button
                className="shrink-0 rounded-full h-[44px] w-[44px] p-0"
                onClick={handleSendAudio}
                disabled={!audioBlob}
            >
              Send Audio
            </Button>
                <Input
                  className="h-[44px] rounded-full outline-0"
                  type="text"
                  placeholder="Say or type something..."
                  onChange={handleInputChange} // Set up the onChange handler
                  value={inputValue} // Control the input with the inputValue state
                />
                <Button
                  className="shrink-0 rounded-full h-[44px] w-[44px] p-0"
                  onClick={handleSendClick} // Set up the onClick handler
                >
                  Send
                </Button>
              </div>
            )}

            {footerState === "mic" && (
              <div className="px-4 h-24  flex items-center justify-center">
                {/* Render mic button */}
                <Button
                  className="shrink-0 rounded-full h-[44px] w-[44px] p-0"
                  onClick={setToDefault}
                >
                  <img src={micIcon} alt="Mic icon" />
                </Button>
                {/* Perform animations here */}
              </div>
            )}

            {footerState === "confirmation" && (
              <div className="px-4 h-24 flex items-center justify-center">
                <Button
                  className="w-full h-[44px]"
                  onClick={handleButtonClick}
                >
                  Submit
                </Button>
              </div>
            )}

          </PopoverContent>
        </div>
      </Popover>
    </>
  ) 
}