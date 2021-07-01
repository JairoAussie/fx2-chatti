import React from 'react'
import {Link} from 'react-router-dom'
import { useGlobalState } from '../utils/stateContext'

const Navigation =()=>{

    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store

    function logout(e){
        e.preventDefault()
        console.log("logout")
        //activateUser("")
        sessionStorage.clear()
        dispatch({//action object
            type: "setLoggedInUser",
            data: null
        })
        dispatch({//action object
            type: "setToken",
            data: null
        })

    }

    return(
        <div>
            <Link to="/messages">Home</Link>
            <Link to="/about">About</Link>
            {loggedInUser ? 
                <>
                    {loggedInUser}
                    <Link to="/newmessage">Post a new message</Link>
                    <Link to="/messages" onClick={logout}>Logout</Link>
                </> 
            :   <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign up</Link>
                    Guest
                </>
            }
        </div>
    )
}

export default Navigation