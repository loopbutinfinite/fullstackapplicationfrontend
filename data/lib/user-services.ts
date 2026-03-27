import { UserInfo, UserModel } from "../Interfaces/Interfaces";

const url = "https://csa-2526-munchr-a8dbh8ckfddrewh7.westus3-01.azurewebsites.net/User/";

export const createAccount = async (user: UserInfo) => {
    const res = await fetch(url + "CreateAccount", {
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
    };

    const data = await res.json();
    return data.success;
};

export const login = async (user: UserInfo) => {
    const res = await fetch(url + "Login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.message;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
};

export const deleteUser = async (user: UserModel) => {
    const res = await fetch(url + "DeleteUser", {
        method: "DELETE",
        headers: {
            "Content-Type": "applicaton/json"
        },
        body: JSON.stringify(user)
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.message;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
}

export const getAllUsers = async () => {
    const res = await fetch(url + "GetAllUsers")

    if(!res.ok){
        const data = await res.json();
        const message = data.message;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
};

export const getUserById = async (id: number) => {
    const res = await fetch(url + `GetUserById/${id}`)

    if(!res.ok){
        const data = await res.json();
        const message = data.message;

        console.log(message);
        return data.message;
    }

    const data = await res.json();
    return data.success;
};

export const getUserByUsername = async (username: string) => {
    const res = await fetch(url + `GetUserByUsername/${username}`)

    if(!res.ok){
        const data = await res.json();
        const message = data.message;

        console.log(message);
        return data.message;
    }

    const data = await res.json();
    return data.success;
};

export const IsTokenValid = (): boolean => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return token != null;
};

export const GrabToken = (): string => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return token ?? "";
};

export const LoggedInUser = () => JSON.parse(localStorage.getItem("user")!);