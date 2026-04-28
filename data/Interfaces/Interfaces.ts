export interface UserModel {
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

    //What we should add to the backend
    favorites?: FavoritesModel[]
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

export interface UserAccountInfo { //This is the data being sent to the backend for account creation
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
    businessReviews: ReviewModel[],

    //What should be added to the backend (the '?' means they are optional)
    favorites?: FavoritesModel[]    //Placing this here will allow us to see the whole favorited entry from the database, showing the user and business objects, their Id's and the id number of the favorite entry
}

export interface ChangePasswordRequest {
    username: string;
    currentPassword: string;
    newPassword: string;
}

export interface FetchBusinessData {
    businessId: number,
    businessName: string,
    businessHours: string,
    businessPhoneNumber: string,
    businessDescription: string,
    streetName: string,
    city: string,
    state: string,
    zipCode: number
}

export interface UpdateUserProfileRequest {
    username: string;
    email: string;
}

//Sample Interface that we need to add in the backend
//A Many-to-many relationship for favorited businesses
export interface FavoritesModel {
    id: number,
    userId: number,
    businessId: number,

    //What should be added to tie favorites to user account and business
    user?: UserModel, //This is so we can see the whole user object
    business?: BusinessModel   //This is so we can see the whole business object
}

export interface FavoriteCreateRequest{
    userId: number, 
    businessId: number
}

export interface ReviewDataRequest {
    businessId: number;
    date: string;
    reviewerName: string;
    reviewTitle: string;
    reviewDescription: string;
    reviewScore: number;
    userId: number;
}

export interface CreateBusinessRequest {
    businessName: string;
    businessHours: string;
    businessPhoneNumber: string;
    businessDescription: string;
    category: string;
    streetName: string;
    city: string;
    state: string;
    zipCode: number;
}

export interface MenuItemModel {
  id: number;
  businessId: number;
  name: string;
  description: string;
  price: number;
}

export interface CreateMenuItemModel {
  businessId: number;
  name: string;
  description: string;
  price: number;
}