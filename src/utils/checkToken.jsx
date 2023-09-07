export async function checkToken(token){
    try {
        const response = await fetch(
            `http://localhost:5000/api/validateToken`,
            {headers:{'Authorization':`Bearer ${token}`}}
            )
            return response.json()
    } catch (error) {

    }
    // console.log(response.status)
}