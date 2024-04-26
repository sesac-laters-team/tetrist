const { usersModel } = require("../models");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send("server error");
    }
};
