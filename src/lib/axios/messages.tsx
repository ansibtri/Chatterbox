import { api } from "./index";

// get chat, sender, and receiver info form rooms id
async function getChatAndMemberInfoUsingRoomsId(roomId: String) {
  try {
    const response = await api.get(`/messages/${roomId}/texts`);
    return response?.data?.messages;
  } catch (error) {
    throw error?.resonse?.data || error;
  }
}

// send message to server
async function sendMessage(values: any) {
  try { 
    console.log(values) 

    const response = await api.post("/messages/create", values);
    const data = response?.data;
    console.log(data)
    return data?.data;
  } catch (error) {
    console.log(error)
    throw error?.response?.data || error;
  }
}
export { getChatAndMemberInfoUsingRoomsId, sendMessage };
