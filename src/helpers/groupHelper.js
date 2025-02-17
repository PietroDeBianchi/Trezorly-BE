const Group = require("../models/Group");
const Invitation = require("../models/Invitation");
const membershipHelper = require("../helpers/membershipHelper");

const GroupHelper = {
    // CREATE GROUP
    async createGroupp(group_name, description, user_id) {
        try {
            const newGroup = new Group({
                group_name,
                description,
            });
            await newGroup.save();
            const membership_id = await membershipHelper.createMembership(
                user_id,
                newGroup._id,
                true // is_admin
            );
            if (!membership_id) {
                return {
                    message: "Errore nella creazione della membership",
                    statusCode: 500,
                };
            }
            newGroup.memberships = membership_id;
            await newGroup.save();
            return {
                message: "Gruppo creato con successo",
                groupId: newGroup._id,
                statusCode: 201,
            };
        } catch (error) {
            console.error("Errore nella creazione del gruppo:", error);
            return {
                message: "Errore nella creazione del gruppo",
                error: error.message,
                statusCode: 500,
            };
        }
    },
    // CREATE INVITATION
    async createInvitation(gruppo_id, sender_id, receiver_id) {
        try {
            const existingInvitation = await Invitation.findOne({
                gruppo_id,
                receiver_id,
            });
            if (existingInvitation) {
                return {
                    message:
                        "L'utente ha già un invito pendente per questo gruppo",
                    statusCode: 200,
                };
            }
            const invitation = new Invitation({
                gruppo_id,
                sender_id,
                receiver_id,
                status: "pending",
            });
            await invitation.save();
            return {
                message: "Invito creato con successo",
                invitation: invitation,
                statusCode: 201,
            };
        } catch (error) {
            console.error("Errore nella creazione dell'invito:", error);
            return null;
        }
    },
    // UPDATE INVITATION
    async updateInvitation(user_id, invitation_id, status) {
        try {
            const invitation = await Invitation.findById(invitation_id);
            if (!invitation || invitation.status === "accepted") {
                return {
                    message: "Invito non trovato",
                    statusCode: 404,
                };
            }
            if (invitation.receiver_id.toString() !== user_id) {
                return {
                    message: "Non autorizzato a rispondere a questo invito",
                    statusCode: 403,
                };
            }
            if (status === "accepted") {
                const membership_id = await membershipHelper.createMembership(
                    user_id,
                    invitation.gruppo_id,
                    false, // is_admin = false
                );
                invitation.status = "accepted";
                await invitation.save();
                return {
                    message: "Invito accettato, sei stato aggiunto al gruppo",
                    invitation: invitation,
                    membershipId: membership_id,
                    statusCode: 200,
                };
            }
            if (status === "declined") {
                invitation.status = "declined";
                await invitation.save();
                return {
                    message: "Invito rifiutato",
                    invitation: invitation,
                    statusCode: 200,
                };
            }
            return {
                message: "Stato non valido",
                statusCode: 400,
            };
        } catch (error) {
            console.error("Errore nella risposta all'invito:", error);
            return {
                message: "Errore interno del server",
                error: error.message,
                statusCode: 500,
            };
        }
    },
};

module.exports = GroupHelper;
