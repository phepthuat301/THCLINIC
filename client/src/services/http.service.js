import axios from 'axios';
import swal from 'sweetalert';
import { deleteToken, readToken } from './local-storage.service';

export const httpApi = axios.create({
    baseURL: (process.env.REACT_APP_API_URL ?? ""),
});

httpApi.interceptors.request.use((config) => {
    config.headers = { ...config.headers, Authorization: `Bearer ${readToken()}` };

    return config;
});

httpApi.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const status = error.response.status
    if (status === 401) {
    }
    // if (status === 403) {
    //     window.location.href = '../access'
    // }
    // if (status >= 500) {
    //     window.location.href = '../error'
    // }
    // NotifyController.error(error.response.data?.message)
    return Promise.reject(error.response.data);
});


export const httpGet = async (url, config) => {
    const result = await httpApi.get(url, config)
    checkHttpStatus(result)
    return result

}

export const httpPost = async (url, body, config) => {
    const result = await httpApi.post(url, body, config)
    checkHttpStatus(result)
    return result
}
export const httpPut = async (url, body, config) => {

    const result = await httpApi.put(url, body, config)
    checkHttpStatus(result)
    return result

}
export const httpDelete = async (url, body) => {
    const result = await httpApi.delete(url, body ?? {})
    checkHttpStatus(result)
    return result

}

export const checkHttpStatus = async (result) => {
    if (result.status < 200 || result.status >= 400) {
        swal("Error Network", "error")
        if (result.status === 401) {
            deleteToken()
        }
        if (result.status === 403) {
            window.location.href = '../access'
        }
        if (result.status >= 500) {
            window.location.href = '../error'
        }
        return null
    }
    return result

}