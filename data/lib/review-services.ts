import { ReviewDataRequest, ReviewModel } from "../Interfaces/Interfaces";

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

// export const GetReviesByBusinessId = async (businessId:ReviewModel, token: string) => {
//     const res = await fetch(url + `GetReviewsByBusiness/${businessId}`, {
//         method:"GET",
//         headers:{
//             "Content-Type":"application/json",
//             "Authorization":"Bearer " + token,
//         }
//     });

//     if(!res.ok){
//         const data = await res.json();
//         const message = data.success;

//         console.log(message);
//         return data.success;
//     }

//     const data = await res.json();
//     return data.success;
// };

// export const GetReviesByBusinessId = async (businessId: number) => {
//     const res = await fetch(url + `GetReviewsByBusiness/${businessId}`, {
//         method:"GET",
//         headers:{
//             "Content-Type":"application/json"
//         }
//     });

//     if(!res.ok){
//         const data = await res.json();
//         const message = data.success;

//         console.log(message);
//         return data.success;
//     }

//     const data = await res.json();
//     return data;
// };

export const getReviewsByBusinessId = async (
  businessId: number
): Promise<ReviewModel[]> => {
  const res = await fetch(url + `GetReviewsByBusiness/${businessId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    let message = "Failed to fetch reviews";
    try {
      const errorData = await res.json();
      message = errorData.message || message;
    } catch {
      // ignore json parse failure
    }
    throw new Error(message);
  }

  const data = await res.json();

  return Array.isArray(data) ? data : [];
};


// export const AddReview = async (newReview: ReviewModel,token: string) => {
//     const res = await fetch(url + `AddReview`, {
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json",
//             "Authorization":"Bearer " + token,
//         },
//         body: JSON.stringify(newReview)
//     });

//     if(!res.ok){
//         const data = await res.json();
//         const message = data.success;

//         console.log(message);
//         return data.success;
//     }

//     const data = await res.json();
//     return data.success;
// };

export const AddReview = async (
  newReview: ReviewDataRequest,
  token: string
): Promise<boolean> => {
  const res = await fetch(url + `AddReview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newReview),
  });

  if (!res.ok) {
    let message = "Failed to add review";

    try {
      const data = await res.json();
      message = data.message || data.success || message;
    } catch {
      // ignore json parse failure
    }

    console.log(message);
    return false;
  }

  const data = await res.json();

  return data.success ?? true;
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