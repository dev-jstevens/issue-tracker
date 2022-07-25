const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
    schemaVersion: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
    billingAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
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
            role: String,
            ref: "Users",
        },
    ],
    teamCount: {
        type: Number,
        default: 0,
    },
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            teamTitle: String,
            ref: "Teams",
        },
    ],
    departmentCount: {
        type: Number,
        default: 0,
    },
    departments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            departmenTitle: String,
            ref: "Departments",
        },
    ],
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Organizations", OrganizationSchema);