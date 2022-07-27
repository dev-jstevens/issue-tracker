"use strict";

const ObjectId = require('mongoose').Types.ObjectId;

function hasValues(checkArr) {
    for (let i = 0; i < checkArr.length; i++) {
        if (!(checkArr[i])) {
            return false;
        }
    }

    return true;
}

function isValidObjectId(id){
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

function allStrings(checkArr) {
    for (let i = 0; i < checkArr.length; i++) {
        if (typeof checkArr[i] !== 'string') {
            return false;
        }
    }

    return true;
}

module.exports = {
    hasValues,
    isValidObjectId,
    allStrings
}