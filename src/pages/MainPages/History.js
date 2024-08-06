import { Box, Button, Flex, Heading, useToast } from '@chakra-ui/react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context';
import { isMobile, isTablet } from 'react-device-detect';
import { HiMiniXMark, HiOutlineBars3CenterLeft } from 'react-icons/hi2';

export default function History() {
  const [rows, setRows] = useState(1);
  const toast = useToast()
  const [showSider, setShowSider] = useState(true)
  const {infoResults, file, resultData, userId, GetDetails} = useContext(Context)
  const [activeResult, setActiveResult] = useState(null);

  const LogOut = () => {
    localStorage.removeItem("session")
    localStorage.removeItem("userId")
    window.location.reload()
}

const getMarkup = (infoRes) => {
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
                })}

            </div>

            
        </nav>
    </div>
</aside>: null}
    
    <div className={`w-full ${showSider?"lg:ml-64":"ml-0"}`}>

        {/* Nav Section */}
        <Box shadow={"md"} className='px-4 sticky top-0 bg-white'>
        <Flex justifyContent={"space-between"} alignItems={"center"} className='py-3'>
            <Box className='flex items-center gap-5'>
                {showSider ? <button onClick={()=>setShowSider(!showSider)}><HiMiniXMark size={30} /></button> : <button onClick={()=>setShowSider(!showSider)}><HiOutlineBars3CenterLeft size={30} /></button>}
            <Heading color="#1A1D23">AISumma</Heading>
            </Box>

            <Button onClick={LogOut}>Log Out</Button>
        </Flex>
        </Box>
        <div>

        {infoResults.map((res, index) => (
            <div key={index}>
              {activeResult === res && (
                <div
                  className="p-3  rounded-lg"
                  dangerouslySetInnerHTML={getMarkup(res.summary)}
                />
              )}
            </div>
          ))}
        </div>
        </div>
    </div>
  )
}
