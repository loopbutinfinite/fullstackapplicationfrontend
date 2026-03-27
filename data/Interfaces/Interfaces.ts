export interface UserModel{
    id: number, 
    username: string,
    password: string,
    email: string, 
    buissness: string,
    salt: string, 
    hash: string
}

export interface Token{
    token: string
}

export interface UserData{
    id: number,
    usernamer: string
}

export interface UserInfo{
    username: string, 
    password: string
}