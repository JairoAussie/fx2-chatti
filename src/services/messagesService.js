import chattiAPI from "../config/api"

export async function getMessages(){
    console.log("getMessages")
    const response = await chattiAPI.get("/api/messages")
    console.log(response)
    return response.data
}