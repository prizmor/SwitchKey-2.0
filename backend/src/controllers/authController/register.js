const User = require('../../modules/user');
const bcrypt = require('bcryptjs');

module.exports = async function (req, res) {
    try {
        const { login, password, email } = req.body;
        if (!login || !password || !email) {
            return res.status(400).json({message: `Не переданы параметры`});
        }
        const candidate = await User.findOne({login});
        if (candidate) {
            return res.status(400).json({message: `Логин ${login} уже занят`});
        }
        const Password = bcrypt.hashSync(password, 7);
        const user = new User({login: login, password: Password, email: email});
        await user.save();
        return res.status(200).json({message: 'OK'})
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'Register error'});
    }
}
