// Define the endpoint to fetch the JWT token
const tokenEndpoint = "https://homeaglow-staging.herokuapp.com/api/token/";

// Define the username and password object

interface Credential {
  username: string;
  password: string;
}

// Function to fetch JWT token by making a POST request to the endpoint with credentials
async function fetchJWTToken(credentials: Credential): Promise<string | null> {
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

// Function to store JWT token in browser cookies
function storeTokenInCookie(token: string): void {
  // Set the token in a cookie named 'jwt_token'
  document.cookie = `jwt_token=${token}; Secure; SameSite=Strict`;
}

// Main function to fetch token and store it in cookies
export async function fetchAndStoreToken(
  credentials: Credential
): Promise<void> {
  const jwtToken = await fetchJWTToken(credentials);
  if (jwtToken) {
    storeTokenInCookie(jwtToken);
    console.log("JWT token stored in browser cookies");
  } else {
    console.error("Failed to fetch JWT token");
  }
}
