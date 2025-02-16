const Group = require("../models/Group");
const membershipHelper = require("../helpers/membershipHelper");


const GroupHelper = {
    // CREATE GROUP
    async createGroupp( group_name, description, user_id) {
        try {
            const newGroup = new Group({
                group_name,
                description,
            });
            await newGroup.save();
            const membership_id = await membershipHelper.createMembership(
                user_id,
                newGroup._id,
                true,
            );
            if (!membership_id) {
                throw new Error("Errore nella creazione della membership");
            }
            newGroup.memberships = membership_id;
            await newGroup.save();
        } catch (error) {
            console.error("Errore nella creazione del gruppo:", error);
            return null; 
        }
    },
};

module.exports = GroupHelper;
