import Service from "./common/service";
import AuthStorage from "../utils/auth-storage";
import axios from "axios";
import Vue from "vue";


let configLogin = axios.create({
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

configLogin.interceptors.request.use((config) => {
    config.headers.common['Authorization'] = process.env.VUE_APP_BASIC;
    return config
});

configLogin.interceptors.response.use(response => response, function (error) {
    if(error.response.status == 503){
        Vue.prototype.$msgbus.addMessageError("msg_error_503", "")
    }
    throw error
});

export default class LoginService extends Service {
    constructor() {
        super("/auth", configLogin);
    }

    login(user) {
        let username = user.company+"-"+user.name;
        const queryString = "oauth/token?grant_type=password&username=" + username + "&password=" + user.password;
        return this.post({resource:queryString})
    }

    refreshToken() {
        let refreshToken = AuthStorage.getStorage("refresh_token");
        const queryString = "oauth/token?grant_type=refresh_token&refresh_token="+refreshToken;
        return this.post({resource:queryString})
    }

    sendMailForgotPassword(user) {
        let username = user.company+"/"+user.name;
        const queryString = "/forgotPassword/" + username;
        return this.post({resource:queryString})
    }

    logout(){
        AuthStorage.removeItem("access_token");
        AuthStorage.removeItem("refresh_token");
        AuthStorage.removeItem("remember_token");
        AuthStorage.removeItem("authorities");
    }

}
