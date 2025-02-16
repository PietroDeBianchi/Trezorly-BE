const mongoose = require('mongoose');
const { Schema } = mongoose;

const membershipSchema = new Schema(
    {
        gruppo_id: {
            type: Schema.Types.ObjectId,
            ref: 'groups',
            required: true,
            autopopulate: false,
        },
        utente_id: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
            autopopulate: false,
        },
        card_id: {
            type: Schema.Types.ObjectId,
            ref: 'virtual_cards',
            required: false,
            autopopulate: false,
        },
        is_admin: {
            type: Boolean,
            default: false,
        },
        data_aggiunta: {
            type: Date,
            default: Date.now,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

membershipSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('memberships', membershipSchema);
