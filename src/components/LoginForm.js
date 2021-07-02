import React, { useState } from 'react'
import { useGlobalState } from '../utils/stateContext'
import { signIn } from '../services/authService'

const LoginForm =({history})=>{
    const {dispatch} = useGlobalState()
    const [error, setError] = useState("")

    //console.log(history)
    const initialFormData = {
        email: "",
        password: ""
    }

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
        signIn(formData)
        .then((user) => {
            //console.log("user", user)
            if (user.error){
                //console.log(user.error)
                setError(user.error)
            }else{
                setError("")
                sessionStorage.setItem("username", user.username)
                sessionStorage.setItem("token", user.jwt)
                dispatch({//action object
                    type: "setLoggedInUser",
                    data: user.username
                })
                dispatch({//action object
                    type: "setToken",
                    data: user.jwt
                })
                return history.push("/messages")
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleFormData}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleFormData}/>
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default LoginForm