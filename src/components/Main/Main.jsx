import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../context/cntxt';

const Main = () => {
    const [name, setName] = useState("User");
    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    }

    const saveName = () => {
        const userName = document.getElementById("userName").value;
        setName(userName);
        togglePopup();
    }

    const {onSent, recent, showRes, loading, resData, setInput, input} = useContext(Context);

    return (
        <div className='container'>
            <div className="navigation">
                <p>Orate</p>
                <div className="popup" id="popup">
                    <img src={assets.user_icon} alt="user_img" onClick={togglePopup} />
                    {isPopupVisible && (
                    <div className="popup-content">
                        <img className="img2" src={assets.user_icon} alt="user_img" onClick={togglePopup} />
                        <p>{name}</p>
                        <hr/>
                        <p className='p2'>Username:</p>
                        <input type="text" id="userName" placeholder="Your Name" />
                        <button onClick={saveName}>Save</button>
                    </div>)}
                </div>
            </div>
            <div className="main-container">
                {!showRes?<>
                <div className="message-container">
                    <p className='p1'><span>Hello, {name}.</span></p>
                    <p>Welcome to Orate! I'm happy to help in any way I can<span>.</span></p>
                </div>
                <div className="examples">
                    <p>Example prompts</p>
                    <div className="box-container">
                        <div className="boxes">
                            <p>What is the capital of India?</p>
                            <img src={assets.bulb_icon} alt="prompts"></img>
                        </div>
                        <div className="boxes">
                            <p>Write HTML and CSS for a hotel website</p>
                            <img src={assets.bulb_icon} alt="prompts"></img>
                        </div>
                        <div className="boxes">
                            <p>Write a note on React.js.</p>
                            <img src={assets.bulb_icon} alt="prompts"></img>
                        </div>
                        <div className="boxes">
                            <p>What is (a+b)<sup>2</sup>?</p>
                            <img src={assets.bulb_icon} alt="prompts"></img>
                        </div>
                    </div>    
                </div>
            </>
            :<div className='res'>
                <div className='res-title'>
                    <img src={assets.user_icon} alt="user_img"></img>
                    <p>{recent}</p>
                </div>
                <div className="res-data">
                    <img src={assets.orate_logo} alt="logo"></img>
                    {loading?
                    <div className='load'>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>   
                    :<p dangerouslySetInnerHTML={{__html:resData}}></p>}
                </div>    
            </div>
            }
            </div>
            <div className="main-foot">
                <div className="search-field">
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter your prompt here.'/>
                    <img onClick ={() => onSent()} src={assets.send_icon} alt="send_button"></img>
                </div>
                <p>This chatbot fetches and delivers data using Google Gemini API. Data provided can sometimes be inaccurate, check remaining details at <a onClick={() => window.open('//gemini.google.com/app?hl=en-IN')}>gemini</a> website.</p>
            </div>
        </div>
    )
}

export default Main
