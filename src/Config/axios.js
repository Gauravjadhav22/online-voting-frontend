import axios from "axios"

const BASE_URL = 'http://localhost:5000/api/'
// const BASE_URL = 'https://blogging-app-api.onrender.com/'
// const BASE_URL = 'https://blogging-app-backend-nodejs.herokuapp.com'

const CLOUDINARY = 'https://api.cloudinary.com/v1_1/dfloi7bv1/upload/voting'

export default axios.create({
    baseURL: BASE_URL
})




export const cloudinaryUpload = axios.create({
    baseURL: CLOUDINARY,
})