const UserModel = require('../modal/user');

const User = {}

User.signup = async (req, res) => {

}

User.login = async (req, res) => {

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

module.exports = User;
