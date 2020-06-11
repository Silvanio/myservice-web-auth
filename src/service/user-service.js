import Service from "./arq/service";

export default class UserService extends Service {

    constructor() {
        super("/auth");
    }

    getCurrentUserInfo() {
        return this.post("/currentUserInfo")
    }

}
