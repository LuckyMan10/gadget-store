import axios from "axios";
import {host, createResponse} from "./index";

interface updateUserCartI {
    access_key: string;
    updateItem: {
        productId: string;
        quantity: number;
    }
    type: string;
}
interface deleteUserCartI {
    access_key: string;
    id: string;
}

const baseUrl = "http://localhost:5000/api/user";
const api_key = "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf";

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
function host(baseURL: string, headers: {api_key: string, authorization: string}) {
  return axios.create({
    withCredentials: true,
    baseURL,
    headers,
  });
};

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