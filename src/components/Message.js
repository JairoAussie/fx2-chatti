import React from 'react'
import {Link} from 'react-router-dom'

const Message =({message})=>{
    //console.log(match)
    //console.log(message)
    return(
        <div>
            {message? 
            <>
                <Link to={`/messages/${message.id}`} ><h4>{message.text}</h4></Link>
                <p>{message.username} {message.posted}</p>
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