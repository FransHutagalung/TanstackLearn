import { useCreateUser } from "../services/mutation";
import { useDesc, useUser } from "../services/queries";
import { UserModel } from "../types/user";
import { useIsFetching, UseQueryResult } from "@tanstack/react-query";
import { SubmitHandler } from 'react-hook-form'

export const User = () => {
  const { data, isLoading, isPending, isError, fetchStatus, status } =
    useUser();
  const isFetching = useIsFetching();
  const userDesc = useDesc(data);
  const createUser = useCreateUser()

  const handleCreateUser : SubmitHandler<UserModel> = (data) => {
      createUser.mutate(data)
  }

  if (isLoading || isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <p>Query Function Status : {fetchStatus}</p>
      <p>Query Status : {status}</p>
      <p>Global is Fetcing : {isFetching}</p>
      {data.map((a: number, index) => (
        <div key={index}>
          <p>{a}</p>
        </div>
      ))}

      {userDesc.map((result: UseQueryResult<UserModel, Error>, index) => (
        <div key={index}>
          <p>{result.data?.name}</p>
        </div>
      ))}
    </div>
  );
};
