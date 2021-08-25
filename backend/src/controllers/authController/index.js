const register = require('./register');
const login = require('./login');

class controller {
    async register(req, res) {
        return await register(req, res);
    }
    async login(req, res) {
        return await login(req, res);
    }
}

module.exports = new controller();