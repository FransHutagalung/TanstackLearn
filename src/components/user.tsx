import { useState } from "react";
import { useCreateUser, useUpdateUser } from "../services/mutation";
import { useDesc, useUser } from "../services/queries";
import { UserModel } from "../types/user";
import { useIsFetching, UseQueryResult } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosAdd } from "react-icons/io";
import { updateUser } from "../services/api";

export const User = () => {
  const { data, isLoading, isPending, isError, fetchStatus, status } = useUser();
  const isFetching = useIsFetching();
  const userDesc = useDesc(data);
  const createUser = useCreateUser();
  const updateUser = useUpdateUser()
  const { register, handleSubmit, reset } = useForm<UserModel>();

  // State untuk menyimpan daftar hobbies
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [hobbyInput, setHobbyInput] = useState("");

  // Handler untuk menambahkan hobi ke array
  const handleAddHobby = () => {
    if (hobbyInput.trim()) {
      setHobbies([...hobbies, hobbyInput]);
      setHobbyInput(""); // Reset input setelah ditambahkan
    }
  };

  // Handler untuk submit form
  const handleCreateUser: SubmitHandler<UserModel> = (data) => {
    const newUser: UserModel = {
      ...data,
      hobbies, // Menggunakan array hobbies dari state
    };

    createUser.mutate(newUser);
    reset();
    setHobbies([]); // Reset daftar hobbies setelah submit
  };

  if (isLoading || isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateUser)} className="flex mx-2 flex-col my-2 w-1/2 gap-2">
        <div className="flex gap-2">
          <label className="w-20">Username</label>
          <input {...register("name")} className="w-40 rounded border" type="text" />
        </div>
        <div className="flex gap-2">
          <label className="w-20">Email</label>
          <input {...register("email")} className="w-40 rounded border" type="text" />
        </div>
        <div className="flex gap-2">
          <label className="w-20">Hobbies</label>
          <input
            className="w-40 rounded border"
            type="text"
            value={hobbyInput}
            onChange={(e) => setHobbyInput(e.target.value)}
          />
          <button type="button" onClick={handleAddHobby} className="bg-green-300 px-2 rounded">
            Add
          </button>
        </div>
        {/* Menampilkan daftar hobi yang sudah ditambahkan */}
        <div className="my-2">
          {hobbies.map((hobby, index) => (
            <span key={index} className="bg-gray-200 px-2 py-1 rounded mx-1">
              {hobby}
            </span>
          ))}
        </div>
        <button 
        type="submit" 
        value={createUser.isPending ? 'Creating...' : 'Submit'}
        disabled={createUser.isPending}
        className="w-full bg-blue-300 h-8 rounded-md my-2 cursor-pointer"
        >
          Submit
        </button>
      </form>

      <p>Query Function Status : {fetchStatus}</p>
      <p>Query Status : {status}</p>
      <p>Global is Fetching : {isFetching}</p>

      {/* Menampilkan daftar user */}
      {userDesc.map((result: UseQueryResult<UserModel, Error>, index) => (
        <div key={index} className=
        {`my-2 flex flex-col p-2 border ${result.data?.status ? "bg-green-200" : "bg-red-200"}`}>
          <div className="w-full justify-between flex">
          <p><strong>{result.data?.name}</strong></p>
          <IoIosAdd 
          onClick={() => {
            updateUser.mutate(result.data!)
          }}
          className="text-4xl cursor-pointer" />
          </div>
          <p>Email: {result.data?.email}</p>
          <p>Hobbies:</p>
          <ul>
            {result.data?.hobbies.map((hobby: string, index) => (
              <li key={index} className="ml-4 list-disc">{hobby}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
