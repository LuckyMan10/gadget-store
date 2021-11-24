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
    httpHost: any;
    data?: {
        username?: string;
        email?: string;
        password?: string;
        productId?: string;
        type?: string;
    }
}

export function host({withCredentials, baseURL, headers}: hostI) {
  return axios.create({
    withCredentials,
    baseURL,
    headers,
  });
};

export async function createResponse({method, url, httpHost, data }: createResponseI) {
    const options = {
        method,
        url,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN'
    }
    if(data) {
        //@ts-ignore
        options.data = data;
    }
    console.log(options);
    const response = await httpHost(options);
    return response;
}


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