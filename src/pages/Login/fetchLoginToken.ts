// Define the endpoint to fetch the JWT token
const tokenEndpoint = "https://homeaglow-staging.herokuapp.com/api/token/";

// Define the username and password object

interface Credential {
  username: string;
  password: string;
}

// Define a function to set cookies
function setCookie(name: string, value: string, expirationDays: number) {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to set access token in session cookie
function setAccessTokenInCookie(accessToken: string) {
  setCookie("access", accessToken, 1); // 1 day expiration
}

// Function to set refresh token in session cookie
function setRefreshTokenInCookie(refreshToken: string) {
  setCookie("refresh", refreshToken, 1); // 1 day expiration
}

interface AccessToken {
  access: string;
  refresh: string;
}

// Function to fetch JWT token by making a POST request to the endpoint with credentials
async function fetchJWTToken(
  credentials: Credential
): Promise<AccessToken | null> {
  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      mode: "cors",
    });

    if (response.ok) {
      const tokenData = await response.json();
      const { token } = tokenData;
      console.log("token:", token);
      return token;
    } else {
      throw new Error("Failed to fetch JWT token");
    }
  } catch (error) {
    console.error("Error fetching JWT token:", error);
    return null;
  }
}

// Main function to fetch token and store it in cookies
export async function fetchAndStoreToken(
  credentials: Credential
): Promise<void> {
  const jwtToken = await fetchJWTToken(credentials);
  if (jwtToken) {
    setAccessTokenInCookie(jwtToken.access);
    setRefreshTokenInCookie(jwtToken.refresh);

    console.log("JWT token stored in browser cookies");
  } else {
    throw new Error("Failed to fetch JWT token");
  }
}
