const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    schemaVersion: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    isSuper: {
        type: Boolean,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    isIndividual: {
        type: Boolean,
        required: true,
    },
    isEnterprise: {
        type: Boolean,
        required: true,
    },
    organizationCount: {
        type: Number,
        default: 0,
    },
    organizations: {
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
    token: {
        type: String,
    },
});

module.exports = mongoose.model("Users", UserSchema);