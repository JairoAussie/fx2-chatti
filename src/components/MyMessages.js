import React, {useState, useEffect} from 'react'
import Message from './Message'
import { getMyMessages } from '../services/messagesService'

const MyMessages = ()=>{
    const [myList, setMyList] = useState([])

    useEffect(()=>{
        console.log("effect")
        getMyMessages()
          .then((messages)=>{ setMyList(messages)})
          .catch(error => console.log(error))
    },[])
    return(
        <div>
            <h3>My Messages</h3>
            {myList.map((message, index)=>
                <Message key={index} message={message}/>
            )}
        </div>
    )
}

export default MyMessages