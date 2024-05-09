import { useQuery } from "react-query";
import { queryKeys } from "../querykeys";

export const useGetMessageThread = (token: string, id_: string) => {
  return useQuery<any, Error>(
    [queryKeys.messageThread, token, id_],
    () => getMessageThread(token, id_),
    { onError: (err) => console.error("Failed to get conversations:", err) }
  );
};

const getMessageThread = async (token: string, id_: string) => {
  const endpoint = `https://homeaglow-staging.herokuapp.com/api/cp/messages/${id_}/`;
  try {
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
      throw new Error("Failed to fetch user info");
    }
  } catch (error) {
    console.error("Error fetching user info", error);
    return null;
  }
};
