export interface UserModel{
    userId: number,
    userProfileImage: string, 
    username: string,
    phoneNumber: string,
    email: string, 
    salt: string, 
    hash: string
    isBusinessOwner: boolean,
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

export interface ReviewModel{
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

export interface BusinessModel{
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