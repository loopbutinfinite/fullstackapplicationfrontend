import { FavoriteCreateRequest, FavoritesModel } from "../Interfaces/Interfaces";
import { API_BASE_URL } from "./api-config";

const url = API_BASE_URL + "Favorite/";

export const GetFavorites = async (token: string) => {
    const res = await fetch(url + "GetFavorites", {
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
}

export const GetFavoritesById = async (token: string, id: FavoritesModel) => {
    const res = await fetch(url + `GetFavoritesById/${id}`, {
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
}

export const GetFavoritesByBusinessId = async (token: string, BusinessId: FavoritesModel) => {
    const res = await fetch(url + `GetFavoritesByBusinessId/${BusinessId}`, {
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
}

export const GetFavoritesByUserId = async (token: string, UserId: FavoritesModel) => {
    const res = await fetch(url + `GetFavoritesByUserId/${UserId}`, {
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
}

export const AddFavorite = async (newFavorite: FavoritesModel, token: string) => {
    const res = await fetch(url + `AddFavorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(newFavorite)
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

export const DeleteFavorite = async (favorite: FavoritesModel, token: string) => {
    const res = await fetch(url + "RemoveFavorite", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(favorite)
    });

    if (!res.ok) {
        const data = await res.json();
        const message = data.message;

        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
}