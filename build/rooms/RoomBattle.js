"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.room_battle = void 0;
const core_1 = require("@colyseus/core");
const RoomBattleState_1 = require("./schema/RoomBattleState");
class room_battle extends core_1.Room {
    constructor() {
        super(...arguments);
        this.currentMatchReadyNotices = 0;
        this.handleTurnTermination = () => {
        };
    }
    onCreate(options) {
        this.setState(new RoomBattleState_1.RoomBattleState());
        this.setMetadata({
            ganacia: options.numero_creditos,
            nombre: options.nombre_sala,
            equipos: options.equipos,
            maximo: options.numero_jugadores
        });
        this.state.clients;
        //Card Initial Sync
        this.onMessage(0, (client, message) => {
            this.broadcast(0, message, { except: client });
        });
        //Skip Turn
        this.onMessage(1, () => {
            this.handleTurnTermination();
        });
        //A client is ready to begin
        this.onMessage(2, () => {
            this.currentMatchReadyNotices++;
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        let _player = new RoomBattleState_1.Player();
        _player.sessionID = client.sessionId;
        _player.username = "Player";
        this.state.clients.set(_player.sessionID, _player);
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
        this.state.clients.delete(client.sessionId);
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.room_battle = room_battle;
