import { api } from "./index";


// get user data by username
async function getUserDataByUsername(username:string) {
  try {
    const response = await api.get(`/user/${username}`);
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
}

// search user data by username
async function searchUserByUsername({username}: {username:string}) {
  try {
    const response = await api.get(`/user/search?username=${username}`);
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
}

// update follow status
async function updateUserFollowAndFollowing(value){
  try {
    const response = await api.patch(`/user/follow`, value);
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
}


// get users whose birthday is on current date
async function getUsersWithBirthdayToday() {
  try {
    const response = await api.get(`/user/birthday`);
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
}


// save post
async function savePostForUser(userId:string, postId:string){
  try {
    const response = await api.put(`/user/${userId}/savepost`, {
      postId
    });
    console.log(response?.data?.data)
    return response?.data?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
}
export { getUserDataByUsername, searchUserByUsername, savePostForUser, updateUserFollowAndFollowing, getUsersWithBirthdayToday };
