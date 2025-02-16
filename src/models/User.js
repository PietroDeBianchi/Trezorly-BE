const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true,
        },
        cognome: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password_hash: {
            type: String,
            required: true,
        },
        telefono: {
            type: String,
            trim: true,
            default: null,
        },
        data_registrazione: {
            type: Date,
            default: Date.now,
        },
        stato_verifica: {
            type: Boolean,
            default: false,
        },
        ruolo: {
            type: String,
            enum: ['user', 'admin', 'superadmin'],
            default: 'user',
        },
        memberships: [
            {
                type: Schema.Types.ObjectId,
                ref: 'memberships',
                autopopulate: true,
            },
        ],
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

userSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('users', userSchema);
