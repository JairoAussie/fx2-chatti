import chattiAPI from "../config/api"

export async function getMessages(){
    console.log("getMessages")
    const response = await chattiAPI.get("/api/messages")
    console.log(response)
    return response.data
}

export async function getMyMessages(){
    const response = await chattiAPI.get("/api/messages/user")
    return response.data
}

export async function createMessage(data){
    const response = await chattiAPI.post("/api/messages", data)
    console.log(response.data)
    return response.data

}

export async function deleteMessage(id){
    const response = await chattiAPI.delete(`/api/messages/${id}`)
    return response.data

}