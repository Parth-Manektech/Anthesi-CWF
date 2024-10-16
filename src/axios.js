import axios from 'axios'

export function setUrl(url = 'https://api-developer01.elixdev.it', options = { prod: false }) {
    if (options.prod) return url;

    if (process.env.NODE_ENV === 'development') {
        return 'https://api-developer01.elixdev.it';
    }

    return url;
}

const Axios = axios.create({
    baseURL: setUrl(undefined, { prod: process.env.NODE_ENV === 'production' })
});

Axios.interceptors.request.use(
    (req) => {
        req.headers['x-requested-with'] = 'XMLHttpRequest';
        req.headers['x-forwarded-host'] = 'api-developer01.elixdev.it';
        req.headers['x-api-origin'] = 'api-developer01.elixdev.it';
        req.headers['x-api-key'] = 'VVN8vxCMTQG+TMLJ7Zx3qi8mhesfq6q/y5zJ8WZ3imc=';
        req.headers.host = 'http://api-developer01.elixdev.it/';
        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);

Axios.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        if ((err?.response && err?.response?.status === 417) || err?.response?.status === 401) {
            return Promise.reject(err);
        }
        return Promise.reject(err);
    }
);

export default Axios
