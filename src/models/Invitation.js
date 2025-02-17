const mongoose = require("mongoose");
const { Schema } = mongoose;

const InvitationSchema = new mongoose.Schema(
    {
        gruppo_id: {
            type: Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },
        sender_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "declined"],
            default: "pending",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

module.exports = mongoose.model("Invitations", InvitationSchema);
