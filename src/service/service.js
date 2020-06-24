import Http from "./http";


export default class Service extends Http {

    constructor(path, http = null) {
        super(path, http);
    }

    listAll() {
        return this.get("listAll").then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
    }
}