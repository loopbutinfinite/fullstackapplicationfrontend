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
        const data = res.json();
        // const message = data.success;

    }
};

export const GetReviewsById = async (id: ReviewModel, token: string) => {
    const res = await fetch(url + `GetReviewsById/${id}`, {
        method: "GET", 
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
        }
    })
};