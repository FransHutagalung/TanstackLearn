import { useMutation } from "@tanstack/react-query"
import { UserModel } from "../types/user"
import { createUser } from "./api"

export const useCreateUser = () => {
    return useMutation({
        mutationFn : (data : UserModel) => createUser(data) , 
        onMutate: () => {
            console.log("onMutate")
        } , 
        onSuccess: () => {
            console.log("onSuccess")
        }  , 
        onError: () => {
            console.log("onError")
        } , 
        onSettled: () => {
            console.log("onSettled")
        }

    })
}