// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { TextareaForm } from './components/fragments/form'
import { Button } from './components/ui/button'

function App() {
  return (
    <div>
      <div className='flex justify-center pt-24'>
      <h1 className='text-3xl font-bold mb-12'>Text to Speech .</h1>
      </div>
      <div className='flex justify-center items-center '>
        <TextareaForm />
      </div>
    </div>
  );
}

export default App
