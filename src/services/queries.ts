import { useQueries, useQuery } from "@tanstack/react-query"
import { fetchApi, fetchApiDesc } from "./api"

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn : fetchApi , 
        // refetchOnWindowFocus : false
        // enabled : true
    })
}

export const useDesc = (ids: (number | undefined)[] | undefined) => {
    return useQueries({
      queries: (ids ?? []).map((a) => {
        return {
          queryKey: ['user', a],
          queryFn: async () => fetchApiDesc(a!), 
        };
      }),
    });
  };