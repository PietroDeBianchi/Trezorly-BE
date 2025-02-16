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
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            trim: true,
            default: null,
        },
        is_Verified: {
            type: Boolean,
            // TODO : Change to false when getVerify is ready
            default: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'superadmin'],
            default: 'user',
        },
        memberships: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Memberships',
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

module.exports = mongoose.model('Users', userSchema);
