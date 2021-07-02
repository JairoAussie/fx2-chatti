import chattiAPI from "../config/api";

export async function signUp(data){
    const response = await chattiAPI.post("/api/auth/sign_up", data)
    //console.log(response.data)
    return response.data
}

export async function signIn(data){
    const response = await chattiAPI.post("/api/auth/sign_in", data)
    //console.log(response.data)
    return response.data
}