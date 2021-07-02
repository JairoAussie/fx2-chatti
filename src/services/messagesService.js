import chattiAPI from "../config/api"

export async function getMessages(){
    //console.log("getMessages")
    const response = await chattiAPI.get("/api/messages")
    //console.log(response)
    return response.data
}

export async function getMessagesByUser(username){
    //console.log("getMessages")
    const response = await chattiAPI.get(`/api/messages/?username=${username}`)
    //console.log(response)
    return response.data
}

export async function createMessage(data){
    const response = await chattiAPI.post("/api/messages", data)
    console.log(response.data)
    return response.data

}