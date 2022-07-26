const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
    schemaVersion: {
        type: String,
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
    phone: {
        type: String,
        required: true,
    },
    memberCount: {
        type: Number,
        default: 0,
    },
    members: {
        type: Array,
        default: [],
    },
    teamCount: {
        type: Number,
        default: 0,
    },
    teams: {
        type: Array,
        default: [],
    },
    departmentCount: {
        type: Number,
        default: 0,
    },
    departments: {
        type: Array,
        default: [],
    },
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Organizations", OrganizationSchema);