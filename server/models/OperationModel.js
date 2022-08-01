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

const OperationSchema = new mongoose.Schema({
    schemaVersion: reqString,
    title: reqString,
    responsible: reqId,
    teamCount: defaultCount,
    teams: defaultArray,
    departmentCount: defaultCount,
    departments: defaultArray,
    ticketCount: defaultCount,
    tickets: defaultArray,
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Operations", OperationSchema);