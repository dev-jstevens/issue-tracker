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

const TicketSchema = new mongoose.Schema({
    schemaVersion: reqString,
    subject: reqString,
    submittedBy: reqId,
    hasDeadline: {
        type: Boolean,
        required: true,
    },
    deadline: {
        type: Date,
    },
    isOverdue: {
        type: Boolean,
        default: false,
    },
    relatedTo: reqId,
    // Description
    // timestamp: Date
    // submitter: mongoose.Schema.Types.ObjectId
    // body: String
    description: defaultArray,
    status: {
        type: String,
        default: "New",
    },
    userCount: defaultCount,
    assignedUsers: defaultArray,
    teamCount: defaultCount,
    assignedTeams: defaultArray,
    departmentCount: defaultCount,
    assignedDepartments: defaultArray,
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Tickets", TicketSchema);