import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UserModel } from "../types/user"
import { createUser, updateUser } from "./api"

export const useCreateUser = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: UserModel) => createUser(data),
        onMutate: () => {
            console.log("onMutate")
        },
        onSuccess: () => {
            console.log("onSuccess")
    },
        onError: () => {
            console.log("onError")
        },
        onSettled: (_, error) => {
            console.log("onSettled")
            if (error) {
                console.log(error)
            } else {
                queryClient.invalidateQueries({
                    queryKey: ["user"]
                })
            }
        }

    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (user: UserModel) => updateUser(user.id),
        onMutate: () => {
            console.log("onMutate")
        },
        onSuccess: () => {
            console.log("onSuccess")
        },
        onError: () => {
            console.log("onError")
        },
        onSettled: (_, error, variables) => {
            console.log("onSettled")
            if (error) {
                console.log(error)
            } else {
                console.log(variables)
                queryClient.invalidateQueries({
                    queryKey: ["user"]
                })
                queryClient.invalidateQueries({
                    queryKey: ["user", { id: variables.id }]
                })
            }
        }
    })

}