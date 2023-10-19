import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import { RedisDriver,RedisPresence} from "colyseus";
import basicAuth from "express-basic-auth";
import { RelayRoom } from "colyseus";

import { room_battle } from "./rooms/RoomBattle";
import { room_global } from "./rooms/RoomGlobal";

export default config({
    options:{
        presence: new RedisPresence(),
        driver: new RedisDriver(),
        publicAddress: process.env.DOMAIN + "/server-" + process.env.NODE_APP_INSTANCE
    },

    initializeGameServer: (gameServer) => {
        gameServer.define('room_battle', room_battle);
        gameServer.define('global_room',room_global);
    },

    initializeExpress: (app) => {
        app.get("/hello_world", (req, res) => {
            res.send("Colyseus Ready! Welcome to The Nexus Battles II.");
        });

        if (process.env.NODE_ENV !== "production") {
            app.use("/", playground);
        }
        
        const basicAuthMiddleware = basicAuth({
            users:{
                "TNB_ADMIN2023":"MonitorLog3212!!"
            },
            challenge:true
        });

        app.use("/colyseus", basicAuthMiddleware, monitor());
    }
});
