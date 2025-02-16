const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema(
    {
        group_name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: null,
        },
        memberships: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Memberships',
                autopopulate: true,
            },
        ],
        createdAt: {
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

module.exports = mongoose.model('Groups', groupSchema);
