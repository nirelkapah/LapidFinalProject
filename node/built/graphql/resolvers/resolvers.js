"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var task_1 = require("../../models/task");
var ConversionUtils = __importStar(require("../../utls/conversionUtils"));
var graphql_subscriptions_1 = require("graphql-subscriptions");
var TaskValidation_1 = require("../../utls/TaskValidation");
var pubsub = new graphql_subscriptions_1.PubSub();
exports.resolvers = {
    Query: {
        tasks: function () { return __awaiter(void 0, void 0, void 0, function () {
            var tasks, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, task_1.tasksCollection.find()];
                    case 1:
                        tasks = _a.sent();
                        return [2 /*return*/, tasks.map(function (task) {
                                return __assign(__assign({}, task._doc), { _id: task.id });
                            })];
                    case 2:
                        err_1 = _a.sent();
                        throw err_1;
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        //Get Tasks By Id
        taskById: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var taskId, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        taskId = args.id;
                        return [4 /*yield*/, task_1.tasksCollection.findById(taskId)];
                    case 1:
                        result = _a.sent();
                        console.log(result && result._doc);
                        return [2 /*return*/, __assign(__assign({}, result._doc), { _id: args.id })];
                    case 2:
                        err_2 = _a.sent();
                        throw err_2;
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        //Get Tasks By Keyword Search and Filters
        tasksByKeywordAndFilters: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var reg, statusFilters, priorityFilters, tasks, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        reg = new RegExp(args.keyword, "i");
                        statusFilters = args.filters.status;
                        priorityFilters = args.filters.priority;
                        return [4 /*yield*/, task_1.tasksCollection.find({
                                $or: [
                                    { title: reg },
                                    { priority: reg },
                                    { description: reg },
                                    { status: reg },
                                    { review: reg },
                                ],
                            })
                                .find({ "status": { "$in": statusFilters.length > 0 ? statusFilters : ['Open', 'Closed', 'Urgent'] } })
                                .find({ "priority": { "$in": priorityFilters.length > 0 ? priorityFilters : ['Top', 'Regular', 'Minor'] } })];
                    case 1:
                        tasks = _a.sent();
                        return [2 /*return*/, tasks.map(function (task) {
                                return __assign(__assign({}, task._doc), { _id: task.id });
                            })];
                    case 2:
                        err_3 = _a.sent();
                        throw err_3;
                    case 3: return [2 /*return*/];
                }
            });
        }); },
    },
    Mutation: {
        createTask: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var task, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        if (!(args.taskInput.status === "Open")) return [3 /*break*/, 2];
                        return [4 /*yield*/, TaskValidation_1.openTaskAuthSchema.validateAsync(args.taskInput)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(args.taskInput.status === "Urgent")) return [3 /*break*/, 4];
                        return [4 /*yield*/, TaskValidation_1.UrgentTaskAuthSchema.validateAsync(args.taskInput)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(args.taskInput.status === "Closed")) return [3 /*break*/, 6];
                        return [4 /*yield*/, TaskValidation_1.closedTaskAuthSchema.validateAsync(args.taskInput)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        //Convert Type
                        if (args.taskInput.timeSpent) {
                            args.taskInput.timeSpent = ConversionUtils.convertTimeSpentToDB(args.taskInput.timeSpent);
                        }
                        task = new task_1.tasksCollection({
                            title: args.taskInput.title,
                            description: args.taskInput.description,
                            // estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime),
                            estimatedTime: args.taskInput.estimatedTime,
                            status: args.taskInput.status,
                            priority: args.taskInput.priority,
                        });
                        if (args.taskInput.status === 'Urgent' || args.taskInput.status === 'Closed') {
                            task.untilDate = args.taskInput.untilDate;
                        }
                        if (args.taskInput.status === 'Closed') {
                            task.review = args.taskInput.review;
                            task.timeSpent = args.taskInput.timeSpent;
                        }
                        return [4 /*yield*/, task.save()];
                    case 7:
                        result = _a.sent();
                        // const createdTask = {...result._doc, _id: task.id, untilDate: task.untilDate };
                        console.log(task.id);
                        pubsub.publish('TASK_CREATED', {
                            taskCreated: task.id
                        });
                        return [2 /*return*/, result];
                    case 8:
                        err_4 = _a.sent();
                        throw err_4;
                    case 9: return [2 /*return*/];
                }
            });
        }); },
        //Delete Task
        deleteTask: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, task_1.tasksCollection.findOneAndRemove({ _id: args._id })];
                    case 1:
                        _a.sent();
                        pubsub.publish('TASK_DELETED', {
                            taskDeleted: args._id
                        });
                        return [2 /*return*/, null];
                    case 2:
                        err_5 = _a.sent();
                        throw err_5;
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        //Update Existing Task
        updateTask: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 13, , 14]);
                        if (!(args.taskInput.status === "Open")) return [3 /*break*/, 2];
                        return [4 /*yield*/, TaskValidation_1.openTaskAuthSchema.validateAsync(args.taskInput)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(args.taskInput.status === "Urgent")) return [3 /*break*/, 4];
                        return [4 /*yield*/, TaskValidation_1.UrgentTaskAuthSchema.validateAsync(args.taskInput)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(args.taskInput.status === "Closed")) return [3 /*break*/, 6];
                        return [4 /*yield*/, TaskValidation_1.closedTaskAuthSchema.validateAsync(args.taskInput)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        //Covert Data
                        if (args.taskInput.timeSpent) {
                            args.taskInput.timeSpent = ConversionUtils.convertTimeSpentToDB(args.taskInput.timeSpent);
                        }
                        result = void 0;
                        if (!(args.taskInput.status === 'Open')) return [3 /*break*/, 8];
                        return [4 /*yield*/, task_1.tasksCollection.findOneAndUpdate({ _id: args.taskInput._id }, {
                                $set: {
                                    title: args.taskInput.title,
                                    description: args.taskInput.description,
                                    // estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime),
                                    estimatedTime: args.taskInput.estimatedTime,
                                    status: args.taskInput.status,
                                    priority: args.taskInput.priority,
                                },
                                $unset: { untilDate: 1, review: 1, timeSpent: 1 }
                            }, { new: true })];
                    case 7:
                        result = _a.sent();
                        return [3 /*break*/, 12];
                    case 8:
                        if (!(args.taskInput.status === 'Urgent')) return [3 /*break*/, 10];
                        return [4 /*yield*/, task_1.tasksCollection.findOneAndUpdate({ _id: args.taskInput._id }, {
                                $set: {
                                    title: args.taskInput.title,
                                    description: args.taskInput.description,
                                    estimatedTime: args.taskInput.estimatedTime,
                                    // estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime),
                                    status: args.taskInput.status,
                                    priority: args.taskInput.priority,
                                    untilDate: args.taskInput.untilDate,
                                },
                                $unset: { review: 1, timeSpent: 1 }
                            }, { new: true })];
                    case 9:
                        result = _a.sent();
                        return [3 /*break*/, 12];
                    case 10:
                        if (!(args.taskInput.status === 'Closed')) return [3 /*break*/, 12];
                        return [4 /*yield*/, task_1.tasksCollection.findOneAndUpdate({ _id: args.taskInput._id }, {
                                $set: {
                                    title: args.taskInput.title,
                                    description: args.taskInput.description,
                                    estimatedTime: +args.taskInput.estimatedTime,
                                    // estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime),
                                    status: args.taskInput.status,
                                    priority: args.taskInput.priority,
                                    untilDate: args.taskInput.untilDate,
                                    review: args.taskInput.review,
                                    timeSpent: args.taskInput.timeSpent,
                                },
                            }, { new: true })];
                    case 11:
                        result = _a.sent();
                        _a.label = 12;
                    case 12:
                        // const updatedTask = { ...result._doc, _id: args.taskInput.id };
                        console.log(args.taskInput._id);
                        pubsub.publish('TASK_UPDATED', {
                            taskUpdated: args.taskInput._id
                        });
                        return [2 /*return*/, result];
                    case 13:
                        err_6 = _a.sent();
                        throw err_6;
                    case 14: return [2 /*return*/];
                }
            });
        }); },
    },
    Subscription: {
        taskCreated: {
            subscribe: function () { return pubsub.asyncIterator('TASK_CREATED'); }
        },
        taskDeleted: {
            subscribe: function () { return pubsub.asyncIterator('TASK_DELETED'); }
        },
        taskUpdated: {
            subscribe: function () { return pubsub.asyncIterator('TASK_UPDATED'); }
        }
    }
};
