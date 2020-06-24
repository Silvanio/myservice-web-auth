/**
 * @property {string} access_token
 * @property {string} refresh_token
 */
export default class AuthStorage {

    static setStorage = (remember, key, value) => {
        if (remember && (remember === true || remember === "true"  )) {
            localStorage.setItem(key, value);
        } else {
            sessionStorage.setItem(key, value);
        }
    }

    static removeItem = (key) => {
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
    }

    static getStorage = (key) => {
        let access = sessionStorage.getItem(key);
        if (access) {
            return access;
        }
        access = localStorage.getItem(key);
        return access;
    }
}