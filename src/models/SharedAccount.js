const mongoose = require('mongoose');
const { Schema } = mongoose;

const sharedAccountSchema = new Schema(
    {
        nome_conto: {
            type: String,
            required: true,
            trim: true,
        },
        gruppo_id: {
            type: Schema.Types.ObjectId,
            ref: 'groups',
            required: true,
            autopopulate: true,
        },
        saldo: {
            type: Number,
            required: true,
            default: 0,
        },
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

sharedAccountSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('shared_accounts', sharedAccountSchema);
