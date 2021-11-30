import axios from "axios";

interface userDataI {
  username: string;
  email: string;
  password: string;
}
interface loginUserDataI {
  email: string;
  password: string;
}


const $host = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api/auth",
  headers: {
    api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
  },
});

export const getRegistration = async (userData: userDataI) => {
  const response = await $host.post("/registration", {
    username: userData.username,
    email: userData.email,
    password: userData.password
  });
  return response;
};
export const getLogin = async (userData: loginUserDataI) => {
  try {
    const response = await $host.post("/login", {
      email: userData.email,
      password: userData.password
    });
    return response;
  }catch(e: any) {
    throw {error: e?.response?.data, status: e?.response?.status};
  }
};
export const check = async () => {
  try {
    const response = await $host.get("/refresh", {
      withCredentials: true,
    });
    return response;
  } catch(e: any) {
    throw {error: e?.response?.data, status: e?.response?.status};
  }
};
export const getLogout = async () => {
  const response = await $host.get("/logout");
  return response;
};