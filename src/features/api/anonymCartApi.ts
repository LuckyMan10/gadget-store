import axios from "axios";

const $host = axios.create({
  withCredentials: true,
  baseURL: `https://gadget-store-app.herokuapp.com/api/products`,
  headers: {
    api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
  },
});

export const getProductsList = async (productsId: Array<string>) => {
  try {
    let searchArguments = productsId.join(",");
    const response = await $host.get(`/findList/?id_list=${searchArguments}`);
    return response;
  } catch (e: any) {
    throw e;
  }
};
export const getOneProduct = async (id: string) => {
  try {
    const response = await $host.get(`/find?id=${id}`);
    return response;
  } catch (e: any) {
    throw e;
  }
};
