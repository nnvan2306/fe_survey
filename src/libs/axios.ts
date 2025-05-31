import Axios, { isAxiosError } from "axios";

const api = Axios.create({
    baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.request.use(
    (config) => {
        // config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

export const getAxiosError = (error: Error | null) => {
    if (!error) return "";
    if (isAxiosError(error)) {
        const e = error.response?.data?.errors;

        if (Array.isArray(e)) {
            return e[0] || "";
        }

        return e;
    }

    return error.message;
};
