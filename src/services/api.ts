import axios from "axios"
import { UserModel } from "../types/user"

const getBaseUrl = 'http://127.0.0.1:5000/'
const axiosInstance = axios.create({
    baseURL: getBaseUrl,
    timeout: 5000
})

interface ApiResponse {
    data: UserModel[]
    message: string
}

interface ApiDescResponse {
    data: UserModel
    message: string
}

export const fetchApi = async (): Promise<number[]> => {
    try {
        const response = await axiosInstance.get<ApiResponse>('data')
        console.log("API Response:", response.data)
        const userData = response.data.data.map((a: UserModel) => a.id)
        return userData
    } catch (error) {
        console.error("Error fetching data:", error)
        throw error
    }
}

export const fetchApiDesc = async (id: number): Promise<UserModel> => {
    try {
        const response = await axiosInstance.get<ApiDescResponse>(`data/${id}`)
        console.log("API Response:", response.data)
        const userData = response.data.data
        return userData
    } catch (error) {
        console.error("Error fetching data:", error)
        throw error
    }
}

export const createUser = async (data: UserModel) => {
    try {
        const response = await axiosInstance.post('users', data)
        console.log("API Response:", response.data)
        return response.data
    } catch (error) {
        console.error("Error fetching data:", error)
        throw error
    }
}