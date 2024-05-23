import { createContext, useState } from "react";
import run from "../../config/orate";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recent, setRecent] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showRes, setShowRes] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resData, setResData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResData(prev => prev + nextWord);
        }, 50 * index)
    }

    const newThread = () => {
        setLoading(false);
        setShowRes(false);
    }

    const onSent = async (prompt) => {
        setResData("");
        setLoading(true);
        setShowRes(true);
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecent(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecent(input);
            response = await run(input);
        }

        let resArr = response.split(/(\*\*|```|`|""")/);
        let newRes = "";
        let isBold = false;
        let isCodeBlock = false;
        let isInlineCode = false;
        let isTripleQuote = false;

        for (let i = 0; i < resArr.length; i++) {
            if (resArr[i] === "**") {
                isBold = !isBold;
                newRes += isBold ? "<b>" : "</b>";
            } else if (resArr[i] === "```") {
                isCodeBlock = !isCodeBlock;
                newRes += isCodeBlock ? "<pre><code>" : "</code></pre>";
            } else if (resArr[i] === "`") {
                isInlineCode = !isInlineCode;
                newRes += isInlineCode ? "<code>" : "</code>";
            } else if (resArr[i] === `"""`) {
                isTripleQuote = !isTripleQuote;
                newRes += isTripleQuote ? "<blockquote>" : "</blockquote>";
            } else {
                newRes += resArr[i];
            }
        }

        newRes = newRes.split("*").join("</br>");
        let newResArr = newRes.split(" ");
        for (let i = 0; i < newResArr.length; i++) {
            const nextWord = newResArr[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");
    }


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecent,
        recent,
        showRes,
        loading, 
        resData,
        input,
        setInput,
        newThread
    }

    return  (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>    
    )
}

export default ContextProvider