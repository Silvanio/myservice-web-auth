import Service from "./common/service";

export default class AppModuleService extends Service {

    constructor() {
        super("/auth/appModule");
    }
    findAllActiveDTO() {
        return this.getMethod("/findAllActiveDTO");
    }
}
