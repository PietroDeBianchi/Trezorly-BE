const Membership = require("../models/Membership");

const MembershipController = {
    // CREATE GROUP
    async createMembership(user_id, gruppo_id, is_admin) {
        try {
            // Creazione nuovo Membership
            const newMembership = new Membership({
                gruppo_id,
                user_id,
                is_admin: is_admin ?? false,
            });
            // Salvataggio nel database
            await newMembership.save();
            // Restituisce l'ID della membership appena creata
            return newMembership._id || null;
        } catch (error) {
            console.error("Errore nella creazione della membership:", error);
            return null; // Evita crash, puoi gestire errore nel controller
        }
    },
};

module.exports = MembershipController;