import Http from "./http";


export default class Service extends Http {

    constructor(path, http = null) {
        super(path, http);
    }

    save(entity) {
        return this.post({resource: "/save", data: entity})
    }

    saveDTO(entity) {
        return this.post({resource: "/saveDTO", data: entity})
    }

    delete(idEntity) {
        return this.post({resource: "/delete", data: idEntity})
    }

    findAll(pageable) {
        return this.post({resource: "/findAll", data: pageable})
    }

    get(idEntity) {
        return this.post({resource: "/get", data: idEntity})
    }

    getDTO(idEntity) {
        return this.post({resource: "/getDTO", data: idEntity})
    }

    list() {
        return this.getMethod("/list");
    }
}