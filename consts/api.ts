const url = process.env.EXPO_PUBLIC_DEV_URL

export const signUpEndpoint = `${url}signup`
export const signInEndpoint = `${url}signin`
export const signOutEndpoint = `${url}signout`
export const refreshEndpoint = `${url}refresh`
export const usersEndpoint = `${url}users?q=`
export const friendsEndpoint = `${url}users/friends`
export const currentUserEndpoint = `${url}currentUser`
export const tripEndpoint = `${url}trip`
export const tripsEndpoint = `${url}trips`
export const currentUserTripsEndpoint = `${url}trips/currentUser`
export const friendRequestsEndpoint = `${url}friend-requests/`

export const s3ProfilePicsEndpoint = 'https://travelmates-profile-pics.s3.ap-southeast-1.amazonaws.com/'
export const prodS3ProfilePicsEndpoint = 'https://prod-travelmates-profile-pics.s3.ap-southeast-1.amazonaws.com/'