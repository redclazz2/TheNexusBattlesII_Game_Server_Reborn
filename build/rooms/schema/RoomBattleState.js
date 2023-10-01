"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomBattleState = exports.Player = void 0;
const schema_1 = require("@colyseus/schema");
class Player extends schema_1.Schema {
}
exports.Player = Player;
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "username", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "sessionID", void 0);
class RoomBattleState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.currentTurn = 1;
        this.expectedUsers = "4";
        this.clients = new schema_1.MapSchema();
        this.turnos = new schema_1.ArraySchema();
    }
}
exports.RoomBattleState = RoomBattleState;
__decorate([
    (0, schema_1.type)("number")
], RoomBattleState.prototype, "currentTurn", void 0);
__decorate([
    (0, schema_1.type)("string")
], RoomBattleState.prototype, "expectedUsers", void 0);
__decorate([
    (0, schema_1.type)({ map: Player })
], RoomBattleState.prototype, "clients", void 0);
__decorate([
    (0, schema_1.type)(["string"])
], RoomBattleState.prototype, "turnos", void 0);
