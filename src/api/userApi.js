export async function createUser(data) {
    const response = await fetch('/api/users/signup', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();

}

export async function loginUser(data) {
    const response = await fetch('/api/users/login', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();

}
export async function checkPassword(data, token) {
    const response = await fetch('/api/users/check-password', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();

}

export async function getUser(username) {
    const response = await fetch(
        `/api/users/profile/${username}`)

    return response.json();
}

export async function getUserById(id) {
    if (!id) {
        throw new Error("Id is undefine")
    }
    const response = await fetch(
        `/api/users/profile/id/${id}`)

    return response.json();
}
export async function updateUser(data, token) {
    const response = await fetch('/api/users/update', {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function deleteUser(data, token) {
    const response = await fetch('/api/users/delete', {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            Authentication: `Bearer ${token}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();
};

export async function followHandler(toFollowId, token) {
    const response = await fetch(`/api/users/follow/${toFollowId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}



