import React, { useEffect, useState } from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import About from './About'
import NotFound from './NotFound'
import Navigation from './Navigation'
import LoginForm from './LoginForm'
import MessageForm from './MessageForm'
import Messages from './Messages'
import Message from './Message'
import initialMessageList from '../data/message-list.json'
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState("")
  const [messageList, setMessageList] = useState([])

  function activateUser(name){
    setLoggedInUser(name)
  }

  function addMessage(text){
    const message = {
      id: getNextId(),
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

  function getMessage(id){
    return messageList.find(m=> m.id === parseInt(id))
  }

  function getNextId(){
    const ids = messageList.map(m => m.id) //[3, 2, 1]
    return ids.sort()[ids.length - 1] + 1 // -> [1, 2, 3] -> 3 -> 4
  }

  return (
    <div >
      <h1>Chatti</h1>
      
      <BrowserRouter>
        <Navigation loggedInUser={loggedInUser} activateUser={activateUser}/>
        <Switch>
          <Route exact path="/">
            <Redirect to="messages" />
          </Route>
          <Route exact path="/messages" 
            render={()=> <Messages messageList={messageList}/> } 
          />
          <Route exact path="/messages/:id" 
            render={(props)=> <Message {...props} 
              message={getMessage(props.match.params.id)}/>}
          />
          <Route exact path="/about" component={About}/>
          <Route exact path="/login" 
            render={(props)=> <LoginForm {...props} activateUser={activateUser} />}
          />
          <Route exact path="/newmessage" 
            render={(props)=> <MessageForm {...props} loggedInUser={loggedInUser} addMessage={addMessage}/>}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
          
    </div>
  )
}

export default App
