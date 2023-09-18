"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const colyseus_1 = require("colyseus");
const MyRoomState_1 = require("./schema/MyRoomState");
const schema_1 = require("@colyseus/schema");
class MyRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.topPlayer = "";
        this.bottomPlayer = "";
    }
    onCreate(options) {
        this.setState(new MyRoomState_1.MyRoomState());
        this.setSimulationInterval((deltaTime) => this.update(deltaTime));
        this.onMessage("onScoreChange", (client, data) => {
            console.log("Player Scored: ", data);
            this.broadcast("UpdatedScoreFromTheServer", data);
        });
        this.onMessage("strikerMoved", (client, data) => {
            let senderSpeedQueue = data.speedQueue;
            let newSpeedQueue = new schema_1.ArraySchema();
            if (client.sessionId === this.topPlayer) {
                console.log("changing topPlayer state>>>>>>>", data.positions.x / 10, data.positions.y / 10);
                this.state.playerTop.x = data.positions.x;
                this.state.playerTop.y = data.positions.y;
                senderSpeedQueue.forEach((point) => {
                    let vec2 = new MyRoomState_1.Vec2();
                    vec2.x = point.x;
                    vec2.y = point.y;
                    newSpeedQueue.push(vec2);
                });
                this.state.playerTop.speedQueue = newSpeedQueue;
            }
            else {
                console.log("changing bottomPlayer state>>>>>>>");
                this.state.playerBottom.x = data.positions.x;
                this.state.playerBottom.y = data.positions.y;
                senderSpeedQueue.forEach((point) => {
                    let vec2 = new MyRoomState_1.Vec2();
                    vec2.x = point.x;
                    vec2.y = point.y;
                    newSpeedQueue.push(vec2);
                });
                this.state.playerBottom.speedQueue = newSpeedQueue;
            }
        });
        this.onMessage("PuckState", (client, data) => {
            console.log("Puck Position Changing!", data);
            this.state.PuckState.client = client.sessionId;
            this.state.PuckState.x = data.position.x * 10;
            this.state.PuckState.y = data.position.y * 10;
            this.state.PuckState.angularVelocity = data.angularVelocity * 10;
            this.state.PuckState.velocityX = data.velocity.x * 10;
            this.state.PuckState.velocityY = data.velocity.y * 10;
        });
    }
    update(deltaTime) {
        // this.onMessage("PuckState", (client, data) => {
        //     console.log("Puck Position Changing!", data);
        //     this.state.PuckState.client = client.sessionId;
        //     this.state.PuckState.x = data.position.x * 10;
        //     this.state.PuckState.y = data.position.y * 10;
        //     this.state.PuckState.angularVelocity = data.angularVelocity * 10;
        //     this.state.PuckState.velocityX = data.velocity.x * 10;
        //     this.state.PuckState.velocityY = data.velocity.y * 10;
        // });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        if (!this.topPlayer.length) {
            this.topPlayer = client.sessionId;
            this.state.playerInfo.topPlayer = this.topPlayer;
        }
        else {
            this.bottomPlayer = client.sessionId;
            this.state.playerInfo.bottomPlayer = this.bottomPlayer;
            this.broadcast("AllPlayersHasJoined");
        }
        // this.broadcast("setPlayers", { topPlayerID: this.state.playerInfo.topPlayer, bottomPlayerID: this.state.playerInfo.bottomPlayer });
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.MyRoom = MyRoom;
