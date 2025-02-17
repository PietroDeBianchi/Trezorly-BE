const Invitation = require("../models/Invitation");
const groupHelper = require("../helpers/groupHelper");

const GroupController = {
    // CREATE GROUP
    async createGroup(req, res) {
        try {
            const user_id = req.user.id;
            if (!user_id) {
                return res.status(401).json({ error: "User non trovato" });
            }
            const { group_name, description } = req.body;
            if (!group_name) {
                return res.status(400).json({ error: "Nome gruppo obbligatorio" });
            }
            const result = await groupHelper.createGroupp(group_name, description, user_id);
            return res.status(result.statusCode).json(result);
        } catch (error) {
            console.error("Errore nella creazione del gruppo:", error);
            return res.status(500).json({ error: "Errore interno del server" });
        }
    },
    // CREATE INVITATION
    async createInvitation(req, res) {
        try {
            const { gruppo_id, receiver_id } = req.body;
            const sender_id = req.user.id;
            if (!gruppo_id || !receiver_id) {
                return res
                    .status(400)
                    .json({ error: "Gruppo e destinatario sono obbligatori" });
            }
            const result = await groupHelper.createInvitation(
                gruppo_id,
                sender_id,
                receiver_id,
            );
            return res.status(result.statusCode).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // UPDATE INVITATION
    async updateInvitation(req, res) {
        try {
            const user_id = req.user.id;
            const { invitation_id, status } = req.body;
            if (!invitation_id || !status) {
                return res.status(400).json({ error: "Invito valido obbligatorio" });
            }
            const result = await groupHelper.updateInvitation(
                user_id,
                invitation_id,
                status
            );
            return res.status(result.statusCode).json(result);
        } catch (error) {
            console.error("Errore nella risposta all'invito:", error);
            return res.status(500).json({ error: "Errore interno del server" });
        }
    }
};

module.exports = GroupController;
