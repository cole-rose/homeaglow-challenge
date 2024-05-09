import { useQuery } from "react-query";
import { queryKeys } from "../querykeys";
export interface Message {
  id: string;
  firstName: string;
  lastName: string;
  message: string;
  messageDateTime: Date;
}
export interface GetUserInfoResult {
  user_type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  timezone: string;
}

export const useGetUserInfo = (token: string) => {
  return useQuery<GetUserInfoResult, Error>(
    [queryKeys.userInfo, token],
    () => getUserInfo(token),
    { onError: (err) => console.error("Failed to get conversations:", err) }
  );
};

const endpoint = "https://homeaglow-staging.herokuapp.com/api/userinfo/";
const getUserInfo = async (token: string) => {
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
      return data;
    } else {
      throw new Error("Failed to fetch user info");
    }
  } catch (error) {
    console.error("Error fetching user info", error);
    return null;
  }
};
