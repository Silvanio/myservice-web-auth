import Service from "./common/service";

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

    updateUserDTO(user) {
        return this.post({resource: "/updateUserDTO", data: user})
    }

}
