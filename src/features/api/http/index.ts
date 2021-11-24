import axios from "axios";

interface hostI {
    withCredentials: boolean;
    baseURL: string;
    headers: {
        api_key: string;
        authorization?: string;
    }
}
interface createResponseI {
    method: string;
    url: string;
    host: any;
    data?: {
        username?: string;
        email?: string;
        password?: string;
    }
}

export function host({withCredentials, baseURL, headers}: hostI) {
  return axios.create({
    withCredentials,
    baseURL,
    headers,
  });
};

export async function createResponse({method, url, host, data }: createResponseI) {
    const response = await host[url](url, (data && data));
    return response;
}
/*
Now, we can do this:
    const headers = {
        api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
        authorization: access_key
    }
    const httpHost = host(true, 'http://localhost:5000/api/user', headers);
    const response = await createResponse("get", "/cart", httpHost);
*/



/*
export const getRegistration = async (userData: userDataI) => {
  const response = await $host.post("/registration", {
    username: userData.username,
    email: userData.email,
    password: userData.password
  });
  return response;
};
export const getLogin = async (userData: loginUserDataI) => {
  const response = await $host.post("/login", {
    email: userData.email,
    password: userData.password
  });
  return response;
};
export const check = async () => {
  const response = await $host.get("/refresh", {
    withCredentials: true,
  });
  return response;
};
export const getLogout = async () => {
  const response = await $host.get("/logout");
  return response;
};
*/

/*

const getUserCart = async (access_key: string) => {
  const response = await host(baseUrl, {
    api_key,
    authorization: access_key,
  }).get("/cart");
  return response;
};

const updateUserCart = async ({access_key, updateItem, type}: updateUserCartI) => {
    const response = await host(baseUrl, {
        api_key,
        authorization: access_key,
    }).put("/cart", {updateItem, type});
    return response;
};

const deleteUserCart = async ({access_key, id}: deleteUserCartI) => {
    const response = await host(baseUrl, {
        api_key,
        authorization: access_key,
    }).delete(`/cart?id=${id}`);
    return response;
}
*/