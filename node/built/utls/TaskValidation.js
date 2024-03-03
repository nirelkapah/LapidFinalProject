"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closedTaskAuthSchema = exports.UrgentTaskAuthSchema = exports.openTaskAuthSchema = void 0;
// const Joi = require("joi");
var joi_1 = __importDefault(require("joi"));
exports.openTaskAuthSchema = joi_1.default.object({
    _id: joi_1.default.optional(),
    title: joi_1.default.string().required().max(30).min(6).messages({
        "string.empty": "Please Fill In Title",
        "any.required": "Please Fill In Title",
        "string.max": "Title Can't Be Longer Than 30 Letters",
        "string.min": "Title Can't Be Shorter Than 6 Letters",
    }),
    description: joi_1.default.string().required().max(120).min(10).messages({
        "string.empty": "Please Fill In Description",
        "any.required": "Please Fill In Description",
        "string.max": "Description Can't Be Longer Than 120 Letters",
        "string.min": "Description Can't Be Shorter Than 10 Letters",
    }),
    estimatedTime: joi_1.default.number().greater(0).required().messages({
        "number.empty": "Please Fill In Estimated Time",
        "any.required": "Please Fill In Estimated Time",
        "number.greater": "Please Fill Estimated Time Which Is Greater Than 0",
    }),
    status: joi_1.default.string().required().messages({
        "any.required": "Please Choose Status",
        "string.empty": "Please Choose Status",
    }),
    priority: joi_1.default.string().required().messages({
        "any.required": "Please Choose Priority",
        "string.empty": "Please Choose Priority",
    }),
    untilDate: joi_1.default.optional(),
    review: joi_1.default.optional(),
    timeSpent: joi_1.default.optional(),
});
exports.UrgentTaskAuthSchema = joi_1.default.object({
    _id: joi_1.default.optional(),
    title: joi_1.default.string().required().max(30).min(6).messages({
        "string.empty": "Please Fill In Title",
        "any.required": "Please Fill In Title",
        "string.max": "Title Can't Be Longer Than 30 Letters",
        "string.min": "Title Can't Be Shorter Than 6 Letters",
    }),
    description: joi_1.default.string().required().max(120).min(10).messages({
        "string.empty": "Please Fill In Description",
        "any.required": "Please Fill In Description",
        "string.max": "Description Can't Be Longer Than 120 Letters",
        "string.min": "Description Can't Be Shorter Than 10 Letters",
    }),
    estimatedTime: joi_1.default.number().greater(0).required().messages({
        "number.empty": "Please Fill In Estimated Time",
        "any.required": "Please Fill In Estimated Time",
        "number.greater": "Please Fill Estimated Time Which Is Greater Than 0",
    }),
    status: joi_1.default.string().required().messages({
        "any.required": "Please Choose Status",
        "string.empty": "Please Choose Status",
    }),
    priority: joi_1.default.string().required().messages({
        "any.required": "Please Choose Priority",
        "string.empty": "Please Choose Priority",
    }),
    untilDate: joi_1.default.date().greater(Date.now()).messages({
        "date.empty": "Please Fill In Date",
        "date.greater": "Please Fill In Date Which Is Older Than Today",
    }),
    review: joi_1.default.optional(),
    timeSpent: joi_1.default.optional(),
});
exports.closedTaskAuthSchema = joi_1.default.object({
    _id: joi_1.default.optional(),
    title: joi_1.default.string().required().max(30).min(6).messages({
        "string.empty": "Please Fill In Title",
        "any.required": "Please Fill In Title",
        "string.max": "Title Can't Be Longer Than 30 Letters",
        "string.min": "Title Can't Be Shorter Than 6 Letters",
    }),
    description: joi_1.default.string().required().max(120).min(10).messages({
        "string.empty": "Please Fill In Description",
        "any.required": "Please Fill In Description",
        "string.max": "Description Can't Be Longer Than 120 Letters",
        "string.min": "Description Can't Be Shorter Than 10 Letters",
    }),
    estimatedTime: joi_1.default.number().greater(0).required().messages({
        "number.empty": "Please Fill In Estimated Time",
        "any.required": "Please Fill In Estimated Time",
        "number.greater": "Please Fill Estimated Time Which Is Greater Than 0",
    }),
    status: joi_1.default.string().required().messages({
        "any.required": "Please Choose Status",
        "string.empty": "Please Choose Status",
    }),
    priority: joi_1.default.string().required().messages({
        "any.required": "Please Choose Priority",
        "string.empty": "Please Choose Priority",
    }),
    untilDate: joi_1.default.date().optional().greater(Date.now()).messages({
        "date.empty": "Please Fill In Date",
        "date.greater": "Please Fill In Date Which Is Older Than Today",
    }),
    review: joi_1.default.string().min(10).max(120).messages({
        "string.empty": "Please Fill In Review",
        "any.required": "Please Fill In Review",
        "string.max": "Review Can't Be Longer Than 120 Letters",
        "string.min": "Review Can't Be Shorter Than 10 Letters",
    }),
    timeSpent: joi_1.default.number().greater(0).messages({
        "number.empty": "Please Fill In Amount of Time Spent",
        "any.required": "Please Fill In Amount of Time Spent",
        "number.greater": "Please Fill Amount Spent Which Is Greater Than 0",
    }),
});
// module.exports = {
//   openTaskAuthSchema,
//   UrgentTaskAuthSchema,
//   closedTaskAuthSchema,
// };
