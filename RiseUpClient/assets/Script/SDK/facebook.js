var Utils = require("../Utils/Utils");
var SDK_AD = require("./script/sdk_ad");
var GAME_CHECK_URL = "https://haiwai.31home.com:8003/games.detail";
var GAME_RECOMMEND_URL = "https://haiwai.31home.com:8003/games.recommend";
var GAME_STAT_URL = "https://haiwai.31home.com:8003/games.stat";

var ELoadState = {
    AD_LOADING          : "AD_LOADING",
    AD_LOAD_SUCCESS     : "AD_LOAD_SUCCESS",
    AD_LOAD_FAIL        : "AD_LOAD_FAIL",
    AD_COMPLETE         : "AD_COMPLETE"
};

var GM_PIDS = [1609486632505587,1759127554126047];
var video_ad_ids = '1858947080793267_1858949390793036';
var interstitial_ad_ids = '1858947080793267_1858948357459806';
var game_id = "1858947080793267";


var interstitialCount = 2;
var videoOn = 1;
var interstitialOn = 1;
var interstitialOp = 0;

var FB_SDK = function() {
    this.cb = null;
    this.videoAd = null;
    this.videoAdState = null;
    this.InterstitialAd = null;
    this.InterstitialAdState = null;

    this.sdk_ad = null;
};

FB_SDK.prototype.getGameId = function() {
    return game_id;
};

FB_SDK.prototype.openVideoAd = function() {
    return videoOn >= 1;
};

FB_SDK.prototype.openinterstitialAd = function() {
    return interstitialOn >= 1;
};

FB_SDK.prototype.getInterstitialCount = function() {
    console.log("__interstitialCount",interstitialCount)
    return interstitialCount;
};

//是否显示互推广告
FB_SDK.prototype.isPlayOpAD = function() {
    var test = cc.random0To1() * 10;
    if (test <= interstitialOp) {
        return true;
    }else{
        return false;
    }
};


FB_SDK.prototype.setUp = function(video_on,interstitial_on,interstitial_count,interstitial_op) {
    console.log("setUp__interstitialCount",interstitial_count)
    console.log("interstitialCount",interstitialCount)
    interstitialCount = interstitial_count;
    videoOn = video_on;
    interstitialOn = interstitial_on;
    interstitialOp = interstitial_op;

    // console.log("interstitialCount:",interstitialCount);
    if(interstitialOn >= 1 && interstitialOp >= 1){
        

        //获取
        var sdkADNode = cc.find("Canvas/sdk_ad");
        if(sdkADNode != null){
            this.sdk_ad = sdkADNode.getComponent(SDK_AD);
        }

        //加载互推广告
        this.reLoadOpAd();
    }
};

FB_SDK.prototype.switchGameAsync = function(game_id) {
    if (typeof FBInstant === 'undefined') return false;
    FBInstant.switchGameAsync(game_id).catch(function (e) {
          // Handle game change failure
    });
};

FB_SDK.prototype.reLoadOpAd = function() {
    cc.log("reLoadOpAd:")
    if(this.sdk_ad != null && interstitialOn >= 1 && interstitialOp >= 1){
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200)) {
                var response = JSON.parse(xhr.responseText);
                console.log("______________response",response);
                var code = response.code;
                if(code != 500){
                    // cb(true,response);

                    var data = response.data.rows[0];
                    if(data != null){
                        var pic = data.pic3;
                        var gid = data.game_id;
                        self.sdk_ad.setAd(pic,gid);
                    }
                }
            }
        };

        xhr.open("GET", GAME_RECOMMEND_URL + "?game_id="+game_id +"&amount=1",true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(); 

        console.log(GAME_RECOMMEND_URL + "?game_id="+game_id +"&amount=1")
    }
};

/**
    初始化AD等
*/
FB_SDK.prototype.init = function() {

    this.initOP();
    if (typeof FBInstant === 'undefined') return;
    // console.log("playerID",FBInstant.player.getID());

    this.loadVideoAd();
    this.loadInterstitialAd();

    var locale = FBInstant.getLocale(); // 'en_US'
    if(locale == 'zh_CN'){
        const i18n = require('LanguageData');
        i18n.init('en');
    }
};

FB_SDK.prototype.initOP = function() {

    //从服务器加载初始化数据
        // cc.log("[gameCheck]" + GAME_CHECK_URL);
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200)) {
            var response = JSON.parse(xhr.responseText);
            console.log("response",response);
            var code = response.code;
            if(code != 500){
                // cb(true,response);

                var data = response.data;

                var interstitial_op = data.interstitial_op;     //每10局显示几次互推
                var interstitial_count = data.interstitial_count;  //每多少局显示一次插屏广告
                var video_on = data.video_on;    //是否显示视频广告
                var interstitial_on = data.interstitial_on;   //是否显示插屏广告
                self.setUp(video_on,interstitial_on,interstitial_count,interstitial_op);
            }
        }
    };

    xhr.open("GET", GAME_CHECK_URL + "?game_id="+SDK().getGameId(),true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(); 
};

FB_SDK.prototype.isGM = function() {
    if (typeof FBInstant === 'undefined') return false;

    var playerID = FBInstant.player.getID();
    // console.log("Utils.inArray(playerID,GM_PIDS):",Utils.inArray(playerID,GM_PIDS))
    return Utils.inArray(playerID,GM_PIDS);
};

FB_SDK.prototype.clearData = function() {
    if (typeof FBInstant === 'undefined') return false;

    SDK().setScore({all:0},null);
    SDK().setScore({my_help:0},null);
    var bid = 1;
    for(var mid = 1;mid <=6;mid++){
        for(var lid = 1;lid <= 100;lid++){
            var param = {};
            param[bid+"_"+mid+"_"+lid] = 0;    
            this.setScore(param,null);

            var param1 = {};
            param1[bid+"_"+mid+"_"+lid+"_moves"] = 0;
            this.setScore(param1,null);
        }

        var param2 = {};
        param2[bid+"_"+mid] = 0;    
        this.setScore(param2,null);

        var param3 = {};
        param3["unlock_"+bid+"_"+mid] = 0;
        SDK().setScore(param3,null);
    }
};

FB_SDK.prototype.getLocale = function() {
    if (typeof FBInstant === 'undefined') return;

    return FBInstant.getLocale();
};

FB_SDK.prototype.share = function(score,cb) {
    if (typeof FBInstant === 'undefined'){
        if(cb!=null){
            cb(true);    
        }
        return;
    } 
    var self = this;

    FBInstant.context
    .chooseAsync()
    .then(function() {
            // console.log("FBInstant.context.getID():",FBInstant.context.getID());
            self.doShare(score);
            if(cb!=null){
                cb(true);    
            }
        }
    ).catch(function(e) {
        // console.log("catch",e);
        if(e.code != null && e.code == "SAME_CONTEXT"){
            //相同的用户或group，不能再次发消息
            if(cb!=null){
                cb(false);    
            }
        }
    });
};

FB_SDK.prototype.doShare = function(score) {
    var self = this;
    var en_text = self.getName() + " finish "+score+" missions,Can you beat me?";
    var cn_text = self.getName() + "向你发起挑战！他已经到了 "+score+" 层！";
    // console.log("share:"+en_text);

    var framePath = "Texture2d/game_icon";
    // console.log("framePath:",framePath)
    cc.loader.loadRes(framePath, cc.Texture2D, function (err, texture) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 420;

        let image = texture.getHtmlElementObj();
        ctx.drawImage(image, 0, 0);

        var base64Picture = canvas.toDataURL('image/png');

        FBInstant.updateAsync({
          action: 'CUSTOM',
          cta: 'Play Game',
          template:'join_fight',
          image: base64Picture,
          text: en_text,
          data: { myReplayData: '...' },
          strategy: 'IMMEDIATE',
          notification: 'NO_PUSH',
        }).then(function() {
          //当消息发送后
          // console.log("____当消息发送后")
        });
    });
};


FB_SDK.prototype.loadInterstitialAd = function() {
    if (typeof FBInstant === 'undefined') return;
    if(!this.openinterstitialAd()){
        return;
    }

    // console.log("loadInterstitialAd")
    FBInstant.getInterstitialAdAsync(
        interstitial_ad_ids,
    ).then(function(interstitial) {
        // console.log("FBInstant.getInterstitialAdAsync:",interstitial);
        this.InterstitialAd = interstitial;
        this.InterstitialAdState = ELoadState.AD_LOADING;
        return this.InterstitialAd.loadAsync();
    }.bind(this)).catch(function(e) {
            // console.log("load.showInterstitialAd catch");
            // console.log(JSON.stringify(e));
        }.bind(this))
    .then(function(){
        // console.log("FBInstant.getInterstitialAdAsync done:");
        this.InterstitialAdState = ELoadState.AD_LOAD_SUCCESS;
    }.bind(this));
};

//统计显示、点击次数
FB_SDK.prototype.stat = function(type,gid) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200)) {
            var response = JSON.parse(xhr.responseText);
            // console.log("______________response",response);
        }
    };

    xhr.open("GET", GAME_STAT_URL + "?game_id="+gid +"&type="+type,true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(); 
};

FB_SDK.prototype.showInterstitialAd = function(cb) {
    if (typeof FBInstant === 'undefined'){
        if(cb){
            cb(false);
        }
        return;
    };

    // console.log("FB_SDK.prototype.showInterstitialAd",this.InterstitialAd);
    // console.log("this.sdk_ad",this.sdk_ad);

    if(interstitialOn < 1){
        return;
    }

    if((this.sdk_ad != null && interstitialOp >= 1 && Utils.GetRandomNum(1,10)<=interstitialOp) || this.InterstitialAd == null){
    // if(this.sdk_ad != null){
        this.sdk_ad.show();

        this.stat(1,this.sdk_ad.game_id);

        // console.log("this.sdk_ad.show()");
    }else if(this.InterstitialAd != null){
        // console.log("show Interstitial ad start");
        this.InterstitialAd.showAsync().then(function() {
            // console.log("this.showInterstitialAd.showAsync");
            this.InterstitialAdState = ELoadState.AD_COMPLETE;
            // this.game.paused = false;
            // window.sounds.toggleMusic(false);
            if (cb) {
                cb(true);
            }

            // console.log("show showInterstitialAd success");
            this.loadInterstitialAd();
        }.bind(this))
        .catch(function(e) {
            // console.log("this.showInterstitialAd catch");
            this.InterstitialAdState = ELoadState.AD_COMPLETE;
            // this.game.paused = false;
            // window.sounds.toggleMusic(false);
            // console.log(JSON.stringify(e));
            if (cb) {
                cb(false);
            }
        }.bind(this));
    }else{
        // console.log("show showInterstitialAd ad Stop");
        if (cb) {
            cb(false);
        }
        this.loadInterstitialAd();
    }
};

FB_SDK.prototype.loadVideoAd = function() {
    if (typeof FBInstant === 'undefined') return;

    if(!this.openVideoAd()){
        return;
    }
    // console.log("FB_SDK.prototype.loadVideoAd");
    FBInstant.getRewardedVideoAsync(
        video_ad_ids,
    ).then(function(rewardedVideo) {
        this.videoAd = rewardedVideo;
        this.videoAdState = ELoadState.AD_LOADING;
        return this.videoAd.loadAsync();
    }.bind(this)).then(function(){
        this.videoAdState = ELoadState.AD_LOAD_SUCCESS;
    }.bind(this));
};

FB_SDK.prototype.hasVideoAd = function() {
    if (typeof FBInstant === 'undefined'){
        return false;
    };

    return this.videoAd != null;
};

FB_SDK.prototype.showVideoAd = function(cb) {
    if (typeof FBInstant === 'undefined'){
        if(cb){
            cb(true);
        }
        return;
    };

    // console.log("FB_SDK.prototype.showVideoAd",this.videoAd);

    if(this.videoAd != null){
        // console.log("show video ad start");
        this.videoAd.showAsync().then(function() {
            // console.log("this.videoAd.showAsync");
            this.videoAdState = ELoadState.AD_COMPLETE;
            // this.game.paused = false;
            // window.sounds.toggleMusic(false);
            if (cb) {
                cb(true);
            }

            // console.log("show video ad success");
            this.loadVideoAd();
        }.bind(this))
        .catch(function(e) {
            // console.log("this.videoAd catch");
            this.videoAdState = ELoadState.AD_COMPLETE;
            // this.game.paused = false;
            // window.sounds.toggleMusic(false);
            // console.log(JSON.stringify(e));
            if (cb) {
                cb(false);
            }
            this.loadVideoAd();
        }.bind(this));
    }else{
        // console.log("show video ad Stop");
        if (cb) {
            cb(false);
        }
        this.loadVideoAd();
    }
};

FB_SDK.prototype.getName = function() {
    if (typeof FBInstant === 'undefined') return "undefined";
    return FBInstant.player.getName();
};

FB_SDK.prototype.getItem = function(key,cb) {
    if (typeof FBInstant === 'undefined') {
        var score = JSON.parse(cc.sys.localStorage.getItem(key));
        if (typeof score === 'undefined' || score == null) {
            score = 0;
        }
        cb(score,key);
    }else{
        var score = 0;
        FBInstant.player
            .getDataAsync([''+key])
            .then(function(data) {
                //console.log('data is loaded',key,data[key]);
                if (typeof data[key] === 'undefined') {
                    score = 0;
                    //console.log(key+"+null")
                }else{
                    score = data[key];
                }
                cb(score,key);
        });    
    }
};

FB_SDK.prototype.setItem = function(score,cb) {
    if (typeof FBInstant === 'undefined') {
        for(var p in score){//遍历json对象的每个key/value对,p为key
            // cc.log("setScore:"+ p + "_" + score[p]);
            cc.sys.localStorage.setItem(p, score[p]);
        }
        // 
        if(cb != null){
            cb();
        }
    }else{
        FBInstant.player
            .setDataAsync(score)
        .then(function() {
            if(cb != null){
                cb();
            }
            // console.log('------------data is set',score);
        });
    }
};

module.exports = (function() {
    var instance;
    return function() {
        if (!instance) {
            instance = new FB_SDK();
        }
        return instance;
    }
})();


