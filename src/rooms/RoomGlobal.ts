import { Room, Client } from "@colyseus/core";

export class room_global extends Room {
  onCreate(options: any) {
    this.maxClients = 30;

    //Private Message Update!
    this.onMessage(1, (client, message) => {
      this.broadcast(1, message, { except: client });
    });
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}