import { useUser } from "../services/queries";
import { UserModel } from "../types/user";
import { useIsFetching } from "@tanstack/react-query";

export const User = () => {
  const { data , isLoading , isPending , isError , fetchStatus , status} = useUser();
  const isFetching = useIsFetching()

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
      {data.map((a: UserModel, index) => (
        <div key={index}>
          <p>{a.name}</p>
        </div>
      ))}
    </div>
  );
};
