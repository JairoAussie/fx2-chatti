import React from 'react'
import {Link} from 'react-router-dom'
import { deleteMessage } from '../services/messagesService'
import { useGlobalState } from '../utils/stateContext'

const Message =({message, history})=>{
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store

    function removeMessage(){
        deleteMessage(message.id)
        .then(()=>{
            dispatch({
                type: "deleteMessage",
                data: message.id 
            })
        })
        .catch(error => {console.log(error)})
    }

    return(
        <div>
            {message? 
            <>
                <div>
                    <Link to={`/messages/${message.id}`} ><h4>{message.text}</h4></Link>
                    <Link to={'/messages'}><h3 onClick={removeMessage}>X</h3></Link>
                    <p>{message.username} {message.posted}</p>
                </div>
                
            </>
            :
                <>
                    <p>Invalid id for a message</p>
                    <Link to="/messages">Go back to the home page</Link>
                </>
            }
        </div>
        
    )
}

export default Message