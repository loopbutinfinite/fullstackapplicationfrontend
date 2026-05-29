import { BusinessModel, CreateBusinessRequest } from "../Interfaces/Interfaces";
import { API_BASE_URL } from "./api-config";

const url = API_BASE_URL + "Business/";

export const getAllBusinesses = async () => {
    const res = await fetch(url + `GetAllBusinesses`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!res.ok) {
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return [];
    }

    const data = await res.json();
    return data;
};


export const createBusiness = async (newBusiness: CreateBusinessRequest, token: string) => {
    const res = await fetch(url + "CreateBusiness", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(newBusiness),
    });

    const responseText = await res.text();

    let data;

    try {
        data = responseText ? JSON.parse(responseText) : null;
    } catch {
        data = responseText;
    }

    if (!res.ok) {
        console.log("Create business failed:", data);
        return {
            success: false,
            message: typeof data === "string" ? data : data?.message ?? "Failed to create business.",
        };
    }

    return {
        success: true,
        data,
    };
};

export const getBusinessByOwnerId = async (ownerId: number) => {
    const res = await fetch(url + `GetBusinessByOwnerId/${ownerId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        return null;
    }

    return await res.json();
};

export const editBusiness = async (business: BusinessModel, token: string): Promise<{ success: boolean; message?: string }> => {
    const res = await fetch(url + "EditBusiness", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(business),
    });

    const responseText = await res.text();
    let data: any = null;
    try {
        data = responseText ? JSON.parse(responseText) : null;
    } catch {
        data = responseText;
    }

    if (!res.ok) {
        console.log("Edit business failed:", data);
        return {
            success: false,
            message: typeof data === "string" ? data : data?.message ?? "Failed to update business.",
        };
    }

    return { success: true };
};

export const getBusinessByName = async (businessName: BusinessModel, token: string) => {
    const res = await fetch(url + `GetBusinessByName/${businessName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    })

    if (!res.ok) {
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
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    if (!res.ok) {
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
};

export const getBusinessById = async (id: number) => {
    const res = await fetch(url + `GetBusinessById/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!res.ok) {
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return [];
    };

    const data = await res.json();
    return data;
};

export const getBusinessByState = async (stateName: BusinessModel, token: string) => {
    const res = await fetch(url + `GetBusinessByState/${stateName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    });

    if (!res.ok) {
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data;
};

export const getBusinessByPostalCode = async (postalCode: BusinessModel, token: string) => {
    const res = await fetch(url + `GetBusinessByPostalCode/${postalCode}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    });

    if (!res.ok) {
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data;
};

export const getBusinessByCity = async (city: BusinessModel, token: string) => {
    const res = await fetch(url + `GetBusinessByCity/${city}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    if (!res.ok) {
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
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    if (!res.ok) {
        const data = await res.json();
        const message = data.success;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;

};

export const uploadBusinessMenuImage = async (businessId: number, file: File): Promise<string> => {
    const token = localStorage.getItem("Token");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${url}/Business/${businessId}/MenuImage`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
    }

    return await res.text();
};