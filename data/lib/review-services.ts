import { ReviewModel } from "../Interfaces/Interfaces";

const url = "https://csa-2526-munchr-a8dbh8ckfddrewh7.westus3-01.azurewebsites.net/Review/";

export const GetReviews = async (token: string) => {
    const res = await fetch(url + `GetReviews`, {
        method:"GET",
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

export const GetReviewsById = async (id: ReviewModel, token: string) => {
    const res = await fetch(url + `GetReviewsById/${id}`, {
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

export const GetReviewsByScore = async (scoreNumber: ReviewModel, token: string) => {
    const res = await fetch(url + `GetReviewsByScore/${scoreNumber}`, {
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

export const GetReviesByBusinessId = async (businessId:ReviewModel, token: string) => {
    const res = await fetch(url + `GetReviewsByBusiness/${businessId}`, {
        method:"GET",
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

export const AddReview = async (newReview: ReviewModel,token: string) => {
    const res = await fetch(url + `AddReview`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
        },
        body: JSON.stringify(newReview)
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

export const EditReview = async (reviewToEdit: ReviewModel, token: string) => {
    const res = await fetch(url + `EditReview`, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token
        },
        body: JSON.stringify(reviewToEdit)
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