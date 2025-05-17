import { createContext, useContext, useState } from "react";

interface PostContextType{
      post: Object | null;
      setPost: React.Dispatch<React.SetStateAction<Object | null>>;
}

// Post Context Provider Children Type
interface PostContextProviderProps {
  children: React.ReactNode;
}

const PostContext = createContext<PostContextType | null>(null);
// post context hook
function usePostContext() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
}

// post context provider
function PostContextProvider({ children }:PostContextProviderProps) {
  const [post, setPost] = useState<Object | null>(null);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
}


export { usePostContext, PostContextProvider };