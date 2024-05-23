import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../context/cntxt';

const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const {onSent, prevPrompts, setRecent, newThread} = useContext(Context);
  const load = async(prompt) => {
    setRecent(prompt);
    await onSent(prompt);
  }
  const toggleMenu = () => {
    setExpand(!expand);
  }
  return (
    <div className='sidebar'>
      <div className="top">
        <img src= {assets.menu_icon} alt="Menu" className='menu_icon' onClick={toggleMenu}/>
        <div onClick={() => newThread()} className={`new-chat ${expand?'':'not_expanded'}`}>
          <img src={assets.plus_icon} alt="New Thread" className='plus_icon'/>
          {expand?<p>New Thread</p>:null}
        </div>
        {expand?
        <div className="recent">
          <p className="recent-title"><img src={assets.history_icon} alt="recents"></img>Recent</p>
          {prevPrompts.map((item, index) => {
              return(
              <div onClick={()=> load(item)}className="recents">
                <img src={assets.message_icon} alt="" className='recent_icon'/>
                <p>{item.slice(0,30)}</p>
              </div>
              )
          })}
        </div>
        :null}
      </div>
      <div className="bottom">
        <button className={`repo_link ${expand?'repo_expanded':'repo_not_expanded'}`} onClick={() => window.open('//github.com/AS-ciii/Orate-chatbot')}>
          <img src={assets.code_icon} alt="repo link"></img>{expand?<p>View source</p>:null}
        </button>
        {expand?<hr></hr>:null}
        {expand?
        <div className="socials">
          <button onClick={() => window.open('//www.linkedin.com/in/ajay-shenoy-p-095612171', '_blank')}>
          <i className='bx bxl-linkedin-square'></i>
          </button>
          <button onClick={() => window.open('//github.com/AS-ciii', '_blank')}>
          <i className='bx bxl-github'></i>
          </button>
          <button onClick={() => window.open('//www.instagram.com/ajay_sp18?igsh=MWwwZng0eWR1M3J6cA==', '_blank')}>
          <i className='bx bxl-instagram'></i>
          </button>
        </div>
        :null}
      </div>
    </div>
  )
}

export default Sidebar