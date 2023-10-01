"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.room_battle = void 0;
const core_1 = require("@colyseus/core");
const RoomBattleState_1 = require("./schema/RoomBattleState");
class room_battle extends core_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 1;
    }
    onCreate(options) {
        this.setState(new RoomBattleState_1.RoomBattleState());
        this.setMetadata({
            ganacia: options.numero_creditos,
            nombre: options.nombre_sala
        });
        this.maxClients = options.numero_jugadores;
        this.state.expectedUsers = this.maxClients.toString();
        this.state.clients;
        //Lista -> idSession -> idSession
        //LocalTurn = 0 - 1 0 - 2  0 - 3
        this.onMessage("CardSync", (client, message) => {
            this.broadcast("CardSync", message, { except: client });
        });
        this.onMessage("ataque", (client, message) => {
        });
        this.onMessage("asdnad", (client, message) => {
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        let _player = new RoomBattleState_1.Player();
        _player.sessionID = client.sessionId;
        _player.username = "Player";
        this.state.clients.set(_player.sessionID, _player);
        this.state.turnos.push(_player.sessionID);
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
        this.state.clients.delete(client.sessionId);
        const _i = this.state.turnos.indexOf(client.sessionId);
        this.state.turnos.deleteAt(_i);
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.room_battle = room_battle;
