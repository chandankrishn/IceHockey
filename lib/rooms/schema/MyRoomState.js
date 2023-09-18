"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoomState = exports.Vec2 = void 0;
const schema_1 = require("@colyseus/schema");
class playerInfo extends schema_1.Schema {
    constructor() {
        super();
        this.topPlayer = "";
        this.bottomPlayer = "";
    }
}
__decorate([
    (0, schema_1.type)("string")
], playerInfo.prototype, "topPlayer", void 0);
__decorate([
    (0, schema_1.type)("string")
], playerInfo.prototype, "bottomPlayer", void 0);
class Vec2 extends schema_1.Schema {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
    }
}
__decorate([
    (0, schema_1.type)("number")
], Vec2.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number")
], Vec2.prototype, "y", void 0);
exports.Vec2 = Vec2;
class PuckState extends schema_1.Schema {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.angularVelocity = 0;
        this.velocityX = 0;
        this.velocityY = 0;
    }
}
__decorate([
    (0, schema_1.type)("string")
], PuckState.prototype, "client", void 0);
__decorate([
    (0, schema_1.type)("number")
], PuckState.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number")
], PuckState.prototype, "y", void 0);
__decorate([
    (0, schema_1.type)("number")
], PuckState.prototype, "angularVelocity", void 0);
__decorate([
    (0, schema_1.type)("number")
], PuckState.prototype, "velocityX", void 0);
__decorate([
    (0, schema_1.type)("number")
], PuckState.prototype, "velocityY", void 0);
class playerTop extends schema_1.Schema {
    constructor() {
        super();
        this.x = 0;
        this.y = 377;
        this.speedQueue = new schema_1.ArraySchema();
        for (let i = 0; i < 5; i++) {
            this.speedQueue.push(new Vec2());
        }
    }
}
__decorate([
    (0, schema_1.type)("number")
], playerTop.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number")
], playerTop.prototype, "y", void 0);
__decorate([
    (0, schema_1.type)([Vec2])
], playerTop.prototype, "speedQueue", void 0);
class playerBottom extends schema_1.Schema {
    constructor() {
        super();
        this.x = 0;
        this.y = -377;
        this.speedQueue = new schema_1.ArraySchema();
        for (let i = 0; i < 5; i++) {
            this.speedQueue.push(new Vec2());
        }
    }
}
__decorate([
    (0, schema_1.type)("number")
], playerBottom.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number")
], playerBottom.prototype, "y", void 0);
__decorate([
    (0, schema_1.type)([Vec2])
], playerBottom.prototype, "speedQueue", void 0);
class MyRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        // @type({map: playerStriker}) players = new MapSchema<playerStriker>();
        this.PuckState = new PuckState();
        this.playerInfo = new playerInfo();
        this.playerTop = new playerTop();
        this.playerBottom = new playerBottom();
    }
}
__decorate([
    (0, schema_1.type)(PuckState)
], MyRoomState.prototype, "PuckState", void 0);
__decorate([
    (0, schema_1.type)(playerInfo)
], MyRoomState.prototype, "playerInfo", void 0);
__decorate([
    (0, schema_1.type)(playerTop)
], MyRoomState.prototype, "playerTop", void 0);
__decorate([
    (0, schema_1.type)(playerBottom)
], MyRoomState.prototype, "playerBottom", void 0);
exports.MyRoomState = MyRoomState;
