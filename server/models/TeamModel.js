const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true,
};

const reqId = {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
};

const defaultCount = {
    type: Number,
    default: 0,
};

// Objects should have the form:
// id: mongoose.Schema.Types.ObjectId
// name/title: string
const defaultArray = {
    type: Array,
    default: [],
};

const TeamSchema = new mongoose.Schema({
    schemaVersion: reqString,
    title: reqString,
    organizationId: reqId,
    teamLead: reqId,
    memberCount: defaultCount,
    members: defaultArray,
    projectCount: defaultCount,
    projects: defaultArray,
    operationCount: defaultCount,
    operations: defaultArray,
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Teams", TeamSchema);