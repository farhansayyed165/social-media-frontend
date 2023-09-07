import { BaseUrl } from "../utils/constants";

export async function searchBoxRecommend(searchQuery){
    if(!searchQuery){
        throw new Error("No Search Query")
    }
    const response = await fetch(`${BaseUrl}/api/search/${searchQuery}`)
    return response.json()
}

export async function searchUser(searchQuery, p){
    
    if(!searchQuery){
        throw new Error("No Search Query")
    }
    const page = p ? p:1;
    const response = await fetch(`${BaseUrl}/api/searchUser/${searchQuery}?page=${page}&limit=5`)
    return response.json()
}

export async function searchPosts(searchQuery, p){
    if(!searchQuery){
        throw new Error("No Search Query")
    }
    const page = p ? p:1;
    const response = await fetch(`${BaseUrl}/api/searchPost/${searchQuery}?page=${page}&limit=5`)
    return response.json()
}