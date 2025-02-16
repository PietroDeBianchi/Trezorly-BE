const mongoose = require('mongoose');
const { Schema } = mongoose;

const virtualCardSchema = new Schema(
    {
        conto_id: {
            type: Schema.Types.ObjectId,
            ref: 'shared_accounts',
            required: true,
            autopopulate: true,
        },
        numero_carta: {
            type: String,
            required: true,
            unique: true,
            select: false,
        },
        data_creazione: {
            type: Date,
            default: Date.now,
        },
        data_scadenza: {
            type: Date,
            required: true,
        },
        is_active: {
            type: Boolean,
            default: false,
        },
        limite_spesa: {
            type: Number,
            default: null,
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

virtualCardSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('virtual_cards', virtualCardSchema);
