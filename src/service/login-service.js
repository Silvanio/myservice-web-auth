import Service from "./arq/service";
import axios from "axios";
import AuthStorage from "./arq/auth-storage";

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
    config.headers.common['Authorization'] = "Basic bXlzZXJ2aWNlYXV0aDokMmEkMTAkcDlQazBmUU5BUVNlc0k0dnV2S0EwT1phbkREMg=="
    return config
});

configLogin.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status == 401) {
        console.log(error.response.data);
        let $refresh = localStorage.refresh_token;
        if ($refresh) {
            console.log($refresh);
        }
    } else {
        console.log(error.response.data);
    }
    return error;
});

export default class LoginService extends Service {
    constructor() {
        super("/auth", configLogin);
    }
    login(user) {
        let username = user.company+"-"+user.name;
        const queryString = "oauth/token?grant_type=password&username=" + username + "&password=" + user.password
        return this.post(queryString)
    }
    logout(){
        AuthStorage.removeItem("access_token");
        AuthStorage.removeItem("refresh_token");
        AuthStorage.removeItem("auth_user");
    }
}
