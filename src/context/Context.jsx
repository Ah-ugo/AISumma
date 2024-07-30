import {createContext, useState} from "react";
import runChat from "../config/gemini";
import pdfToText from "react-pdftotext";

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

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }


    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    // const onSent = async (prompt) => {
    //     var pdfTxt1;
    //     pdfToText(file)
    //     .then((text) => {
    //         console.log(text, "pdf text"); 
    //         setPdfTxt(text)
    //         pdfTxt1 = text
    //     })
    //     .catch((error) => console.error("Failed to extract text from pdf"));

    //     setResultData("");
    //     setLoading(true);
    //     setShowResult(true);
    //     let response;
    //     if (prompt && pdfTxt1 !== undefined) {
    //         response = await runChat(prompt, pdfTxt1);
    //         setRecentPrompt(prompt + " " + pdfTxt1);
    //         console.log(prompt + " " + pdfTxt1, "Hula baloo")
    //     } else {
    //         setPrevPrompts(prev => [...prev, input]);
    //         setRecentPrompt(input);
    //         response = await runChat(input, pdfTxt1);
    //     }

    //     let responseArray = response.split("**");
    //     let newResponse = "";
    //     for (let i = 0; i < responseArray.length; i++) {
    //         if (i === 0 || i % 2 !== 1) {
    //             newResponse += responseArray[i];
    //         } else {
    //             newResponse += "<b>" + responseArray[i] + "</b>"
    //         }

    //     }
    //     let newResponse2 = newResponse.split("*").join("</br>");
    //     let newResponseArray = newResponse2.split(" ");
    //     for (let i = 0; i < newResponseArray.length; i++) {
    //         const nextWord = newResponseArray[i];
    //         delayPara(i, nextWord + " ");
    //     }
    //     setLoading(false);
    //     setInput("");
    // }

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
          if (prompt && text) {
            response = await runChat(prompt, text);
            setRecentPrompt(prompt + " " + text);
            setResultData(response);
            console.log(prompt + " " + text, "Hula baloo");
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
        setPdfTxt

    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;