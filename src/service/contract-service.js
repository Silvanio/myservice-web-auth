import Service from "./common/service";

export default class ContractService extends Service {

    constructor() {
        super("/auth/contract");
    }

    findModules(userCompanyDTO) {
        return this.post({resource: "/findModules", data: userCompanyDTO})
    }

    findMyContracts(pageable) {
        return this.post({resource: "/findMyContracts", data: pageable})
    }

}
