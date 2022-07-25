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
    organizations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            organizationTitle: String,
            ref: "Organizations",
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
            departmentTitle: String,
            ref: "Departments",
        },
    ],
    createdOn: {
        type: Date,
        default: Date.now(),
    },
    token: {
        type: String,
    },
});

module.exports = mongoose.model("Users", UserSchema);