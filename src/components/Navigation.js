import React from 'react'

const Navigation =({loggedInUser, activateUser})=>{
    function logout(e){
        e.preventDefault()
        console.log("logout")
        activateUser("")
    }

    return(
        <div>
            <a href="/">Home</a>
            <a href="/">About</a>
            {loggedInUser ? 
                <>
                    {loggedInUser}
                    <a href="/" onClick={logout}>Logout</a>
                </> 
            :   <>
                    <a href="/">Login</a>
                    <a href="/">Sign Up</a>
                    Guest
                </>
            }
        </div>
    )
}

export default Navigation