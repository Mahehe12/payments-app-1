import { apiConnector } from "../apiConnector";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const signup = async (firstName, lastName, username, password) => {
  try {
    const response = await apiConnector("POST", `${BASE_URL}/user/signup`, {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    });

    // Log the full response for debugging
    console.log(response);

    // Check if the response status is 201 (created) and return the success message
    if (response && response.status === 201) {
      return response.data.message; // "User created successfully."
    } else {
      throw new Error(response.data.message || "Signup failed");
    }
  } catch (error) {
    console.log("Signup error...", error.message);
    return error.message; // Return the error message
  }
};


export const signin = async (username, password) => {
  try {
    const response = await apiConnector("POST", `${BASE_URL}/user/signin`, {
      username: username,
      password,
    });

    if (response.status === 200) {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response.data.token;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("Login error...", error.message);
    console.log("Error in login");
  }
};