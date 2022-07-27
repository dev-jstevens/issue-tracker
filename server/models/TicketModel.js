const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    schemaVersion: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    hasDeadline: {
        type: Boolean,
        required: true,
    },
    deadline: {
        type: Date,
    },
    isOverdue: {
        type: Boolean,
    },
    relatedTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    description: [
        {
            timestamp: Date,
            submitter: mongoose.Schema.Types.ObjectId,
            body: String,
        },
    ],
    status: {
        type: String,
        default: "New",
    },
    assignedTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            username: String,
            ref: "Users",
        },
    ],
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Tickets", TicketSchema);