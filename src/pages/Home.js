import React, { useContext, useEffect, useState } from 'react'
import ContextProvider, { Context } from '../context/Context'
// import PdfToImages from '../components/PdfToImageConverter'

export default function Home() {
    // const [file, setFile] = useState()
    const {file, setFile, onSent} = useContext(Context)

    // useEffect(()=>{
    //   onSent()
    // }, [file, setFile])
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
        <span className='font-bold text-[15px]'>Upload PDF Document</span>
        <main className='w-full h-screen max-w-lg flex items-center justify-center'>
        <label for="uploadFile1"
      class="bg-white text-gray-500 font-semibold text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
      {file ? <div className="mt-4 flex items-center">
      <svg class="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
</svg>

          <span className="text-gray-500">{file?.name}</span>
        </div>
      :<svg xmlns="http://www.w3.org/2000/svg" class="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
        <path
          d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
          data-original="#000000" />
        <path
          d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
          data-original="#000000" />
      </svg>}
      Upload file

      <input type="file" id='uploadFile1' class="hidden" onChange={(e)=>{setFile(e.target.files[0])}} />
      <p class="text-xs font-medium text-gray-400 mt-2">Only PDF's are Allowed.</p>
    </label>
        </main>
        {/* <PdfToImages pdfFile={"https://www.kdkce.edu.in/pdf/ADSD_VII_Sem.pdf"}/> */}
    </div>
  )
}
