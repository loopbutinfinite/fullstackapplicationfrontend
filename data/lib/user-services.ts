import { UserInfo } from "../Interfaces/Interfaces";

const url = "";

export const createUser = async (user: UserInfo) => {
    const res = await fetch(url + "CreateUser", {
        method: "POST", 
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(user)
    })
    if(!res.ok){
        const data = await res.json();
        const message = data.message;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
};

export const login = async (user: UserInfo) => {
    const res = await fetch(url + "GetUserByUsername", {

    })
};