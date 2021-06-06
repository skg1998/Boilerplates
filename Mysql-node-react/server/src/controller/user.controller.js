const UserModel = require('../modal');

const User = {}

User.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.create({
            email: email,
            password: password,
        });
        return res.status(200).json({ token, user });
    } catch (err) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

User.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ where: { email } });
        if (user.validPassword(String(password))) {
            const token = authService().issue({ id: user.id });
            return res.status(200).json({ token, user });
        }
        return res.status(401).json({ msg: 'Unauthorized' });
    } catch (err) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

User.updateUserById = async (req, res) => {

}

User.deleteUserById = async (req, res) => {

}

User.getAll = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        return res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

User.validate = (req, res) => {
    const { token } = req.body;
    authService().verify(token, (err) => {
        if (err) {
            return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
        }
        return res.status(200).json({ isvalid: true });
    });
};

module.exports = User;
