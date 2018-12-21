var GameView = require("../UI/GameView");
var SoundManager = require("../GameLogic/SoundManager");


cc.Class({
    extends: cc.Component,

    properties: {
        soundManager:{
            default:null,
            type:SoundManager,
        },
        
        gameView:GameView,
        beginView:{
            default: null,
            type:cc.Node,
        },
        modelView:{
            default: null,
            type:cc.Node,
        },
        dollsView:{
            default: null,
            type:cc.Node,
        },
        shareHeartView:{
            default: null,
            type:cc.Node,
        },
        heartView:{
            default: null,
            type:cc.Node,
        },
        diamondView:{
            default: null,
            type:cc.Node,
        },
        overView:{
            default: null,
            type:cc.Node,
        },
        reviveView:{
            default: null,
            type:cc.Node,
        },
        fbFailView:{
            default: null,
            type:cc.Node,
        },
        uiSpriteView:{
            default: null,
            type:cc.Node,
        },
        isQuit:false,
        timestamp:{
            default: 0,
            type: cc.Integer,
        },
        manualDisconnect:false,

    },

    //update(){},

    onLoad () {
        SDK().init();
        this.soundManager.playBg();
        this.gameView.gameApplication = this;
        this.gameView.viewManager.showView(this.beginView,0.3,true,null);
        var online = false;
    },

    
});
