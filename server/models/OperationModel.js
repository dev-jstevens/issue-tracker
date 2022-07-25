const mongoose = require("mongoose");

const OperationSchema = new mongoose.Schema({
    schemaVersion: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    responsible: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
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
    ticketCount: {
        type: Number,
        default: 0,
    },
    tickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ticketSubject: String,
            ref: "Tickets",
        },
    ],
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Operations", OperationSchema);