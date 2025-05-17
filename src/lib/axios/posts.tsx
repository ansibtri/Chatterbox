import { useQueryClient } from "@tanstack/react-query";
import { api } from "./index";

// create post
async function createPost(values: any) {
  try {
    const formData = new FormData();
    // append values to form data
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("tagged", values.tagged);
    formData.append("music", values.music);
    formData.append("likedBy", null);
    formData.append("postedBy", values.postedBy);
    formData.append("postedAt", Date.now().toString());

    // append images to form data
    values.images.forEach((image: any) => {
      formData.append("images", image, image.name);
    });

    const response = await api.post("/posts/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
}

// get all posts
async function getAllPosts() {
  try {
    const response = await api.get("/posts");
    console.log(response?.data?.data);
    return response?.data?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
}

// get posts count of specific id
async function getPostsCountsById(id:string){
  try{
    console.log(id)
  }catch(error){
    throw error?.response?.data || data;
  }
}

// get posts of user by userId
async function getPostsOfUserByUserId(id:string){
  try{
    console.log(id)
    const response = await api.get(`/posts/${id}`);
    return response?.data?.data;
  }catch(error){
    console.log(error)
    throw error?.resonse?.data || error;
  }
}

// get posts by username
async function getPostsAndUserByUsername(username: string){
  try{
    const response = await api.get(`/posts/userpost/${username}`);
    return response?.data?.data;
  }catch(error){
    console.log(error)
    throw error?.resonse?.data || error;
  }
}

// react post

async function reactPost(postId: string, userId: string) {
  console.log(postId,userId)
  try {
    const response = await api.put(`/posts/react/${postId}`, {
      userId,
    });
    console.log(response)
    return response?.data?.data;
  }
  catch (error) {
    throw error?.response?.data || error;
  }
}
export { createPost, getAllPosts,getPostsAndUserByUsername, getPostsCountsById, getPostsOfUserByUserId, reactPost };
