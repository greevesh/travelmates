const url = process.env.EXPO_PUBLIC_DEV_URL

export const signUpEndpoint = `${url}signup`
export const signInEndpoint = `${url}signin`
export const signOutEndpoint = `${url}signout`
export const usersEndpoint = `${url}users?q=`
export const setupEndpoint = `${url}user-setup`
export const friendRequestsEndpoint = `${url}friend-requests`

export const s3ProfilePicsEndpoint = 'https://travelmates-profile-pics.s3.ap-southeast-1.amazonaws.com/'