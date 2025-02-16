const Membership = require("../models/Membership");
const User = require("../models/User");

const MembershipHelper = {
    // CREATE MEMBERSHIP
    async createMembership(user_id, gruppo_id, is_admin) {
        try {
            const newMembership = new Membership({
                gruppo_id,
                user_id,
                is_admin: is_admin ?? false,
            });
            await newMembership.save();
            const user = await User.findById(user_id);
            if (!user) {
                console.error("Errore: Utente non trovato");
                return null;
            }
            user.memberships = user.memberships || [];
            user.memberships.push(newMembership._id);
            await user.save()
            return newMembership._id || null;
        } catch (error) {
            console.error("Errore nella creazione della membership:", error);
            return null; 
        }
    },
};

module.exports = MembershipHelper;
