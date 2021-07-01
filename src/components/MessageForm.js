import React, { useState } from 'react'
import { useGlobalState } from '../utils/stateContext'
import { createMessage } from '../services/messagesService'

const MessageForm =({history})=>{
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store

    const initialFormData = {
        m_text: ""
    }

    const [formData, setFormData] = useState(initialFormData)

    function handleFormData(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(formData)
        createMessage(formData)
            .then((message) => {
                console.log("add message to the list")
                dispatch({
                    type: "addMessage",
                    data: message 
                  })
                
            })
            .catch(error => {
                console.log(error)})
        //addMessage(formData.text)
        //clean the form after submitting
        // setFormData({
        //     ...formData,
        //     m_text: ""
        // })
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