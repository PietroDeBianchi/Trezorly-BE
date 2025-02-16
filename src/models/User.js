const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
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
        phone: {
            type: String,
            trim: true,
            default: null,
        },
        registration_date: {
            type: Date,
            default: Date.now,
        },
        is_Verified: {
            type: Boolean,
            default: false,
        },
        role: {
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
