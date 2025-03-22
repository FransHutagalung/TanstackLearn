import axios from "axios"
import { UserModel } from "../types/user"

const getBaseUrl = 'http://127.0.0.1:5000/'
const axiosInstance = axios.create({
    baseURL: getBaseUrl , 
    timeout : 5000 
})

interface ApiResponse {
    data: UserModel[]
    message: string
}

export const fetchApi = async (): Promise<UserModel[]> => {
    try {
        const response = await axiosInstance.get<ApiResponse>('data')
        console.log("API Response:", response.data)
        const userData = response.data.data
        return userData
    } catch (error) {
        console.error("Error fetching data:", error)
        throw error
    }
}