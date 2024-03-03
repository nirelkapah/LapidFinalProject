"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//=====================import=====================//
// const express = require("express");
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
// const mongoose = require("mongoose");
// const { graphqlHTTP } = require("express-graphql");
// const config = require("./config.json");
var config = __importStar(require("./config.json"));
// const typeDefs = require("./graphql/schema/typeDefs");
var resolvers_1 = require("./graphql/resolvers/resolvers");
var typeDefs_1 = require("./graphql/schema/typeDefs");
// const resolvers = require("./graphql/resolvers/resolvers");
// const cors = require("cors");
var cors_1 = __importDefault(require("cors"));
// const { createServer } = require('http');
var http_1 = require("http");
var ApolloServer = require('apollo-server-express').ApolloServer;
// import { ApolloServer } from 'apollo-server-express';
var SubscriptionServer = require('subscriptions-transport-ws').SubscriptionServer;
// import { SubscriptionServer } from 'subscriptions-transport-ws';
// const { execute, subscribe } = require('graphql');
var graphql_1 = require("graphql");
// const { makeExecutableSchema } = require('@graphql-tools/schema');
var schema_1 = require("@graphql-tools/schema");
//===============================ON SERVER START =============================
var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    accessControlAllowOrigin: "*",
    accessControlAllowCredentials: true,
};
//===============================Graphql Data =============================//
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, schema, server, apolloServer, connectToDatabase, PORT;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = (0, express_1.default)();
                app.use((0, cors_1.default)(corsOptions));
                //Parse Incoming JSON
                app.use(express_1.default.json());
                schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs_1.typeDefs, resolvers: resolvers_1.resolvers });
                server = (0, http_1.createServer)(app);
                SubscriptionServer.create({
                    schema: schema,
                    execute: graphql_1.execute,
                    subscribe: graphql_1.subscribe,
                }, {
                    server: server,
                    path: '/graphql',
                });
                apolloServer = new ApolloServer({
                    schema: schema,
                    plugins: [
                        {
                            serverWillStart: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, {
                                                drainsServer: function () {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, SubscriptionServer.close()];
                                                                case 1:
                                                                    _a.sent();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    });
                                                }
                                            }];
                                    });
                                });
                            }
                        }
                    ]
                });
                return [4 /*yield*/, apolloServer.start()];
            case 1:
                _a.sent();
                apolloServer.applyMiddleware({ app: app });
                connectToDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, mongoose_1.default.connect("mongodb+srv://".concat(config.mongo.MONGO_USER, ":").concat(config.mongo.MONGO_PASSWORD, "@cluster0.pj7djsr.mongodb.net/").concat(config.mongo.MONGO_DB))];
                            case 1:
                                _a.sent();
                                console.log('Connected to MongoDB');
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                console.error('Error connecting to MongoDB:', error_1.message);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                // Call the connectToDatabase function to initiate the connection
                connectToDatabase();
                PORT = process.env.PORT || 3001;
                server.listen(PORT, function () { return console.log("Listening on " + PORT); });
                return [2 /*return*/];
        }
    });
}); })();
//===============================Connecting to DB =============================//
