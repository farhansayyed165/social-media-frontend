import { BaseUrl } from "../utils/constants";

export async function createComment(data,token){
    try {
        const response = await fetch(`${BaseUrl}/api/comments/createComment`, {
            method: "POST", 
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin", 
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            redirect: "follow", 
            referrerPolicy: "no-referrer", 
            body: JSON.stringify(data), 
        });
    return response.json(); 
    } catch (err) {
        console.log(err)
    }
}

export async function getComment(commentId,p){
    const response = await fetch(
        `${BaseUrl}/api/comments/${commentId}`)

    return response.json(); 
}

export async function getCommentsPaginated(postId, p){
    console.log(postId)
    const page = p ? p : 1
    try {
        const response = await fetch(`${BaseUrl}/api/comments/infiniteComments/${postId}?page=${page}&limit=5`,{
        }) 
        return response.json()
    }
    catch(e){
        console.log(e)
        return e;
    }
}