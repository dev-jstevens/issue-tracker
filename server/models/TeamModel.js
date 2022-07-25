const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    schemaVersion: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    teamLead: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    memberCount: {
        type: Number,
        default: 0,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            username: String,
            ref: "Users"
        },
    ],
    projectCount: {
        type: Number,
        default: 0,
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            projectName: String,
            ref: "Projects",
        },
    ],
    operationCount: {
        type: Number,
        default: 0,
    },
    operations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            operationName: String,
            ref: "Operations",
        },
    ],
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Teams", TeamSchema);