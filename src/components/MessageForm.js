import React, { useEffect, useState } from 'react'
import { useGlobalState } from '../utils/stateContext'
import { createMessage, getMessageById, updateMessage } from '../services/messagesService'
import { useParams } from 'react-router-dom'

const MessageForm =({history})=>{
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    const {id} = useParams()

    const initialFormData = {
        m_text: ""
    }

    const [formData, setFormData] = useState(initialFormData)

    useEffect(()=>{
        getMessageById(id)
        .then(message => {
            setFormData({
                m_text: message.text
            })
        })
    }, [id])

    function handleFormData(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        //console.log(formData)
        if (id) {
            const data = {id: id, ...formData}
            updateMessage(data)
            .then(message => {
                dispatch({type: "updateMessage", data: message})
                history.push("/messages")
            })
        }else{
            createMessage(formData)
            .then((message) => {
                console.log("add message to the list")
                dispatch({
                    type: "addMessage",
                    data: message 
                  })
                
            })
            .catch(error => {console.log(error)})
        }
        return history.push("/messages")
    }


    return(
        <div>
            {loggedInUser?
                <form onSubmit={handleSubmit}>
                    <label htmlFor="text">What's on your mind {loggedInUser}?</label>
                    <input type="text" name="m_text" id="m_text" value={formData.m_text} onChange={handleFormData}/>
                    <input type="submit" value="Send" />
                </form>
            : 
                <p>you're not logged in</p>
            }
            
        </div>
    )
}

export default MessageForm