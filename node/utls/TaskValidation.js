const Joi = require("joi");

const openTaskAuthSchema = Joi.object({
  _id: Joi.optional(),
  title: Joi.string().required().max(30).min(6).messages({
    "string.empty": "Please Fill In Title",
    "any.required": "Please Fill In Title",
    "string.max": "Title Can't Be Longer Than 30 Letters",
    "string.min": "Title Can't Be Shorter Than 6 Letters",
  }),
  description: Joi.string().required().max(120).min(10).messages({
    "string.empty": "Please Fill In Description",
    "any.required": "Please Fill In Description",
    "string.max": "Description Can't Be Longer Than 120 Letters",
    "string.min": "Description Can't Be Shorter Than 10 Letters",
  }),
  estimatedTime: Joi.number().greater(0).required().messages({
    "number.empty": "Please Fill In Estimated Time",
    "any.required": "Please Fill In Estimated Time",
    "number.greater": "Please Fill Estimated Time Which Is Greater Than 0",
  }),
  status: Joi.string().required().messages({
    "any.required": "Please Choose Status",
    "string.empty": "Please Choose Status",
  }),
  priority: Joi.string().required().messages({
    "any.required": "Please Choose Priority",
    "string.empty": "Please Choose Priority",
  }),
  untilDate: Joi.optional(),
  review: Joi.optional(),
  timeSpent: Joi.optional(),
});

const UrgentTaskAuthSchema = Joi.object({
  _id: Joi.optional(),
  title: Joi.string().required().max(30).min(6).messages({
    "string.empty": "Please Fill In Title",
    "any.required": "Please Fill In Title",
    "string.max": "Title Can't Be Longer Than 30 Letters",
    "string.min": "Title Can't Be Shorter Than 6 Letters",
  }),
  description: Joi.string().required().max(120).min(10).messages({
    "string.empty": "Please Fill In Description",
    "any.required": "Please Fill In Description",
    "string.max": "Description Can't Be Longer Than 120 Letters",
    "string.min": "Description Can't Be Shorter Than 10 Letters",
  }),
  estimatedTime: Joi.number().greater(0).required().messages({
    "number.empty": "Please Fill In Estimated Time",
    "any.required": "Please Fill In Estimated Time",
    "number.greater": "Please Fill Estimated Time Which Is Greater Than 0",
  }),
  status: Joi.string().required().messages({
    "any.required": "Please Choose Status",
    "string.empty": "Please Choose Status",
  }),
  priority: Joi.string().required().messages({
    "any.required": "Please Choose Priority",
    "string.empty": "Please Choose Priority",
  }),
  untilDate: Joi.date().greater(Date.now()).messages({
    "date.empty": "Please Fill In Date",
    "date.greater": "Please Fill In Date Which Is Older Than Today",
  }),
  review: Joi.optional(),
  timeSpent: Joi.optional(),
});

const closedTaskAuthSchema = Joi.object({
  _id: Joi.optional(),
  title: Joi.string().required().max(30).min(6).messages({
    "string.empty": "Please Fill In Title",
    "any.required": "Please Fill In Title",
    "string.max": "Title Can't Be Longer Than 30 Letters",
    "string.min": "Title Can't Be Shorter Than 6 Letters",
  }),
  description: Joi.string().required().max(120).min(10).messages({
    "string.empty": "Please Fill In Description",
    "any.required": "Please Fill In Description",
    "string.max": "Description Can't Be Longer Than 120 Letters",
    "string.min": "Description Can't Be Shorter Than 10 Letters",
  }),
  estimatedTime: Joi.number().greater(0).required().messages({
    "number.empty": "Please Fill In Estimated Time",
    "any.required": "Please Fill In Estimated Time",
    "number.greater": "Please Fill Estimated Time Which Is Greater Than 0",
  }),
  status: Joi.string().required().messages({
    "any.required": "Please Choose Status",
    "string.empty": "Please Choose Status",
  }),
  priority: Joi.string().required().messages({
    "any.required": "Please Choose Priority",
    "string.empty": "Please Choose Priority",
  }),
  untilDate: Joi.date().optional().greater(Date.now()).messages({
    "date.empty": "Please Fill In Date",
    "date.greater": "Please Fill In Date Which Is Older Than Today",
  }),
  review: Joi.string().min(10).max(120).messages({
    "string.empty": "Please Fill In Review",
    "any.required": "Please Fill In Review",
    "string.max": "Review Can't Be Longer Than 120 Letters",
    "string.min": "Review Can't Be Shorter Than 10 Letters",
  }),
  timeSpent: Joi.number().greater(0).messages({
    "number.empty": "Please Fill In Amount of Time Spent",
    "any.required": "Please Fill In Amount of Time Spent",
    "number.greater": "Please Fill Amount Spent Which Is Greater Than 0",
  }),
});
module.exports = {
  openTaskAuthSchema,
  UrgentTaskAuthSchema,
  closedTaskAuthSchema,
};
