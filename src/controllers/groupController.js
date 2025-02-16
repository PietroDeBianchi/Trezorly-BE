const Group = require("../models/Group");
const membershipHelper = require("../helpers/membershipHelper");

const GroupController = {
    // CREATE GROUP
    async createGroup(req, res) {
        try {
            if (!req.user) {
                throw new Error("user non trovato");
            }
            const { group_name, description } = req.body;
            if (!group_name)
                return res.status(404).json({ error: "Nome Obbligatorio" });
            const newGroup = new Group({
                group_name,
                description,
            });
            await newGroup.save();
            const membership_id = await membershipHelper.createMembership(
                req.user.id,
                newGroup._id,
                true,
            );
            if (!membership_id) {
                throw new Error("Errore nella creazione della membership");
            }
            newGroup.memberships = membership_id;
            await newGroup.save();
            res.status(201).json({
                message: "Gruppo creato con successo",
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = GroupController;
