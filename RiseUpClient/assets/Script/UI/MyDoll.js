var GameView = require("../UI/GameView");
cc.Class({
    extends: cc.Component,

    properties: {
        gameView:GameView,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    onCollisionEnter: function (other, self){
        this.gameView.CollisionEnter(other, self);
    },

    onCollisionStay: function (other, self) {
        this.gameView.CollisionStay(other, self);
    },

    onCollisionExit: function (other, self) {
        this.gameView.CollisionExit(other, self);
    },

    // update (dt) {},
});
