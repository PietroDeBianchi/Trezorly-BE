const mongoose = require('mongoose');
const { Schema } = mongoose;

const membershipSchema = new Schema(
    {
        gruppo_id: {
            type: Schema.Types.ObjectId,
            ref: 'Groups',
            required: true,
            autopopulate: false,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
            autopopulate: false,
        },
        card_id: {
            type: Schema.Types.ObjectId,
            ref: 'Virtual_cards',
            required: false,
            autopopulate: false,
        },
        is_admin: {
            type: Boolean,
            default: false,
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

module.exports = mongoose.model('Memberships', membershipSchema);
