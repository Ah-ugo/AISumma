import {createContext, useEffect, useState} from "react";
import runChat from "../config/gemini";
import pdfToText from "react-pdftotext";
import axios from "axios";
import Parse from 'parse/dist/parse.min.js';

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'Ejhu0gpyPCKAo7Z4AA1yTZm0utJbCqPtr3dRPwt3';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'Mq4Oqlbq77lSMc06Yum6bx3cU7swmChC1ll26XUd';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [file, setFile] = useState()
    const [pdfTxt, setPdfTxt] = useState("")
    const [userId, setUserId] = useState("VDGZ5eRaP7")
    const [infoResults, setInfoResults] = useState([])

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }


    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    
    const UploadDetails = async (summary, pdfTxt) => {
        // if (file){
        try {
            console.log(file, "file===")
          // Assuming 'file' is already a File instance or base64 data
          const parseFile = new Parse.File(file?.name, file);
          const pdfFile = await parseFile.save({ sessionToken: "r:860fb10d27c6a8cbf25ef2bdb4cd59ea" });
      
          // If you just have the userId string, create a pointer like this
          let userPointer = new Parse.Object("_User");
          userPointer.id = userId;
      
          // Create a Content object
          let Content = new Parse.Object("contents");
      console.log(userPointer, " ",pdfFile, " ", summary, " ", pdfTxt)
          // Set the fields using the .set() methods
          Content.set("user", userPointer);    // Pass the pointer, not the ID
          Content.set("pdf_file", pdfFile);    // Pass the saved file object
          Content.set("summary", summary);
          Content.set("pdf_txt", pdfTxt);
          await Content.save()
      .then(res => console.log(res, "res==="))
      .catch(err => { console.log(err, "err===") });
  } catch (err) {
    console.log(err)
  }
}
// }

const GetDetails = async() => {
    const headers = {
        "accept": "application/json",
  "X-Parse-Application-Id": "Ejhu0gpyPCKAo7Z4AA1yTZm0utJbCqPtr3dRPwt3",
  "X-Parse-REST-API-Key": "4zjh2OUB1MLRUxoADsfVB0BHPWFvTbXfCh6roC68",
  "Content-Type": "application/json"
    }
   await axios.get("https://parseapi.back4app.com/classes/contents", {headers}).then(res=>{
    console.log(res.data?.results)
    setInfoResults(res.data?.results)
   }).catch(err=>{console.log(err)})
}
    
    
    
    const onSent = async (prompt) => {
        try {
          const text = await pdfToText(file);
          console.log(text, "pdf text");
          localStorage.setItem("text", text);
          setPdfTxt(text);
      
          setResultData("");
          setLoading(true);
          setShowResult(true);
      
          let response;
          if(!prompt){
            prompt = "Summarize the main ideas and key points of the following text, focusing on the most important information and concepts, and present it in a clear and concise manner: "
            // setInput(prompt)
          }
          if (prompt && text) {
            response = await runChat(prompt, text);
            setRecentPrompt(prompt + " " + text);
            setResultData(response);
            console.log(prompt + " " + text, "Hula baloo");
            if (response) {
                UploadDetails(response, text)
            } 
          } else if (prompt) {
            // Handle case where pdfTxt is not available but prompt exists
            console.error("pdfTxt is not available");
          } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input, text); // Assuming text is available here
            console.log(response, "resp===")
          }
      
          let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>"
            }

        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");
        } catch (error) {
          console.error("Error:", error);
          // Handle error gracefully, e.g., show error message to user
        } finally {
          setLoading(false);
        }
      };
      useEffect(()=>{
        GetDetails()
      },[])

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        file,
        setFile,
        pdfTxt,
        setPdfTxt,
        userId,
        setUserId,
        infoResults,
        setInfoResults
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;