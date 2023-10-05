import { Room, Client } from "@colyseus/core";
import { RoomBattleState, Player } from "./schema/RoomBattleState";

enum ColyseusMessagesTypes{
  RoomHasReachedPlayerMax = 0,
}

export class room_battle extends Room<RoomBattleState> {
  currentMatchReadyNotices:number = 0;

  onCreate (options: any) {
    this.setState(new RoomBattleState());
    
    this.setMetadata({
      ganacia: options.numero_creditos,
      nombre: options.nombre_sala,
      equipos: options.equipos,
      maximo: options.numero_jugadores
    })
    this.maxClients = options.numero_jugadores;
    this.state.clients;

    //Private Message Update!
    this.onMessage(1,(client,message)=>{
      this.broadcast(1, message, { except: client });
    });

    //A client is ready to begin
    this.onMessage(2,()=>{
      this.currentMatchReadyNotices ++;
    })
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    let _player = new Player();
    _player.sessionID = client.sessionId;
    _player.username = "Player";
    this.state.clients.set(_player.sessionID,_player);
    
    if(this.state.clients.size == this.maxClients){
      this.broadcast(ColyseusMessagesTypes.RoomHasReachedPlayerMax);
    }
  }
  
  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.state.clients.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  handleTurnTermination = ():void =>{}
}