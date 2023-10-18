import { Room, Client } from "@colyseus/core";
import { RoomBattleState, Player } from "./schema/RoomBattleState";
import { PriorityQueue } from "scl"

enum ColyseusMessagesTypes{
  RoomHasReachedPlayerMax = 0,
}

export class room_battle extends Room<RoomBattleState> {
  clientOrder:PriorityQueue<string> = new PriorityQueue<string>({
    capacity: 5,
    compare: (a,b) => a.length * Math.ceil(Math.random() * (10 - 1) + 1) <  b.length * Math.ceil(Math.random() * (10 - 1) + 1)
  });
  equipos:boolean;
  
  onCreate (options: any) {
    this.setState(new RoomBattleState());
    
    this.setMetadata({
      ganacia: options.numero_creditos,
      nombre: options.nombre_sala,
      equipos: options.equipos,
      maximo: options.numero_jugadores
    })
    this.maxClients = options.numero_jugadores;
    this.equipos = options.equipos;
    this.state.clients;

    //Private Message Update!
    this.onMessage(1,(client,message)=>{
      this.broadcast(1, message, { except: client });
    });

    //A client is ready to begin
    this.onMessage(2,(client)=>{
      this.clientOrder.add(client.sessionId);

      if(this.clientOrder.size == this.maxClients){
        for(let i = this.clientOrder.size; i > 0; i --){
          this.clients.getById(this.clientOrder.pop()).send(3,{turn:i});
        }
      }
    })

    this.onMessage(4,()=>{
      this.broadcast(4);
    });

    this.onMessage(5,(client,message)=>{
      this.broadcast(5,{
        remoteID:client.sessionId,
        cardID:message.cardID
      },{except:client});
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    let _player = new Player();
    _player.sessionID = client.sessionId;
    _player.username = options.username;
    _player.team = this.equipos ?  (this.state.clients.size < 2 ? 1 : 2 ): -1;

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