import React, { useState } from "react";

// import { format } from "date-fns"

//COMPONENTS

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"

// import { Calendar } from "@/components/ui/calendar"

import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Toggle } from "@/components/ui/toggle"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import { Toaster } from "@/components/ui/toaster"

//ICONS

import widgetIcon from '/icons/creation.svg'
import micIcon from '/icons/icon-mic.svg'
import { MixerHorizontalIcon, PaperPlaneIcon, CalendarIcon, BackpackIcon, ClockIcon } from "@radix-ui/react-icons"

// UTILS

// import { cn } from "@/lib/utils"


type Activity = {
  activity: string;
  date: string;
  description: string;
  endingTime: string;
  startingTime: string;
};

type Data = {
  default: {
    activities: string[];
    defaultStartingTime: string;
    defaultEndingTime: string;
    breakDefaultStartTime: string;
    breakDefaultEndTime: string;
  };
  prompt: {
    processed: string;
    processing: string;
  };
  activities: Activity[];
};

const data: Data = {
  default: {
    activities: ["eLake", "BetaSeeker"],
    defaultStartingTime: "09:00",
    defaultEndingTime: "18:00",
    breakDefaultStartTime: "12:00",
    breakDefaultEndTime: "13:00",
  },
  prompt: {
    processed: "Yesterday I worked on the design in the morning and ",
    processing: "prepared for the user testing in the afternoon.",
  },
  activities: [
    // {
    //   activity: "eLake",
    //   date: "2023/26/11",
    //   description: "Worked on eLake project",
    //   endingTime: "12:00",
    //   startingTime: "09:00",
    // },
    // {
    //   activity: "BetaSeeker",
    //   date: "2023/26/11",
    //   description: "Worked on eLake project",
    //   endingTime: "16:00",
    //   startingTime: "13:00",
    // },
    // {
    //   activity: "",
    //   date: "2023/26/11",
    //   description: "Worked on eLake project",
    //   endingTime: "16:00",
    //   startingTime: "13:00",
    // },
  ],
};


const sendRequest = async (inputValue : string) => {


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

export default function FloatingWidget() {

  // const [date, setDate] = React.useState<Date>()

  const [footerState, setFooterState] = useState("default");

  // State to keep track of the input value
  const [inputValue, setInputValue] = useState('');

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    await sendRequest(inputValue); // Wait for the POST request to complete
    setToDefault();      // Then do the next thing
  };

  const handleSendClick = () => {
    // Perform logic based on the return, and update the footer state accordingly

    //
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
          <PopoverContent onInteractOutside={(event) => { event.preventDefault(); }} className="p-0 flex flex-col box-border w-[425px] h-[80vh] backdrop-blur bg-popover/30" side="top" sideOffset={16} align="end" sticky="always">
            <div className="px-2 pt-1 flex place-content-end">
              <Button variant="ghost" className="rounded-full h-[44px] w-[44px] p-0">
                <MixerHorizontalIcon className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="px-5 h-full flex-grow scroll-smooth ">

              {/* Activity Card */}
              <div className="pb-5">
                <Card className="shadow-none backdrop-sm bg-card/30">
                  <CardHeader className="p-4">
                    <p>
                      {inputValue}
                      {/* <span className="inline text-muted-foreground">{data.prompt.processing}</span> */}
                    </p>
                  </CardHeader>

                  {/* Map the activities */}

                  {data.activities.map((activities, index) => (
                    <CardContent key={index} className="px-4 pb-4 flex flex-col space-y-2">
                      {/* Activity Selector */}
                      <Select defaultValue={activities.activity}>
                        <div className="w-full flex items-center space-x-2">
                          <BackpackIcon className="h-4 w-4" />
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an activity" />
                          </SelectTrigger>

                          <SelectContent>
                            {data.default.activities.map((defaultActivity) => (
                              <SelectItem key={defaultActivity} value={defaultActivity}>
                                {defaultActivity}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </div>
                      </Select>


                      {/* Activity DatePicker  */}
                      {/* <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover> */}

                      {/* Activity DatePicker  */}
                      <div className="w-full flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4" />
                        <Input
                          className="w-full"
                          placeholder="Starting time"
                          defaultValue={activities.date}
                        />
                      </div>

                      {/* Starting and Ending time input group */}
                      <div className="flex space-x-2">
                        <div className="w-full flex items-center space-x-2">
                          <ClockIcon className="h-4 w-4" />
                          <Input
                            placeholder="Starting time"
                            defaultValue={activities.startingTime}
                          />
                        </div>
                        <div className="w-full flex items-center space-x-2">
                          <ClockIcon className="h-4 w-4" />
                          <Input
                            className="w-full"
                            placeholder="Ending time"
                            defaultValue={activities.endingTime}
                          />
                        </div>
                      </div>

                      {/* Textarea for the activity description */}
                      <div className="grid w-full space-y-1">
                        <Label htmlFor="message">Description</Label>
                        <Textarea defaultValue={activities.description} placeholder="Describe the activity" id="message" />
                      </div>

                      {data.activities.length > 1 && index < data.activities.length - 1 ? (
                        <div className="pt-2">
                          <Separator />
                        </div>
                      ) : null}

                    </CardContent>
                  ))}
                </Card>
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
                  onChange={handleInputChange}
                  value={inputValue}
                  onSubmit={() => sendRequest(inputValue)} // Call the sendRequest function with the inputValue
                />
                <Button
                  className="shrink-0 rounded-full h-[44px] w-[44px] p-0"
                  onClick={handleSendClick} // Set up the onClick handler
                >
                  <PaperPlaneIcon className="h-4 w-4" />
                </Button>
              </div>
            )}

            {footerState === "mic" && (
              <div className="px-4 h-24  flex items-center justify-center">
                {/* Render mic button */}
                <Button
                  className="shrink-0 rounded-full h-[44px] w-[44px] p-0"
                  onClick={handleButtonClick}
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
      </Popover >
    </>
  )
}