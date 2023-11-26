import './App.css'


import WeekdayCards from './components/ui/weekday-card'

import FloatingWidget from './components/ui/floatingWidget'

import papermintLogo from '/papermint.svg'


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

//Create a variable to store the username and another to get the initials based on the username
let username = "Alphonse Elric"
let initials = username
  .split(" ")
  .map((word) => word[0])
  .join("")

function App() {
  return (
    <>
      <header className='border-b'>
        <div className='mx-6 flex justify-between items-center h-16'>
          <div>
            <img src={papermintLogo} className="h-6" alt="Papermint logo" />
          </div>
          <div className='flex space-x-2 items-center'>
            <Avatar className='w-8 h-8'>
              <AvatarImage src="https://github.com/shadcn.png" alt={username}/>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <p className='text-base text-muted-foreground'>{username}</p>
          </div>
        </div>
      </header>
      <main className='h-full'>
            <WeekdayCards />
      </main>
      <FloatingWidget />
    </>
  );
}

export default App
