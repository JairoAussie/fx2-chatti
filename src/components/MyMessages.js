import React, {useState, useEffect} from 'react'
import { getMessagesByUser } from '../services/messagesService'
import Message from './Message'
import { useGlobalState } from '../utils/stateContext'

const MyMessages =()=>{
    const {store} = useGlobalState()
    const {loggedInUser} = store
    const [myMessageList, setMyMessageList] = useState([]) 
    
    useEffect(()=>{
        //setMessageList(initialMessageList)
        //will run the reducer, and will send an object that is the action
        console.log("effect")
        getMessagesByUser(loggedInUser)
          .then((messages)=>{
            setMyMessageList(messages)
          })
          .catch(error => console.log(error))
      },[])

    return(
        <div>
            <h3>Messages</h3>
            {myMessageList.map((message, index)=>
                <Message key={index} message={message}/>
            )}
        </div>
    )
}

export default MyMessages