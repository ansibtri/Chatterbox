import { api } from "./index";

// create a comment
async function postComment(data): Promise<any> {
  try {
    const response = await api.post("/comments/create", data);
    return response?.data;
  } catch (error) {
    console.log("Error", error);
    throw error?.response?.data || error;
  }
}

// get all comments of post
async function getAllCommentsOfPosts(postId:string){
  try{
    const response = await api.get(`/comments/post/${postId}`);
    return response?.data?.data
  }catch(error){
    console.log(error)
    throw error?.response?.data || error;
  }
}

export { postComment, getAllCommentsOfPosts };
