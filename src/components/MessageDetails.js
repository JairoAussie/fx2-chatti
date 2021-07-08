import React, { useEffect, useState } from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import { getMessageById } from '../services/messagesService'
import { useGlobalState } from '../utils/stateContext'
import { deleteMessage } from '../services/messagesService'


const MessageDetails =()=>{
    //console.log(match)
    //console.log(message)
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    const [message, setMessage] = useState(null)
    const {id} = useParams()
    const history = useHistory()

    useEffect(()=>{
        getMessageById(id)
        .then(message => setMessage(message)) 
        .catch(error => console.log(error))
    },[id])

    function removeMessage(e){
        e.preventDefault()
        deleteMessage(id)
        .then(message =>{
            console.log("Message deleted")
            dispatch({type: "deleteMessage", data: id})
            return history.push("/messages")
        })
        .catch(err=> console.log(err))

    }
    //if (!message) return null

    return(
        <div>
            {message? 
            <>
                <h4>{message.text}</h4>
                <p>{message.username} {message.posted}</p>
                { loggedInUser === message.username && <>
                    <button onClick={()=> history.push(`/messages/update/${id}`)}>Update message</button>
                    <button onClick={removeMessage}>Delete message</button>
                    </>
                }
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

export default MessageDetails