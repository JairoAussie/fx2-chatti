import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import LoginForm from './LoginForm'
import MessageForm from './MessageForm'
import Messages from './Messages'
import initialMessageList from '../data/message-list.json'
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState("")
  const [messageList, setMessageList] = useState([])

  function activateUser(name){
    setLoggedInUser(name)
  }

  function addMessage(text){
    const message = {
      text: text, 
      user: loggedInUser
    }
    setMessageList(
      (messageList) => [message, ...messageList]
    )
  }

  useEffect(()=>{
    setMessageList(initialMessageList)
  },[])

  return (
    <div >
      <h1>Chatti</h1>
      <Navigation loggedInUser={loggedInUser} activateUser={activateUser}/>
      { !loggedInUser ? <LoginForm activateUser={activateUser}/>
      : <MessageForm loggedInUser={loggedInUser} addMessage={addMessage}/>
      }
      

      <Messages messageList={messageList}/>
          
    </div>
  )
}

export default App
