import axios from 'axios'
import AuthStorage from "../../utils/auth-storage";
import LoginService from "../login-service";
import Vue from "vue";


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
    config.headers.common['Authorization'] = "Bearer " + AuthStorage.getStorage("access_token");
    return config
});


standard.interceptors.response.use(response => {
    return response
}, error => {
    const {response: {status, config}} = error

    if (error.response.status == 403) {
        Vue.prototype.$msgbus.addMessageWarn("msg_error_403", "")
    }

    if (error.response.status == 500) {
        Vue.prototype.$msgbus.addMessageWarn("msg_error_500", "")
    }

    if (error.response.status == 503) {
        Vue.prototype.$msgbus.addMessageError("msg_error_503", "")
    }
    const originalRequest = config
    if (status == 401) {
        const loginService = new LoginService();
        return loginService.refreshToken().then((refreshResponse) => {
            let access_token = refreshResponse.access_token;
            let refresh_token = refreshResponse.refresh_token;
            if (access_token) {
                const remember = AuthStorage.getStorage("remember_token");
                originalRequest.headers['Authorization'] = "Bearer " + access_token;
                return new Promise((resolve, reject) => {
                    AuthStorage.setStorage(remember, "access_token", access_token);
                    AuthStorage.setStorage(remember, "refresh_token", refresh_token);
                    standard(originalRequest).then(response => {
                        resolve(response);
                    }).catch((error) => {
                        Vue.prototype.$msgbus.addMessageError("msg_unauthorized_user", "")
                        loginService.logout();
                        reject(error);
                    })
                });
            }
        }).catch((error) => {
            Vue.prototype.$msgbus.addMessageError("msg_unauthorized_user", "")
            loginService.logout();
            throw error;
        });
    }
    throw error;
});

export default class Http {

    constructor(path, http = null) {
        this.path = path
        this.http = http || standard
    }

    getMethod(resource) {
        return this.http
            .get(this.constructor.normalize(this.path, resource))
            .then(this.constructor.then)
            .catch(this.constructor.catch)
    }


    post({newPath, resource, data}) {
        Vue.prototype.$mymutations.setProgressBar(true);
        return this.http
            .post(this.constructor.normalize(newPath ? newPath: this.path, resource), data)
            .then(this.constructor.then)
            .catch(this.constructor.catch)
    }

    static then(response) {
        Vue.prototype.$mymutations.setProgressBar(false);
        if (!response.data) {
            return {}
        }
        if (typeof response.data === 'string') {
            return JSON.parse(response.data)
        }
        return response.data
    }

    static catch(error) {
        Vue.prototype.$mymutations.setProgressBar(false);
        throw error
    }


    static normalize(start, end) {
        return `${start}/${end}`.replace(/([^:]\/)\/+/g, '$1')
    }
}