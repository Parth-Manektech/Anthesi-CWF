import axios from 'axios'

export function setUrl(url = 'https://api-developer01.elixdev.it', options = { prod: false }) {
    // Use the production URL if prod is true
    if (options.prod) return url

    // Otherwise, use the passed development URL or a default value
    if (process.env.NODE_ENV === 'development') {
        return 'https://api-developer01.elixdev.it' // Replace with your actual development URL
    }

    // Fallback to the production URL by default
    return url
}

const Axios = axios.create({
    // You can switch to the production environment by setting `prod: true` or using NODE_ENV
    baseURL: setUrl(undefined, { prod: process.env.NODE_ENV === 'production' })
})

Axios.interceptors.request.use(
    (req) => {
        req.headers['x-requested-with'] = 'XMLHttpRequest'
        req.headers['x-api-key'] = 'VVN8vxCMTQG+TMLJ7Zx3qi8mhesfq6q/y5zJ8WZ3imc='
        return req
    },
    (err) => {
        return Promise.reject(err)
    }
)

Axios.interceptors.response.use(
    (res) => {
        return res
    },
    (err) => {
        if ((err?.response && err?.response?.status === 417) || err?.response?.status === 401) {
            return Promise.reject(err)
        }
        return Promise.reject(err)
    }
)

export default Axios
