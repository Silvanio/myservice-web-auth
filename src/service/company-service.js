import Service from "./common/service";

export default class CompanyService extends Service {

    constructor() {
        super("/auth/company");
    }

    findAllByName(name) {
        return this.post({resource: "/findAllByName", data: name})
    }

}
