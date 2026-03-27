import { BusinessModel } from "../Interfaces/Interfaces";

const url = "https://csa-2526-munchr-a8dbh8ckfddrewh7.westus3-01.azurewebsites.net/Business/";

export const createBusiness = async (newBusiness: BusinessModel, token: string) => {
    const res = await fetch(url + "CreateBusiness", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
        },
        body: JSON.stringify(newBusiness),
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
};

export const editBusiness = async (business: BusinessModel, token: string) => {
    const res = await fetch(url + "EditBusiness", {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
        },
        body: JSON.stringify(business),
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
};

export const getBusinessByName = async (businessName: BusinessModel, token: string) => {
    const res = await fetch(url + `GetBusinessByName/${businessName}`, {
        method: "GET", 
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
        }
    })

    if(!res.ok){
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
};

export const getBusinessInfoByName = async (name: BusinessModel, token: string) => {
    const res = await fetch(url + `GetBusinessInfoByName/${name}`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token
        }
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
};

export const getBusinessById = async (id:number, token:string) => {
    const res = await fetch(url + `GetBusinessById/${id}`, {
        method:"GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
        }
    })
    
    if(!res.ok){
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    };

    const data = await res.json();
    return data.success;
};

export const getAllBusinesses = async (token: string) => {
    const res = await fetch(url + `GetAllBusinesses`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
        }
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
};

export const getBusinessByState = async (stateName: BusinessModel, token: string) => {
    const res = await fetch(url + `GetBusinessByState/${stateName}`, {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
        }
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
};

export const getBusinessByPostalCode = async (postalCode: BusinessModel, token: string) => {
    const res = await fetch(url + `GetBusinessByPostalCode/${postalCode}` , {
        method: "GET", 
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
        }
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
};

export const getBusinessByCity = async (city: BusinessModel, token: string) => {
    const res = await fetch(url + `GetBusinessByCity/${city}`, {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token
        }
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
};

export const getBusinessByCategory = async (foodCategory: BusinessModel, token: string) => {
    const res = await fetch(url + `GetBusinessByCategory/${foodCategory}`, {
        method: "GET", 
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token
        }
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;

};