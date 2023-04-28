const Joi = require('joi'); 

const openTaskAuthSchema = Joi.object({
    _id: Joi.optional(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    estimatedTime: Joi.number().greater(0).required(),
    status: Joi.required(),
    priority: Joi.required(),
    untilDate: Joi.optional(),
    review: Joi.optional(),
    timeSpent: Joi.optional()

});

const urgentTaskAuthSchema = Joi.object({
    _id: Joi.optional(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    estimatedTime: Joi.number().greater(0).required(),
    status: Joi.required(),
    priority: Joi.required(),
    untilDate: Joi.date().greater(Date.now()),
    review: Joi.optional(),
    timeSpent: Joi.optional()
});

const closedTaskAuthSchema = Joi.object({
    _id: Joi.optional(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    estimatedTime: Joi.number().greater(0).required(),
    status: Joi.required(),
    priority: Joi.required(),
    untilDate: Joi.date().greater(Date.now()),
    review: Joi.string(),
    timeSpent: Joi.number()});

module.exports = {openTaskAuthSchema, urgentTaskAuthSchema, closedTaskAuthSchema}