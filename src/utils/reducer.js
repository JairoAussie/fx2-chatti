//purpose -> state management
//more flexible than useState
//kind of Redux
//more powerful than useState but also more complicated

//reducer function
//will take the current state
//will receive an action that will modify the state
//it will return a new copy of the state with the changes that action described
//action is an object with two keys -> type and data
export default function reducer(state, action){
    switch(action.type){
        //depending on the type we'll update the state in different ways
        case "setMessageList":{

            //populate messageList with initialMessageList and return that copy of the state
            return {
                ...state,
                messageList: action.data
            }
        }
        case "addMessage":{
            //add a new message to the list
            return {
                ...state,
                messageList: [action.data, ...state.messageList]
            }
        }

        case "setLoggedInUser":{
            //update loggedinUser's value
            return{
                ...state,
                loggedInUser: action.data
            }
        }
        default: return state
    }

}