import { api } from "./index";

// get all chat rooms
async function getRoomsOfCurrentUser(currentUserId:string){
      try{
            const response = await api.get(`/rooms/${currentUserId}/chatlist`);
            return response?.data;
      }catch(error){
            throw error?.resonse?.data || error;
      }
}


async function updateLastMessageOfRoom(data:Object){
      try{
            const response = await api.patch(`/rooms/${data?.roomId}/lastmessage`, {message: data.message, senderId:data.senderId});
            return response?.data;
      }catch(error){
            throw error?.response?.data || error;
      }
}


export {getRoomsOfCurrentUser, updateLastMessageOfRoom}