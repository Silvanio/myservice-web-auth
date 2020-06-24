import Service from "./service";

export default class UserService extends Service {

    constructor() {
        super("/auth/user");
    }

    getCurrentUserInfo() {
        return this.post({resource: "/currentUserInfo", newPath: "/auth"})
    }

    changePassword(user) {
        return this.post({resource: "/changePassword", data: user})
    }

    update(user) {
        console.log(user)
        return this.post({resource: "/update", data: user})
    }

}
