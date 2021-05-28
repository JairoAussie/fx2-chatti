import React from 'react'

const Message =({message})=>{
    return(
        <div>
            <h4>{message.text}</h4>
            <p>{message.user}</p>
        </div>
    )
}

export default Message