"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.room_global = void 0;
const core_1 = require("@colyseus/core");
class room_global extends core_1.Room {
    onCreate(options) {
        this.maxClients = 30;
        //Private Message Update!
        this.onMessage(1, (client, message) => {
            this.broadcast(1, message, { except: client });
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.room_global = room_global;
