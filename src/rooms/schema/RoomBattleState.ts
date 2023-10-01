import { Schema, type, MapSchema,ArraySchema } from "@colyseus/schema";

export class Player extends Schema{
  @type("string") username: string;
  @type("string") sessionID: string;
}

export class RoomBattleState extends Schema {
  @type("number") currentTurn:number = 0;
  @type("number") localTurnStatus:number = 0;
  @type("number") matchReady:number = 0;
  @type("string") expectedUsers:string = "4";
  @type({map: Player}) clients = new MapSchema<Player>();
  @type(["string"]) turnos =  new ArraySchema<string>();
}
