"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.room_battle = void 0;
const core_1 = require("@colyseus/core");
const RoomBattleState_1 = require("./schema/RoomBattleState");
const scl_1 = require("scl");
var ColyseusMessagesTypes;
(function (ColyseusMessagesTypes) {
    ColyseusMessagesTypes[ColyseusMessagesTypes["RoomHasReachedPlayerMax"] = 0] = "RoomHasReachedPlayerMax";
})(ColyseusMessagesTypes || (ColyseusMessagesTypes = {}));
class room_battle extends core_1.Room {
    constructor() {
        super(...arguments);
        this.clientOrder = new scl_1.PriorityQueue({
            capacity: 5,
            compare: (a, b) => a.length * Math.ceil(Math.random() * (10 - 1) + 1) < b.length * Math.ceil(Math.random() * (10 - 1) + 1)
        });
        this.handleTurnTermination = () => { };
    }
    onCreate(options) {
        this.setState(new RoomBattleState_1.RoomBattleState());
        this.setMetadata({
            ganacia: options.numero_creditos,
            nombre: options.nombre_sala,
            equipos: options.equipos,
            maximo: options.numero_jugadores
        });
        this.maxClients = options.numero_jugadores;
        this.equipos = options.equipos;
        this.state.clients;
        //Private Message Update!
        this.onMessage(1, (client, message) => {
            this.broadcast(1, message, { except: client });
        });
        //A client is ready to begin
        this.onMessage(2, (client) => {
            this.clientOrder.add(client.sessionId);
            if (this.clientOrder.size == this.maxClients) {
                for (let i = this.clientOrder.size; i > 0; i--) {
                    this.clients.getById(this.clientOrder.pop()).send(3, { turn: i });
                }
            }
        });
        this.onMessage(4, () => {
            this.broadcast(4);
        });
        this.onMessage(5, (client, message) => {
            this.broadcast(5, {
                remoteID: client.sessionId,
                cardID: message.cardID
            }, { except: client });
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        let _player = new RoomBattleState_1.Player();
        _player.sessionID = client.sessionId;
        _player.username = options.username;
        _player.team = this.equipos ? (this.state.clients.size < 2 ? 1 : 2) : -1;
        this.state.clients.set(_player.sessionID, _player);
        if (this.state.clients.size == this.maxClients) {
            this.broadcast(ColyseusMessagesTypes.RoomHasReachedPlayerMax);
        }
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
