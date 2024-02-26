"use strict";
var convertDateToDB = function (stringUntilDate) { return new Date(stringUntilDate); };
var convertDateFromDB = function (docUntilDate) { return new Date(docUntilDate).toISOString(); };
var convertTimeSpentToDB = function (numberTimeSpent) { return Number.parseFloat(numberTimeSpent); };
module.exports = { convertDateFromDB: convertDateFromDB, convertDateToDB: convertDateToDB, convertTimeSpentToDB: convertTimeSpentToDB };
