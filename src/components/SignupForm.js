import React, { useState } from 'react'
import { useGlobalState } from '../utils/stateContext'
import { signUp } from '../services/authService'

const SignupForm =({history})=>{
    const {dispatch} = useGlobalState()

    console.log(history)
    const initialFormData = {
        username: "",
        email: "",
        password: "", 
        password_confirmation: ""
    }
    const [error, setError] = useState("")
    const [formData, setFormData] = useState(initialFormData)

    function handleFormData(e){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        //console.log("You clicked login: ", formData.email)
        //console.log(formData.password)
        //activateUser(formData.email)
        signUp(formData)
        .then(({username, jwt}) => {
            sessionStorage.setItem("username", username)
            sessionStorage.setItem("token", jwt)
            dispatch({//action object
                type: "setLoggedInUser",
                data: username
            })
            dispatch({//action object
                type: "setToken",
                data: jwt
            })
            return history.push("/messages")
        })
        .catch(err => {
            console.log(err)
            setError(err.message)
            //return history.push("/signup")
        })
        

    }

    return(
        <div>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="text">Username:</label>
                <input type="text" name="username" id="username" value={formData.username} onChange={handleFormData}/>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleFormData}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleFormData}/>
                <label htmlFor="password">Confirm Password: </label>
                <input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleFormData}/>
                <input type="submit" value="Sign up" />
            </form>
        </div>
    )
}

export default SignupForm