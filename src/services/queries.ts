import { useQuery } from "@tanstack/react-query"
import { fetchApi } from "./api"

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn : fetchApi , 
        // refetchOnWindowFocus : false
        // enabled : true
    })
}