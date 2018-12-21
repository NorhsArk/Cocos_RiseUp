cc.Class({
    extends: cc.Component,

    properties: {
        adSprite: {
            default: null,
            type: cc.Sprite,
        },
        pic:{
            default:"",
        },
        game_id:{
            default:"",
        },
        hasAd:false,


    },

    onLoad () {
    },

    show () {
        // console.log("显示____")
        // this.node.active = true;
        this.node.setPosition(cc.v2(0,0));
    },

    setAd(pic,game_id){
        this.pic = pic;
        this.game_id = game_id;

        console.log("setAd:",this.pic,this.game_id);

        //加载图片，设置图片。
        var self = this;
        var remoteUrl = this.pic;
        console.log("remoteUrl:",remoteUrl)
        // cc.loader.load({url: remoteUrl, type: 'png'}, function (err, texture) {

        cc.loader.load(remoteUrl, function (err, texture) {
            console.log("err:",err)
            console.log("texture:",texture)
            // var winSize = cc.director.getWinSize();
            // var w = winSize.width - 50;
            self.adSprite.spriteFrame = new cc.SpriteFrame(texture);
            // self.adSprite.node.setContentSize(cc.size(w,w));
        });

        this.hasAd = true;
        // this.show();

    },

    onCloseBtnClicked(){
        // this.node.active = false;
        this.node.setPosition(cc.v2(1500,1500));
        SDK().reLoadOpAd();
        SDK().stat(2,this.game_id);
    },

    onPlayBtnClicked(){
        this.onCloseBtnClicked();
        SDK().switchGameAsync(this.game_id)
    },
});
