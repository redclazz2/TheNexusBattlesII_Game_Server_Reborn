"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = __importDefault(require("@colyseus/tools"));
const monitor_1 = require("@colyseus/monitor");
const playground_1 = require("@colyseus/playground");
const colyseus_1 = require("colyseus");
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const RoomBattle_1 = require("./rooms/RoomBattle");
exports.default = (0, tools_1.default)({
    options: {
        presence: new colyseus_1.RedisPresence(),
        driver: new colyseus_1.RedisDriver(),
        publicAddress: process.env.DOMAIN + "/server-" + process.env.NODE_APP_INSTANCE
    },
    initializeGameServer: (gameServer) => {
        gameServer.define('room_battle', RoomBattle_1.room_battle);
    },
    initializeExpress: (app) => {
        app.get("/hello_world", (req, res) => {
            res.send("Colyseus Ready! Welcome to The Nexus Battles II.");
        });
        if (process.env.NODE_ENV !== "production") {
            app.use("/", playground_1.playground);
        }
        const basicAuthMiddleware = (0, express_basic_auth_1.default)({
            users: {
                "TNB_ADMIN2023": "MonitorLog3212!!"
            },
            challenge: true
        });
        app.use("/colyseus", basicAuthMiddleware, (0, monitor_1.monitor)());
    }
});
