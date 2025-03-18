import axios from "axios"
import { User } from "../types/user"

const getBaseUrl = 'http://127.0.0.1:5000/'
const axiosInstance = axios.create({
    baseURL: getBaseUrl , 
    timeout : 5000 
})

interface ApiResponse {
    data: User[]
    message: string
}

export const fetchApi = async (): Promise<User[]> => {
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