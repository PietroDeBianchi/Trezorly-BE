const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema(
    {
        nome_gruppo: {
            type: String,
            required: true,
            trim: true,
        },
        descrizione: {
            type: String,
            trim: true,
            default: null,
        },
        memberships: [
            {
                type: Schema.Types.ObjectId,
                ref: 'memberships',
                autopopulate: true,
            },
        ],
        data_creazione: {
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

groupSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('groups', groupSchema);
