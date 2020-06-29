import Service from "./common/service";

export default class CompanyService extends Service {

    constructor() {
        super("/auth/company");
    }
}
