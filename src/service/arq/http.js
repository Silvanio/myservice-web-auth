import axios from 'axios'
import AuthStorage from "./auth-storage";


let standard = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    transformResponse: [
        function (data) {
            return data
        }
    ]
});


standard.interceptors.request.use((config) => {
    config.headers.common['Authorization'] = "Bearer "+AuthStorage.getStorage("access_token");
    return config
});

export default class Http {

    constructor(path, http = null) {
        this.path = path
        this.http = http || standard
    }

    get(resource) {
        return this.http
            .get(this.constructor.normalize(this.path, resource))
            .then(this.constructor.then)
    }


    post(resource, data) {
        return this.http.post(this.constructor.normalize(this.path, resource), {data}).then(this.constructor.then)
    }

    static then(response) {
        if (!response.data) {
            return {}
        }
        if (typeof response.data === 'string') {
            return JSON.parse(response.data)
        }
        return response.data
    }

    static normalize(start, end) {
        return `${start}/${end}`.replace(/([^:]\/)\/+/g, '$1')
    }
}