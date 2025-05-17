import { formOptions, useForm } from "@tanstack/react-form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {useMutation, useQueryClient  } from "@tanstack/react-query";
import Spinner from "../../../public/spinner.svg";
import { searchUserByUsername } from "../../lib/axios/users";
import { Link } from "@tanstack/react-router";
import { useState } from "react";


const Search = () => {

  // set data 
  const [searchedList, setSearchList] = useState([]);

  // get useQueryClient
  const queryClient = useQueryClient();

  const {mutate, isPending } = useMutation({
      mutationFn: ({ username }: { username: string }) => {return searchUserByUsername({ username })},
      onSuccess:(data)=>{
        console.log(data)
        setSearchList(data.users)
      }
    });
  // form fields
  const formOpts = formOptions({
    defaultValues: {
      search: "",
    },
  });

  // form hook
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await queryClient.fetchQuery({ queryKey: ['user', 'username','search', value.search], queryFn: () => searchUserByUsername({ username: value.search }) })
      mutate({username:value.search})
    },
  });

  // API URL for photos located in server
  const PHOTO_API_URL = import.meta.env.VITE_SERVER_PUBLIC_API_URL;


  return (
    <div className="w-full py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit(e);
        }}
      >
        {/* Search Field */}
        <form.Field name="search">
          {(field) => {
            return (
              <>
                <div className="flex justify-start items-start w-full flex-col gap-2 px-6">
                  <label
                    htmlFor={field.name}
                    className="text-lg text-white font-medium"
                  >
                    Search
                  </label>
                  <div className="flex justify-center items-center border-1 px-2 border-gray-400 rounded-lg">
                    <input
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
                      id={field.name}
                      name={field.name}
                      className={`focus w-full  text-xl text-white indent-2  p-2 outline-none`}
                      type="text"
                    />
                    {isPending && <img src={Spinner} className="w-[30px]" />}
                    {!isPending && (
                      <button type="submit">
                        <MagnifyingGlassIcon className="cursor-pointer text-xl h-6 w-6 text-white" />
                      </button>
                    )}
                  </div>
                </div>
              </>
            );
          }}
        </form.Field>
      </form>
      <div className="overflow-hidden pt-2">
      <div className="flex justify-start items-start flex-col gap-3 mx-4 py-3 overflow-y-auto h-[425px] px-2  [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        {searchedList.length>0 && Array.from(searchedList).map((item)=>{
          console.log(item)
          return(
            <Link to={`/user/${item.username}`} className="text-white flex justify-start gap-3 items-center p-2 rounded-lg bg-gray-700 w-full">
              <div className="w-[40px] rounded-full overflow-clip"><img src={PHOTO_API_URL+item.profilePic}/></div>
              <span>{item.firstname}</span>
            </Link>
          ) 
        })}
          
      </div>
      </div>
      
    </div>
  );
};

export default Search;
