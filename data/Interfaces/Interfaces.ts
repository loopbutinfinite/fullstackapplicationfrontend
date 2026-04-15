export interface UserModel { //This interface is for the data that is being returned from the backend
    userId: number,
    userProfileImage: string,
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber: string,
    email: string,
    salt: string,
    hash: string
    isBusinessOwner: boolean,
}

export interface Token {
    token: string
}

export interface UserData {
    id: number,
    username: string
}

export interface UserInfo {
    username: string,
    password: string
}

export interface UserAccountInfo{ //This is the data being sent to the backend for account creation
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    userProfileImage: string;
    isBusinessOwner: boolean;
}

export interface ReviewModel {
    id: number,
    businessId: number,
    date: Date,
    reviewerName: string,
    reviewTitle: string,
    reviewDescription: string,
    reviewScore: number,
    userId: number,
    userReview: UserModel
}

export interface BusinessModel {
    businessId: number,
    businessName: string,
    businessHours: string,
    businessPhoneNumber: string,
    businessDescription: string,
    category: string,
    streetName: string,
    city: string,
    state: string,
    zipCode: number,
    businessReviews: ReviewModel[]
}