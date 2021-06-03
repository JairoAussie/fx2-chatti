import React from 'react'
import {Link} from 'react-router-dom'

const NotFound=()=>{
    return(
        <div>
            <p>404 error</p>
            <p>This page does not exist</p>
            <Link to="messages">Go back to the home page</Link>
        </div>
    )
}

export default NotFound