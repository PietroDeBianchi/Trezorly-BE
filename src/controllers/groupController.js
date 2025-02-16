const Group = require("../models/Group");
const groupHelper = require("../helpers/groupHelper");

const GroupController = {
    // CREATE GROUP
    async createGroup(req, res) {
        try {
            const user_id = req.user.id;
            if (!user_id) {
                throw new Error("user non trovato");
            }
            const { group_name, description } = req.body;
            if (!group_name) {
                throw new Error("Nome gruppo Obbligatorio");
            }
            await groupHelper.createGroupp(group_name, description, user_id)
            res.status(201).json({
                message: "Gruppo creato con successo",
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = GroupController;
