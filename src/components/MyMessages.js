import React, {useState, useEffect} from 'react'
import { getMessagesByUser } from '../services/messagesService'
import Message from './Message'
import { useGlobalState } from '../utils/stateContext'
import { Link } from 'react-router-dom'

const MyMessages =({history})=>{
    const {store} = useGlobalState()
    const {loggedInUser} = store
    const [myMessageList, setMyMessageList] = useState([]) 

    
    useEffect(()=>{
        //setMessageList(initialMessageList)
        //will run the reducer, and will send an object that is the action
        //console.log("effect")
        const user = sessionStorage.getItem("username")
        getMessagesByUser(user)
          .then((messages)=>{
            setMyMessageList(messages)
          })
          .catch(error => console.log(error))
      },[])
    
    return(
        <div>
            {loggedInUser?
            <>
            <h3>Messages</h3>
            {myMessageList.map((message, index)=>
                <Message key={index} message={message}/>
            )}
            </>
            : <>
                <p>You need to log in to see your messages</p>
                <Link to="/messages">Go back to the home page</Link>
            </>
            
        }
            
        </div>
    )
}

export default MyMessages