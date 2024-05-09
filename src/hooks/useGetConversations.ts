import { useQuery } from "react-query";
import { queryKeys } from "../querykeys";
interface Message {
  id: string;
  firstName: string;
  lastName: string;
  message: string;
  messageDateTime: Date;
}
interface GetConversationsResult {
  conversations: Message[];
}

export const useGetConversations = (token: string) => {
  return useQuery<GetConversationsResult, Error>(
    [queryKeys.conversations],
    () => getConversations(token),
    { onError: (err) => console.error("Failed to get conversations:", err) }
  );
};

const endpoint =
  "https://homeaglow-staging.herokuapp.com/api/cp/conversations/";
const getConversations = async (token: string) => {
  try {
    console.log("token:", token);
    const auth_header = `Bearer ${token}`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: auth_header,
      },
      mode: "cors",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data:", data);
      return data;
    } else {
      throw new Error("Failed to fetch convos");
    }
  } catch (error) {
    console.error("Error fetching conversations", error);
    return null;
  }
};
