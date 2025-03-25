import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UserModel } from "../types/user"
import { createUser } from "./api"

export const useCreateUser = () => {

    const queryClient = useQueryClient( )

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
        onSettled: (_ , error) => {
            console.log("onSettled")
            if(error) {
                console.log(error)
            } else {
                queryClient.invalidateQueries({
                    queryKey : ["user"]
                })
            }
        }

    })
}