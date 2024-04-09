import axios from "axios"

const BASE_URL = 'http://localhost:5000/api/'
// const BASE_URL = 'https://online-voting-backend.onrender.com/api/'


const CLOUDINARY = 'https://api.cloudinary.com/v1_1/dfloi7bv1/upload/voting'

export default axios.create({
    baseURL: BASE_URL
})




export const cloudinaryUpload = axios.create({
    baseURL: CLOUDINARY,
})