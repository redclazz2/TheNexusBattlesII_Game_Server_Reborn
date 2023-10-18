import { Schema, type, MapSchema} from "@colyseus/schema";

export class Player extends Schema{
  @type("string") username: string;
  @type("string") sessionID: string;
  @type("number") team: number; 
}

export class RoomBattleState extends Schema {
  @type({map: Player}) clients = new MapSchema<Player>();
}