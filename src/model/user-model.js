export default class UserModel {

    constructor(name, password) {
        this._name = name;
        this._password = password;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }
}
