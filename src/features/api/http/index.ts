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
    const response = await httpHost(options);
    return response;
}