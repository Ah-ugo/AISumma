import { Box, Button, Center, Flex, Heading, Skeleton, SkeletonText, Text, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../context/Context';
import { isMobile, isMobileOnly, isTablet } from 'react-device-detect';
import { BiArrowBack, BiDownload, BiSend } from 'react-icons/bi';
import { HiMiniXMark, HiOutlineBars3CenterLeft } from "react-icons/hi2";
import axios from 'axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useLocation } from 'react-router-dom';


export default function MainPage() {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input, file, pdfTxt, setPdfTxt, setFile, userId, setUserId} = useContext(Context);
    const resultRef = useRef(null);
    const [rows, setRows] = useState(1);
    const toast = useToast()
    const [showSider, setShowSider] = useState(true)
    const [infoResults, setInfoResults] = useState([])
    const location = useLocation()
    const [activeResult, setActiveResult] = useState(null);
    // const {file, pdfTxt, setPdfTxt} = useContext(ContextProvider)

    const widthStyle = showSider ? { width: 'calc(100% - 16rem)' } : { width: '100%' };

    
    const SummarizeFile = () => {
        if (!file){
            toast({
                title: 'Add a PDF File',
                // description: "We've created your account for you.",
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        } else {
        onSent()
        // if(resultData){
            // UploadDetails()
        // }
        }
    } 

    const handleFileClick = (url) => {
        window.open(url, '_blank');
      };


      const GetDetails = async() => {
        const userId = localStorage.getItem("userId")
        if(!userId) return;
          const headers = {
              "accept": "application/json",
        "X-Parse-Application-Id": "Ejhu0gpyPCKAo7Z4AA1yTZm0utJbCqPtr3dRPwt3",
        "X-Parse-REST-API-Key": "4zjh2OUB1MLRUxoADsfVB0BHPWFvTbXfCh6roC68",
        "Content-Type": "application/json"
          }
         await axios.get(`https://parseapi.back4app.com/classes/contents?where=%7B%20%20%20%22user%22%3A%20%7B%20%20%20%20%20%22__type%22%3A%20%22Pointer%22%2C%20%20%20%20%20%22className%22%3A%20%22_User%22%2C%20%20%20%20%20%22objectId%22%3A%20%22${userId}%22%20%20%20%7D%20%7D`, {headers}).then(res=>{
          console.log(res.data?.results)
          setInfoResults(res.data?.results)
         }).catch(err=>{console.log(err)})
      }


    const LogOut = () => {
        localStorage.removeItem("session")
        localStorage.removeItem("userId")
        window.location.reload()
    }

    const getMarkup = () => {
        const rawMarkup = marked(resultData, { sanitize: false });
        return { __html: DOMPurify.sanitize(rawMarkup) };
      };
      const getMarkup2 = (infoRes) => {
        const rawMarkup = marked(infoRes, { sanitize: false });
        return { __html: DOMPurify.sanitize(rawMarkup) };
      };
    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth <= 600) {
                setRows(2);
            } else {
                setRows(1);
            }
        };
        // localStorage.getItem("userId")

        // GetDetails()

        updateRows();
        if (isMobile){
            setShowSider(false)
        }
        window.addEventListener('resize', updateRows);
        return () => window.removeEventListener('resize', updateRows);

    }, []);

    useEffect(()=>{
        // if (location.pathname === "/") {
            GetDetails();
        //   }
    },[file, resultData, userId])

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
        if (resultData){
            GetDetails()
        }
    }, [resultData]);
    const handleResultClick = (result) => {
        setActiveResult(result === activeResult ? null : result);
        console.log(activeResult?.summary)
      };
  return (
    <div className="flex flex-row">
        {showSider ?<aside class="flex flex-col w-64 h-screen px-5 pb-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l fixed top-0 bottom-0 left-0 z-10">
    <a href="#" className='flex w-full justify-between'>
        <div></div>
        {isMobile || isTablet ? <button onClick={()=>setShowSider(!showSider)}><HiMiniXMark size={30} /></button>:null}
        
    </a>

    <div class="flex flex-col justify-between flex-1 mt-6">
        <nav class="-mx-3 space-y-6 ">
            <div class="space-y-3 ">
                <label class="px-3 text-xs text-gray-500 uppercase">history</label>

                {infoResults.map(res=>{
                    return (
                    <a onClick={()=>handleResultClick(res)} class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" href="#">
                    

                    <span class="mx-2 text-sm font-medium">{res.pdf_txt?.slice(0,30)}</span>
                </a>
                    )
                }).reverse()}

            </div>

            
        </nav>
    </div>
</aside>: null}
    
    <div className={`w-full ${showSider?"lg:ml-64":"ml-0"}`}>

        {/* Nav Section */}
        <Box shadow={"md"} className='px-4 sticky top-0 bg-white z-50'>
        <Flex justifyContent={"space-between"} alignItems={"center"} className='py-3'>
            <Box className='flex items-center gap-5'>
                {showSider ? <button onClick={()=>setShowSider(!showSider)}><HiMiniXMark size={30} /></button> : <button onClick={()=>setShowSider(!showSider)}><HiOutlineBars3CenterLeft size={30} /></button>}
            <Heading color="#1A1D23">AISumma</Heading>
            </Box>

            <Button onClick={LogOut}>Log Out</Button>
        </Flex>
        </Box>
       {activeResult ? <div>

{infoResults.map((res, index) => (
    <div key={index}>
      {activeResult === res && (
        <div>
            <Box className='my-4 mx-2'>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <button onClick={()=>setActiveResult(null)}><BiArrowBack size={25}/></button>
                    <Button onClick={()=>handleFileClick(res?.pdf_file.url)} className='flex justify-between items-center gap-2'><BiDownload/> Download PDF</Button>
                </Flex>
            </Box>
        <div
          className="p-3  rounded-lg"
          dangerouslySetInnerHTML={getMarkup2(res.summary)}
        />
        </div>
      )}
    </div>
  ))}
</div> : <div>
        {/* Upload PDF / Main Content */}
{!showResult?<main className={'py-5 px-4 gap-5 flex flex-col lg:flex-row items-center justify-between'}>
        <div className='w-full'>
        {/* <span className='font-bold text-[15px]'>Upload PDF Document</span> */}
        <main className='w-full flex items-center justify-center'>
        <label for="uploadFile1"
      class="bg-white text-gray-500 font-semibold text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
      {file ? <div className="mt-4 flex items-center">
      <svg class="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
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
    <Box>
        <Flex gap={5}>
            <Button onClick={() => SummarizeFile()}>Summarize</Button>
            <Button>Ask Questions</Button>
        </Flex>
    </Box>
    </main>:<Box>
        {loading?<Box className='px-4 py-3 flex flex-col'>
            <SkeletonText noOfLines={4} spacing='4' skeletonHeight='2'/>
        </Box>:<Box className='px-4 py-3 pb-56 lg:pb-32'>
            <Center>
            {/* <Heading>Summary</Heading> */}
            </Center>
            <div dangerouslySetInnerHTML={getMarkup()} className='leading-relaxed text-lg'/>
            </Box>}
        </Box>}

        {/* Footer */}
        {showResult?<div style={widthStyle} className="fixed custom-width box-border bottom-0 w-full max-w-full px-2 bg-white pt-5 rounded-t-md">
                    <div style={{width: "100%"}} className="search-box mb-10 w-full">
                        <textarea rows={rows} onChange={(e) => setInput(e.target.value)}
                                  onKeyUp={(e) => {
                                      if (e.key === 'Enter') {
                                        SummarizeFile();
                                      }
                                  }}
                                  value={input}
                                  type="text"
                                  className='w-full'
                                  placeholder="Enter a prompt here"
                        />
                        <div className="icon-container">
                            {/* <button><img src={assets.gallery_icon} alt=""/></button> */}
                            {/* <button><img src={assets.mic_icon} alt=""/></button> */}
                            <button type="submit" onClick={() => SummarizeFile()}><BiSend/></button>
                        </div>
                    </div>
                    {/* <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses.
                        <a href="#">Your privacy and Gemini Apps</a>
                    </p> */}
                </div>:null}
            </div>}
    </div>
    </div>
  )
}
