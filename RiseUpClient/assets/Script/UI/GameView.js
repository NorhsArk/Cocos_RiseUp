import { SSL_OP_COOKIE_EXCHANGE } from "constants";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var SpaceHeight = 130;
var RewardInterval = 12;
var WallWidth = 10;
var normalCost = 1;
var flashCost = 1;
var moveVal = 300;
var flashVal = 130;
var dollsCost = [0, 50, 150, 250, 800, 1000];
var curListIdx = 0;
var ViewManager = require("../GameLogic/ViewManager");
var SpriteAnimation = require("../UI/SpriteAnimation");
var UnLockNeed = [0, 200, 300, 400, 500, 600];
var CurUnlockIdx = 100;
var yellowText = ["Speed Up!", "Go Go Go ~", "Hurry Jump!!", "Perfect!", "Nice~", "Well Done!!", "Good Job!~", "WOW!!!"];
cc.Class({
    extends: cc.Component,

    properties: {
        gameApplication: null,
        viewManager: ViewManager,
        unLockProgress: {
            default: null,
            type: cc.ProgressBar,
        },
        reviveTime: {
            default: null,
            type: cc.Label,
        },
        yellowLable: {
            default: null,
            type: cc.Label,
        },
        bg0: {
            default: null,
            type: cc.Sprite,
        },
        bg1: {
            default: null,
            type: cc.Sprite,
        },
        bg2: {
            default: null,
            type: cc.Sprite,
        },
        muteBtn: {
            default: null,
            type: cc.Sprite,
        },
        dollsName: {
            default: null,
            type: cc.Sprite,
        },
        dollsMain: {
            default: null,
            type: cc.Node,
        },
        myDoll: {
            default: null,
            type: cc.Node,
        },
        myDollAnim: {
            default: null,
            type: SpriteAnimation,
        },
        floor: {
            default: null,
            type: cc.Node,
        },
        curFloorBottom: {
            default: null,
            type: cc.Node,
            visible: false,
        },
        rewardNodes: {
            default: null,
            type: cc.Node,
            visible: false,
        },
        myUnLockModel: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        bgStatus: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        gameModel: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        myStatus: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        status: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        myCell: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        myDollIdx: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        shopDollIdx: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        showBuyCount: {
            default: 0,
            type: cc.Float,
            visible: false,
        },
        curWidth: {
            default: 500,
            type: cc.Float,
            visible: false,
        },
        isRevived: {
            default: false,
            visible: false,
        },
        isReviveCount: {
            default: false,
            visible: false,
        },
        lastPosY: {
            default: 9,
            type: cc.Float,
            visible: false,
        },
        isBack: {
            default: false,
            visible: false,
        },
        playerDetail: {//0-体力 1-最高分数 2-钻石 3-玩偶列表 4-闪电模式解锁 5-累计楼层 6-本次获得的体力 7-本局获得的钻石
            default: [],
            visible: false,
        },
        topBars: {//0-体力 1-最高分数 2-钻石
            default: [],
            type: [cc.Node],
        },
        topNums: {//0-体力 1-最高分数 2-钻石 3-分数
            default: [],
            type: [cc.Label],
        },
        fbFailTitel: {//0-视频 1-分享
            default: [],
            type: [cc.Node],
        },
        dollsPick: {//商店界面的玩偶列表
            default: [],
            type: [cc.Node],
        },
        dollsBtns: {//0-锁定 1-可购买 2-开始  3-价格 4-分享
            default: [],
            type: [cc.Node],
        },
        overNums: {//0-分数 1-最高分数 2-所达到的等级 3-该等级需要的累积楼层 4-得到的体力个数 5-得到的钻石个数 6-进度条内的进度显示
            default: [],
            type: [cc.Label],
        },
        doubleUpStyleBtn: {//0-分享按钮 1-看视频按钮  2-体力位置 3-钻石位置 4-结束界面的开始按钮 5-不同模式按钮 6-闪电模式按钮
            default: [],
            type: [cc.Node],
        },
        rewardDoubleObj: {//0-体力 1-钻石 2-开始游戏的体力
            default: [],
            type: [cc.Node],
            visible: false,
        },
        //模式选择界面
        unLockSprite: {//0-cost 1-goBtn 
            default: [],
            type: [cc.Node],
        },
        LockSprite: {//0-vidioText 1-unLockBtn 
            default: [],
            type: [cc.Node],
        },
        floorNodes: {//用于储存地图
            default: [],
            visible: false,
        },
        vidioBtn: {
            default: [],
            type: [cc.Node],
        },
        mapLimit: {
            default: [],
            type: [cc.Integer],
        },
        floorFrame: {
            default: null,
            type: cc.SpriteFrame,
        },
        callBack: {
            default: null,
            visible: false,
        },
        beginAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        },
        dollsAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        },
        gameAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        },
        commonAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        },
        gameAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        },
        floor_prefab: {
            default: null,
            type: cc.Prefab,
        },
        _playTimes: {
            default: 0,
            type: cc.Integer,
        },
        playTimes: {
            get: function () {
                return this._playTimes;
            },
            set: function (val) {

                this._playTimes = val;
                // console.log("SDK().getInterstitialCount:",SDK().getInterstitialCount())
                if ((this._playTimes % SDK().getInterstitialCount() == 0 && this._playTimes >= SDK().getInterstitialCount()) || SDK().getInterstitialCount() <= 1) {
                    console.log("播放插屏广告");
                    SDK().showInterstitialAd(function (isCompleted) {
                        console.log("播放Done");
                    });
                }
            },
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.shopDollIdx = 0;
        this.myDollIdx = 0;
        for (var i = 0; i < 8; i = i + 1) {
            switch (i) {
                case 0://体力值
                case 1://最高分数
                case 2: {//钻石值
                    SDK().getItem(i, function (val, key) {
                        this.playerDetail[key] = parseInt(val);
                        this.topNums[key].string = parseInt(val);
                    }.bind(this));
                } break;
                case 3: {//解锁角色列表
                    SDK().getItem(i, function (val, key) {
                        if (val == 0 || val == null) {
                            val = "200001"
                        } else {
                            val = "" + val;
                        }
                        this.playerDetail[key] = [];
                        for (var j = 0; j < this.dollsPick.length; j = j + 1) {
                            this.playerDetail[key][j] = isNaN(parseInt(val.charAt(j))) ? 0 : parseInt(val.charAt(j))
                            if (this.playerDetail[key][j] == 0) {
                                if (j <= CurUnlockIdx) {
                                    CurUnlockIdx = j;
                                }
                                this.dollsPick[j].color = cc.color(0, 0, 0, 255);
                            } else {
                                this.dollsPick[j].color = cc.color(255, 255, 255, 255);
                            }
                            if (j == 0) {
                                this.dollsPick[j].color = cc.color(255, 255, 255, 255);
                                this.playerDetail[key][j] = 2;
                            }
                        }
                    }.bind(this));
                } break;
                case 4: {//是否解锁闪电模式
                    SDK().getItem(i, function (val, key) {
                        this.myUnLockModel = parseInt(val);
                        if (this.myUnLockModel == 0) {
                            this.unLockSprite[0].active = false;
                            this.unLockSprite[1].active = false;
                            this.LockSprite[0].active = true;
                            this.LockSprite[1].active = true;
                        } else if (this.myUnLockModel == 1) {
                            this.unLockSprite[0].active = true;
                            this.unLockSprite[1].active = true;
                            this.LockSprite[0].active = false;
                            this.LockSprite[1].active = false;
                        }
                    }.bind(this));
                } break;
                case 5: {//累计楼层
                    SDK().getItem(i, function (val, key) {
                        this.playerDetail[key] = parseInt(val);
                    }.bind(this));
                } break;

                case 7: {//第一次玩
                    SDK().getItem(i, function (val, key) {
                        if (val == 0 || null == val) {
                            this.playerDetail[0] = this.playerDetail[0] + 15;
                            this.topNums[0].string = this.playerDetail[0];
                            SDK().setItem({ 0: this.playerDetail[0] });
                            SDK().setItem({ 7: 1 });
                        }
                    }.bind(this));
                }
            }
        }
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.onMouseDown(event);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.onMouseMove(event);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.onMouseUp(event);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            this.onMouseUp(event);
        }, this);
    },

    /**
         * 当屏幕点击
        */
    onMouseDown(event) {
        this.isTouching = true;
        this.clickTime = 0;
        this.touchPos = event.getLocation();
        if (this.touchPos.y > 350 && this.touchPos.y < 850) {
            this.isSelect = true;
        }
    },

    onMouseMove(event) {
        if (this.isTouching) {
            if (this.gameApplication.dollsView.active) {
                if (this.isSelect) {
                    var val = event.currentTouch._point.x - this.touchPos.x;
                    this.dollsMain.x = this.dollsMain.x + val;
                    this.touchPos = event.getLocation();
                    for (var i = 0; i < this.dollsPick.length; i = i + 1) {
                        var dis = this.dollsPick[i].x - Math.abs(this.dollsMain.x);
                        if (dis <= 300 && dis >= 0) {
                            this.dollsPick[i].scale = cc.v2(0.8 + 0.2 * (300 - dis) / 300, 0.8 + 0.2 * (300 - dis) / 300);
                        } else {
                            this.dollsPick[i].scale = cc.v2(0.8, 0.8);
                        }
                    }
                }
            }
        }
    },

    onMouseUp(event) {
        this.isTouching = false;
        if (this.gameApplication.dollsView.active) {
            this.dTypeChange();
        }
        //点击
        if (this.clickTime < 0.5) {
            //main Logic
            if (this.status == 1) {
                this.JumpAction(this.myDoll);
            }
        }
    },


    dTypeChange() {
        var posX = -(this.dollsMain.x + 1) / 300;
        var posAdd = -(this.dollsMain.x + 1) % 300;
        var idx = (Math.ceil(posX) + (posAdd > 150 ? 0 : -1));
        if (this.dollsMain.x >= 0) {
            this.dollsMain.x = 0;
            idx = 0;
        } else if (this.dollsMain.x < (this.dollsPick.length - 1) * -300) {
            this.dollsMain.x = (this.dollsPick.length - 1) * - 300;
            idx = (this.dollsPick.length - 1);
        } else {
            this.dollsMain.x = idx * - 300;
        }
        this.shopDollIdx = idx;
        switch (this.playerDetail[3][idx]) {
            case 0: {
                this.dollsBtns[0].active = true;//锁定按钮
                this.dollsBtns[1].active = false;//购买按钮
                this.dollsBtns[2].active = false;//开始按钮
                this.dollsBtns[4].active = false;//分享按钮
                this.dollsName.spriteFrame = this.beginAtlas.getSpriteFrame("lockName");
            } break;
            case 1: {
                this.dollsBtns[0].active = false;
                if (idx == 5) {
                    this.dollsBtns[1].active = false;
                    this.dollsBtns[4].active = true;//分享按钮显示，分享获得一个
                } else {
                    this.dollsBtns[1].active = true;
                    this.dollsBtns[4].active = false;//分享按钮显示，分享获得一个
                }
                this.dollsBtns[2].active = false;
                this.dollsBtns[3].getComponent(cc.Label).string = dollsCost[idx];
                this.dollsName.spriteFrame = this.beginAtlas.getSpriteFrame(this.shopDollIdx + "Name");
            } break;
            case 2: {
                this.dollsBtns[0].active = false;
                this.dollsBtns[1].active = false;
                this.dollsBtns[2].active = true;
                this.dollsBtns[4].active = false;//分享按钮
                this.dollsName.spriteFrame = this.beginAtlas.getSpriteFrame(this.shopDollIdx + "Name");
            } break;
        }
        for (var i = 0; i < this.dollsPick.length; i = i + 1) {
            var dis = this.dollsPick[i].x - Math.abs(this.dollsMain.x);
            if (dis <= 300 && dis >= 0) {
                this.dollsPick[i].scale = cc.v2(1 + 0.2 * (300 - dis) / 300, 1 + 0.2 * (300 - dis) / 300);
            } else {
                this.dollsPick[i].scale = cc.v2(0.8, 0.8);
            }
        }
        this.isSelect = false;
    },

    useDType() {
        if (this.myDollIdx != this.shopDollIdx) {
            this.myDollIdx = this.shopDollIdx;
        }
    },

    touchGuide(isShow) {
        if (isShow) {
            this.guideFinger.node.active = true;
            let Point1 = cc.callFunc(() => {
                this.guideFinger.spriteFrame = this.spriteAtlas.getSpriteFrame("finger_1");
            }, this);
            let Point2 = cc.callFunc(() => {
                this.guideFinger.spriteFrame = this.spriteAtlas.getSpriteFrame("finger_3");
            }, this);
            let Point3 = cc.callFunc(() => {
                this.guideFinger.spriteFrame = this.spriteAtlas.getSpriteFrame("finger_2");
            }, this);
            this.guideFinger.node.runAction(cc.repeatForever(cc.sequence(Point1, cc.delayTime(0.2), Point2, cc.delayTime(0.2), Point1, cc.delayTime(0.2), Point3, cc.delayTime(0.2))));
        } else {
            this.guideFinger.node.active = false;
            this.guideFinger.node.stopAllActions();
        }
    },

    menuClick(event, type) {
        if (this.isChangingView) {
            return;
        }
        this.moveProgress = false;
        //商店界面
        if (type == "Buy") {
            //购买角色
            if (this.playerDetail[2] >= dollsCost[this.shopDollIdx]) {
                //更新钻石
                this.playerDetail[2] = this.playerDetail[2] - dollsCost[this.shopDollIdx];
                this.topNums[2].string = this.playerDetail[2];
                SDK().setItem({ 2: this.playerDetail[2] }, null);

                //更新玩偶数组
                this.playerDetail[3][this.shopDollIdx] = 2;
                var setup = "";
                for (var i = 0; i < this.dollsPick.length; i = i + 1) {
                    setup = setup + this.playerDetail[3][i];
                }
                SDK().setItem({ 3: parseInt(setup) });
                this.dollsBtns[1].active = false;
                this.dollsBtns[2].active = true;
                this.useDType();
            } else {
                this.viewManager.showView(this.gameApplication.diamondView, 0.3, true, false);
            }
        } else if (type == "Go") {
            //选择角色
            this.useDType();
            this.topBars[0].active = true;
            this.topBars[1].active = true;
            this.status = 10;
            this.viewManager.showView(this.gameApplication.modelView, 0.3, true);
        } else if (type == "ShareGet") {
            //分享获得角色
            SDK().share(this.topNums[1].string, function (isCompleted) {
                if (isCompleted) {//分享激励
                    this.playerDetail[3][5] = 2;
                    var setup = "";
                    for (var i = 0; i < this.dollsPick.length; i = i + 1) {
                        setup = setup + this.playerDetail[3][i];
                    }
                    SDK().setItem({ 3: parseInt(setup) });
                    this.dollsBtns[4].active = false;
                    this.dollsBtns[2].active = true;
                } else {
                    this.fbFail(2);
                }
            }.bind(this));
        }
        //商店界面的弹窗获取钻石
        else if (type == "GetDiamond") {
            SDK().showVideoAd(
                function (isCompleted) {
                    if (null == isCompleted) {
                        console.log("没有观看成功")
                    } else if (isCompleted) {
                        if (this.rewardDoubleObj[1] == null) {
                            this.rewardDoubleObj[1] = cc.instantiate(this.floor_prefab);
                            this.rewardDoubleObj[1].parent = this.gameApplication.uiSpriteView;
                            this.rewardDoubleObj[1].getComponent(cc.Sprite).spriteFrame = this.commonAtlas.getSpriteFrame("redDiamond");
                            this.rewardDoubleObj[1].active = false;
                        }
                        this.rewardDoubleObj[1].active = true;
                        this.rewardDoubleObj[1].position = cc.v2(0, 0);
                        this.rewardDoubleObj[1].runAction(cc.sequence(
                            cc.scaleTo(0.5, 2),
                            cc.scaleTo(0.5, 0),
                        ));
                        this.rewardDoubleObj[1].runAction(cc.sequence(
                            cc.delayTime(0.5),
                            cc.moveTo(0.5, this.topBars[2].position),
                            cc.callFunc(function () {
                                this.gameApplication.soundManager.playSound("reward");
                                this.playerDetail[2] = this.playerDetail[2] + 20;
                                this.topNums[2].string = this.playerDetail[2];
                                SDK().setItem({ 2: this.playerDetail[2] }, null);
                            }.bind(this), this)
                        ));
                        this.viewManager.showView(this.gameApplication.diamondView, 0.3, false, false);
                    } else {
                        this.fbFail(1);
                        //this.viewManager.showView(this.gameApplication.diamondView, 0.3, false);
                    }
                }.bind(this)
            );
        } else if (type == "NoGetDaimond") {
            this.viewManager.showView(this.gameApplication.diamondView, 0.3, false, false);
        }
        //死亡复活页面
        else if (type == "Revive") {
            //复活
            SDK().showVideoAd(
                function (isCompleted) {
                    if (null == isCompleted) {
                        console.log("没有观看成功")
                    } else if (isCompleted) {
                        this.isReviveCount = false;
                        //显示复活界面
                        this.isRevived = true;
                        if (this.safeBottom != null) {
                            this.lastPosY = this.safeBottom.y + 9;
                            //this.floor.runAction(cc.moveBy(0.5, cc.v2(0, this.deadPosY - this.lastPosY)));
                            this.floor.runAction(cc.sequence(
                                cc.moveBy(0.5, cc.v2(0, this.deadPosY - this.lastPosY)),
                                cc.callFunc(function () {
                                    this.starGame(3);
                                }.bind(this), this)
                            ));
                        }
                        this.starGame(3);
                        this.viewManager.showView(this.gameApplication.reviveView, 0.3, false);
                        this.myDoll.stopAllActions();
                        this.myDoll.position = cc.v2(0, this.lastPosY);
                    } else {
                        this.fbFail(1);
                    }
                }.bind(this)
            );
        } else if (type == "NoRevive") {
            this.isReviveCount = false;
            this.initOverData();
            //显示结束页面
            this.viewManager.showView(this.gameApplication.overView, 0.3, true, true, 1.5);
            this.playTimes++;
        }
        //模式选择页面
        else if (type == "NormalGo") {
            if (this.status == 10) {
                if (this.playerDetail[0] >= normalCost) {
                    this.starGame(1);
                } else {
                    if (SDK().hasVideoAd()) {
                        this.viewManager.showView(this.gameApplication.heartView, 0.3, true, false);
                    } else {
                        this.viewManager.showView(this.gameApplication.shareHeartView, 0.3, true, false);
                    }
                }

            }
        }
        else if (type == "FlashGo") {
            if (this.status == 10) {
                if (this.myUnLockModel == 0) {
                    SDK().showVideoAd(
                        function (isCompleted) {
                            if (null == isCompleted) {
                                console.log("没有观看成功")
                            } else if (isCompleted) {
                                this.myUnLockModel = 1;
                                SDK().setItem({ 4: 1 }, null);
                                this.unLockSprite[0].active = true;
                                this.unLockSprite[1].active = true;
                                this.LockSprite[0].active = false;
                                this.LockSprite[1].active = false;
                            } else {
                                this.fbFail(1);
                            }
                        }.bind(this)
                    );
                    return;
                }
                if (this.playerDetail[0] >= flashCost) {
                    this.starGame(2);
                } else {
                    if (SDK().hasVideoAd()) {
                        this.viewManager.showView(this.gameApplication.heartView, 0.3, true, false);
                    } else {
                        this.viewManager.showView(this.gameApplication.shareHeartView, 0.3, true, false);
                    }
                }
            }
        }
        //体力不足购买界面
        else if (type == "GetShareHeart") {
            //分享获得体力
            SDK().share(this.topNums[1].string, function (isCompleted) {
                if (isCompleted) {
                    if (this.rewardDoubleObj[0] == null) {
                        this.rewardDoubleObj[0] = cc.instantiate(this.floor_prefab);
                        this.rewardDoubleObj[0].parent = this.gameApplication.uiSpriteView;
                        this.rewardDoubleObj[0].getComponent(cc.Sprite).spriteFrame = this.commonAtlas.getSpriteFrame("redHeart");
                        this.rewardDoubleObj[0].active = false;
                    }
                    this.rewardDoubleObj[0].active = true;
                    this.rewardDoubleObj[0].position = cc.v2(0, 0);
                    this.rewardDoubleObj[0].runAction(cc.sequence(
                        cc.scaleTo(0.5, 2),
                        cc.scaleTo(0.5, 0),
                    ));
                    this.rewardDoubleObj[0].runAction(cc.sequence(
                        cc.delayTime(0.5),
                        cc.moveTo(0.5, this.topBars[0].position),
                        cc.callFunc(function () {
                            this.gameApplication.soundManager.playSound("reward");
                            this.playerDetail[0] = this.playerDetail[0] + 15;
                            this.topNums[0].string = this.playerDetail[0];
                            SDK().setItem({ 0: this.playerDetail[0] }, null);
                        }.bind(this), this)
                    ));
                    this.viewManager.showView(this.gameApplication.shareHeartView, 0.3, false);
                } else {
                    this.fbFail(2);
                    //this.viewManager.showView(this.gameApplication.shareHeartView, 0.3, false);
                }
            }.bind(this));
        }
        else if(type == "NoGetShareHeart"){
            this.viewManager.showView(this.gameApplication.shareHeartView, 0.3, false);
        }
        else if (type == "GetHeart") {
            SDK().showVideoAd(
                function (isCompleted) {
                    if (null == isCompleted) {
                        console.log("没有观看成功")
                    } else if (isCompleted) {
                        if (this.rewardDoubleObj[0] == null) {
                            this.rewardDoubleObj[0] = cc.instantiate(this.floor_prefab);
                            this.rewardDoubleObj[0].parent = this.gameApplication.uiSpriteView;
                            this.rewardDoubleObj[0].getComponent(cc.Sprite).spriteFrame = this.commonAtlas.getSpriteFrame("redHeart");
                            this.rewardDoubleObj[0].active = false;
                        }
                        this.rewardDoubleObj[0].active = true;
                        this.rewardDoubleObj[0].position = cc.v2(0, 0);
                        this.rewardDoubleObj[0].runAction(cc.sequence(
                            cc.scaleTo(0.5, 2),
                            cc.scaleTo(0.5, 0),
                        ));
                        this.rewardDoubleObj[0].runAction(cc.sequence(
                            cc.delayTime(0.5),
                            cc.moveTo(0.5, this.topBars[0].position),
                            cc.callFunc(function () {
                                this.gameApplication.soundManager.playSound("reward");
                                this.playerDetail[0] = this.playerDetail[0] + 15;
                                this.topNums[0].string = this.playerDetail[0];
                                SDK().setItem({ 0: this.playerDetail[0] }, null);
                            }.bind(this), this)
                        ));
                        this.viewManager.showView(this.gameApplication.heartView, 0.3, false);
                    } else {
                        this.fbFail(1);
                        //this.viewManager.showView(this.gameApplication.heartView, 0.3, false);
                    }
                }.bind(this)
            );
        } else if (type == "NoGetHeart") {
            this.viewManager.showView(this.gameApplication.heartView, 0.3, false);
        }
        //开始界面
        else if (type == "BuyDiamond") {
            this.viewManager.showView(this.gameApplication.diamondView, 0.3, true, false);
        }
        else if (type == "BuyHeart") {
            if (this.status == 1) {
                return;
            }
            if (SDK().hasVideoAd()) {
                this.viewManager.showView(this.gameApplication.heartView, 0.3, true, false);
            } else {
                this.viewManager.showView(this.gameApplication.shareHeartView, 0.3, true, false);
            }
        }
        else if (type == "Role") {
            this.topBars[0].active = false;
            this.topBars[1].active = false;
            this.viewManager.showView(this.gameApplication.dollsView, 0.3, true);
            this.dTypeChange();
        }
        else if (type == "Begin") {
            this.viewManager.showView(this.gameApplication.modelView, 0.3, true);
        }
        else if (type == "Mute") {
            var onFrame = this.beginAtlas.getSpriteFrame("musicOn");
            var offFrame = this.beginAtlas.getSpriteFrame("musicOff");
            if (this.muteBtn.spriteFrame == offFrame) {
                this.gameApplication.soundManager.setIsOpen(true);
                this.muteBtn.spriteFrame = onFrame;
            } else if (this.muteBtn.spriteFrame == onFrame) {
                this.gameApplication.soundManager.setIsOpen(false);
                this.muteBtn.spriteFrame = offFrame;
            }
        }
        //结束界面
        else if (type == "Replay") {
            if (this.playerDetail[0] >= normalCost) {
                this.replayGame(this.gameModel);
            } else {
                if (SDK().hasVideoAd()) {
                    this.viewManager.showView(this.gameApplication.heartView, 0.3, true, false);
                } else {
                    this.viewManager.showView(this.gameApplication.shareHeartView, 0.3, true, false);
                }
            }
        } else if (type == "BackHome") {
            this.LoadGame();
            this.topBars[0].active = true;
            this.topBars[1].active = true;
            this.viewManager.showView(this.gameApplication.beginView, 0.3, true);
        } else if (type == "DoubleUpVideo") {
            SDK().showVideoAd(
                function (isCompleted) {
                    if (null == isCompleted) {
                        console.log("没有观看成功")
                    } else if (isCompleted) {//观看视频激励
                        this.DoubleUpAnim();
                    } else {
                        this.fbFail(1);
                    }
                }.bind(this)
            );
        } else if (type == "DoubleUpShare") {
            SDK().share(this.topNums[1].string, function (isCompleted) {
                if (isCompleted) {//分享激励
                    this.DoubleUpAnim();
                } else {
                    this.fbFail(2);
                }
            }.bind(this));
        } else if (type == "CloseCurView") {
            this.viewManager.CloseCurView();
        }
    },

    fbFail(type) {
        if (type == 1) {
            this.fbFailTitel[0].active = true;
            this.fbFailTitel[1].active = false;
            this.viewManager.showView(this.gameApplication.fbFailView, 0.3, true, false);
        } else {
            this.fbFailTitel[0].active = false;
            this.fbFailTitel[1].active = true;
            this.viewManager.showView(this.gameApplication.fbFailView, 0.3, true, false);
        }
    },


    //观看视频双倍奖励
    DoubleUpAnim() {
        if (this.rewardDoubleObj[0] == null || this.rewardDoubleObj[1] == null) {
            if (this.playerDetail[6] > 0) {
                this.rewardDoubleObj[0] = cc.instantiate(this.floor_prefab);
                this.rewardDoubleObj[0].parent = this.gameApplication.overView;
                this.rewardDoubleObj[0].getComponent(cc.Sprite).spriteFrame = this.commonAtlas.getSpriteFrame("redHeart");
                this.rewardDoubleObj[0].active = false;
            }
            if (this.playerDetail[7] > 0) {
                this.rewardDoubleObj[1] = cc.instantiate(this.floor_prefab);
                this.rewardDoubleObj[1].parent = this.gameApplication.overView;
                this.rewardDoubleObj[1].getComponent(cc.Sprite).spriteFrame = this.commonAtlas.getSpriteFrame("redDiamond");
                this.rewardDoubleObj[1].active = false;
            }
        }
        this.vidioBtn[3].getComponent(cc.Button).interactable = false;
        this.vidioBtn[4].getComponent(cc.Button).interactable = false;
        this.gameApplication.soundManager.playSound("reward");
        if (this.playerDetail[6] > 0) {
            this.rewardDoubleObj[0].active = true;
            this.rewardDoubleObj[0].position = cc.v2(-200, -200);
            this.rewardDoubleObj[0].runAction(cc.sequence(
                cc.scaleTo(0.5, 2),
                cc.scaleTo(0.5, 0),
                cc.callFunc(function () {
                    this.rewardDoubleObj[0].active = false;
                    this.playerDetail[0] = this.playerDetail[0] + this.playerDetail[6];
                    this.topNums[0].string = this.playerDetail[0];
                    SDK().setItem({ 0: this.playerDetail[0] }, null);//同步体力数量
                }.bind(this), this)
            ));
            this.rewardDoubleObj[0].runAction(cc.sequence(
                cc.delayTime(0.5),
                cc.moveTo(0.5, this.topBars[0].position),
            ));
        }
        if (this.playerDetail[7] > 0) {
            this.rewardDoubleObj[1].active = true;
            this.rewardDoubleObj[1].position = cc.v2(200, -200);
            this.rewardDoubleObj[1].runAction(cc.sequence(
                cc.scaleTo(0.5, 2),
                cc.scaleTo(0.5, 0),
                cc.callFunc(function () {
                    this.rewardDoubleObj[1].active = false;
                    this.playerDetail[2] = this.playerDetail[2] + this.playerDetail[7];
                    this.topNums[2].string = this.playerDetail[2];
                    SDK().setItem({ 2: this.playerDetail[2] }, null);//同步钻石数量
                }.bind(this), this)
            ));
            this.rewardDoubleObj[1].runAction(cc.sequence(
                cc.delayTime(0.5),
                cc.moveTo(0.5, this.topBars[2].position),
            ));
        }
    },

    //加载地图
    LoadGame() {
        this.myDollAnim.reSet();
        this.status = 10;
        this.myStatus = 0;
        this.isRevived = false;
        this.gameModel = 0;
        this.curWidth = 500;
        this.topNums[3].string = 0;
        this.topNums[3].node.active = false;
        this.bgColorChange(0);
        RewardInterval = 0;
        curListIdx = 0;
        flashVal = 130;
        moveVal = 300;
        this.mapLimit[0] = 0;
        this.mapLimit[1] = 0;
        for (var i = 0; i < 21; i = i + 1) {
            this.roadPainting(i);
        }
        this.myDoll.y = 9;
        this.lastPosY = 9;
        this.myDoll.position = cc.v2(0, this.lastPosY);
        this.floor.y = this.lastPosY - 9;
        this.playerDetail[6] = 0;
        this.playerDetail[7] = 0;
        this.myDoll.active = true;
    },

    //开始游戏
    starGame(model) {
        if (model != 3) {
            this.gameModel = model;
            var pos;//要飞向的按钮位置
            //点击任意开始游戏时将开始游戏的按钮设为不能点击
            if (this.gameApplication.modelView.active) {
                if (model == 1) {
                    pos = this.doubleUpStyleBtn[5].position;
                } else {
                    pos = this.doubleUpStyleBtn[6].position;
                }
                this.doubleUpStyleBtn[5].getComponent(cc.Button).interactable = false;
                this.doubleUpStyleBtn[6].getComponent(cc.Button).interactable = false;
            } else if (this.gameApplication.overView.active) {
                pos = cc.v2(190, -300);
                this.doubleUpStyleBtn[4].getComponent(cc.Button).interactable = false;
            }
            //生成体力图标
            if (this.rewardDoubleObj[2] == null) {
                this.rewardDoubleObj[2] = cc.instantiate(this.floor_prefab);
                var sp = this.rewardDoubleObj[2].getComponent(cc.Sprite);
                sp.spriteFrame = this.commonAtlas.getSpriteFrame("redHeart");
                this.rewardDoubleObj[2].parent = this.gameApplication.uiSpriteView
            }
            this.rewardDoubleObj[2].position = this.topBars[0].position;
            this.rewardDoubleObj[2].scale = 1;
            this.rewardDoubleObj[2].active = true;
            //飞向按钮位置
            this.rewardDoubleObj[2].runAction(cc.sequence(
                cc.scaleTo(0.1, 1.2),
                cc.scaleTo(0.3, 0.2),
            ));
            this.rewardDoubleObj[2].runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.moveTo(0.3, pos),
                cc.callFunc(function () {
                    this.rewardDoubleObj[2].active = false;
                    if (this.gameApplication.modelView.active) {
                        this.viewManager.showView(this.gameApplication.modelView, 0.3, false);
                    } else if (this.gameApplication.overView.active) {
                        this.viewManager.showView(this.gameApplication.overView, 0.3, false);
                    }
                    if (this.gameModel == 1) {
                        if (this.playerDetail[0] >= normalCost) {
                            this.playerDetail[0] = this.playerDetail[0] - normalCost;
                        } else {
                            if (SDK().hasVideoAd()) {
                                this.viewManager.showView(this.gameApplication.heartView, 0.3, true, false);
                            } else {
                                this.viewManager.showView(this.gameApplication.shareHeartView, 0.3, true, false);
                            }
                            return;
                        }
                    } else if (this.gameModel == 2) {
                        if (this.playerDetail[0] >= flashCost) {
                            this.playerDetail[0] = this.playerDetail[0] - flashCost;
                        } else {
                            if (SDK().hasVideoAd()) {
                                this.viewManager.showView(this.gameApplication.heartView, 0.3, true, false);
                            } else {
                                this.viewManager.showView(this.gameApplication.shareHeartView, 0.3, true, false);
                            }
                            return;
                        }
                    }
                    this.topNums[0].string = this.playerDetail[0];
                    this.topNums[3].node.active = true;
                    SDK().setItem({ 0: this.playerDetail[0] }, null);//同步体力数量
                    this.status = 1;
                    this.myStatus = 1;
                    this.myDollAnim.playRun(this.myDollIdx, null);
                    this.myDoll.rotation = 0;
                }.bind(this), this),
            ));
        } else {
            this.topNums[0].string = this.playerDetail[0];
            this.topNums[3].node.active = true;
            SDK().setItem({ 0: this.playerDetail[0] }, null);//同步体力数量
            this.status = 1;
            this.myStatus = 1;
            this.myDollAnim.playRun(this.myDollIdx, null);
            this.myDoll.rotation = 0;
        }
        /* if (this.gameModel == 1) {
            if (this.playerDetail[0] >= normalCost) {
                this.playerDetail[0] = this.playerDetail[0] - normalCost;
            } else {
                this.viewManager.showView(this.gameApplication.heartView, 0.3, true, false);
                return;
            }
        } else if (this.gameModel == 2) {
            if (this.playerDetail[0] >= flashCost) {
                this.playerDetail[0] = this.playerDetail[0] - flashCost;
            } else {
                this.viewManager.showView(this.gameApplication.heartView, 0.3, true, false);
                return;
            }
        } else {
            cc.log(this.gameModel);
        } 
        RewardInterval = 0;
        this.topNums[0].string = this.playerDetail[0];
        this.topNums[3].node.active = true;
        SDK().setItem({ 0: this.playerDetail[0] }, null);//同步体力数量
        this.status = 1;
        this.myStatus = 1;
        this.myDollAnim.playRun(this.myDollIdx, null);
        this.myDoll.rotation = 0;*/
    },

    //死亡动画
    deadAnim() {
        this.deadPosY = this.myDoll.y;
        this.topNums[3].node.active = false;
        //记录最高分数
        var score = parseInt(this.topNums[3].string) + 1;
        var highest = parseInt(this.topNums[1].string);

        //保存最高分数
        if (score >= highest) {
            SDK().setItem({ 1: score });
        }

        //保存累计楼层
        SDK().setItem({ 5: this.playerDetail[5] });
        if (this.myDollIdx != 1) {
            this.gameApplication.soundManager.playSound("dead");
        } else {
            this.gameApplication.soundManager.playSound("girlDead");
        }

        this.myDoll.runAction(cc.moveBy(1, cc.v2(this.myDoll.scaleX * 50, 0)))
        this.myDollAnim.playDead(this.myDollIdx, null);
        //显示结束页面
        if (this.isRevived) {
            this.initOverData();
            this.viewManager.showView(this.gameApplication.overView, 0.3, true, true, 1.5);
        } else {
            this.reviveTime.string = "05";
            this.reviveTimeVal = 5.1;
            this.viewManager.showView(this.gameApplication.reviveView, 0.3, true, true, 0, function () {
                this.isReviveCount = true;
            }.bind(this));
        }
    },

    //加载结束界面的数据
    initOverData() {
        var doubleUpType = cc.random0To1() < 0.5;
        if (doubleUpType) {
            this.doubleUpStyleBtn[0].active = true;
            this.doubleUpStyleBtn[1].active = false;
        } else {
            this.doubleUpStyleBtn[0].active = false;
            this.doubleUpStyleBtn[1].active = true;
        }
        //0-分数 1-最高分数 2-等级 3-解锁进度 4-本局获得的的体力 5-本局获得的钻石 6-进度条内的解锁进度
        this.moveProgress = true;
        this.gameApplication.soundManager.playSound("progress");
        this.countVal = 0;
        this.overNums[0].string = this.topNums[3].string;
        this.overNums[1].string = this.topNums[1].string;
        this.overNums[2].string = Math.ceil((this.myCell - 10) / 20);
        this.overNums[3].string = UnLockNeed[CurUnlockIdx];
        this.overNums[4].string = "/" + this.playerDetail[6];
        this.overNums[5].string = "/" + this.playerDetail[7];
    },

    //死亡重玩
    replayGame(model) {
        this.LoadGame();
        this.starGame(model);
    },

    //other.tag:樓梯底部為100 ，左側為11，右側為21.
    CollisionEnter: function (other, self) {
        if (self.tag == -11 && (other.tag == 100 || other.tag == 110)) {
            self.tag = 1;
        }
        if (this.myStatus == 3 || this.myStatus == 0) {
            return;
        }
        //底部碰撞
        if (self.tag == 1) {
            if (other.tag == 11 || other.tag == 21) {
                //防止二次碰撞
                if ((this.myDoll.scaleX < 0 && other.tag == 21) || (this.myDoll.scaleX > 0 && other.tag == 11)) {
                    return;
                }
                this.myDoll.scaleX = -this.myDoll.scaleX;//轉向
                this.myDoll.x = this.myDoll.x + (this.myDoll.scaleX < 0 ? -10 : 10);
            }
            if (other.tag == 100 || other.tag == 110) {
                /* this.scheduleOnce(function () {
                    if (this.myStatus == 2) {
                        this.myStatus = 1;
                        if (this.gameModel == 1 && !this.isBack) {
                            this.playerDetail[5] = this.playerDetail[5] + 1;
                        }
                        this.isBack = false;
                        this.myDoll.y = Math.ceil((this.myDoll.y - 20) / SpaceHeight) * SpaceHeight + 9;
                    }
                }.bind(this), 0.15); */
                if (other.tag == 110) {
                    this.safeBottom = other.node;
                }
            }

        }
        //中部碰撞
        if (self.tag == 2) {
            if (other.tag == 11 || other.tag == 21) {
                //防止二次碰撞
                if ((this.myDoll.scaleX < 0 && other.tag == 21) || (this.myDoll.scaleX > 0 && other.tag == 11)) {
                    return;
                }
                this.myDoll.scaleX = -this.myDoll.scaleX;//轉向
                this.myDoll.x = this.myDoll.x + (this.myDoll.scaleX < 0 ? -10 : 10);
                //跳回去
                this.myDoll.stopAllActions();
                this.myDoll.runAction(
                    cc.sequence(
                        cc.moveBy(0.2, cc.v2(0, this.lastPosY - this.myDoll.y)).easing(cc.easeIn(3)),
                        cc.callFunc(function () {
                            this.myStatus = 1;
                            this.myDollAnim.playRun(this.myDollIdx, null);
                            this.myDoll.y = Math.ceil((this.myDoll.y - 20) / SpaceHeight) * SpaceHeight + 9;
                        }.bind(this), this)
                    )
                );
                if (this.gameModel == 1) {
                    this.floor.runAction(cc.moveBy(0.5, cc.v2(0, SpaceHeight)));
                }
                this.isBack = true;
            }
            else if (other.tag == 3) {//体力
                this.getReward(1, other);
            }
            else if (other.tag == 4) {//钻石
                this.getReward(2, other);
            }
            if (other.tag == 5) {
                this.floor.runAction(cc.moveBy(1, cc.v2(0, -SpaceHeight)));
            }
        }
        if (self.tag == 200) {
            if (other.tag == 110 || other.tag == 100) {
                this.roadPainting(this.myCell + 1);
            }
        }
    },


    CollisionStay: function (other, self) {
        if (self.tag == 1) {
            if (other.tag == 110 || other.tag == 100) {
                this.curFloorBottom = other.node;
            }
        }

    },

    CollisionExit: function (other, self) {
        if (self.tag == 1) {
            if (other.tag == 100 || other.tag == 110) {
                self.tag = -11;
            }
        }
    },

    //获得奖品
    getReward(which, reward) {
        this.gameApplication.soundManager.playSound("reward");
        this.viewManager.GetUIPosition(reward.node, this.floor, this.gameApplication.uiSpriteView);
        if (which == 1) {
            this.topNums[0].node.runAction(cc.sequence(
                cc.delayTime(1),
                cc.scaleTo(0.1, 1.2),
                cc.scaleTo(0.1, 1),
                cc.callFunc(function () {
                    this.playerDetail[0] = this.playerDetail[0] + 1;
                    this.topNums[0].string = this.playerDetail[0];
                    this.playerDetail[6] = this.playerDetail[6] + 1;
                    SDK().setItem({ 0: this.playerDetail[0] }, null);//同步体力数量
                }.bind(this), this)
            ));
            reward.node.runAction(cc.sequence(
                cc.scaleTo(0.5, 2),
                cc.scaleTo(0.5, 1),
                cc.callFunc(function () {
                    reward.node.active = false;
                }.bind(this), this)
            ));
            reward.node.runAction(cc.sequence(
                cc.delayTime(0.5),
                cc.moveTo(0.5, this.topBars[0].position),
            ));
        } else if (which == 2) {
            this.topNums[2].node.runAction(cc.sequence(
                cc.delayTime(1),
                cc.scaleTo(0.1, 1.2),
                cc.scaleTo(0.1, 1),
                cc.callFunc(function () {
                    this.playerDetail[2] = this.playerDetail[2] + 1;
                    this.topNums[2].string = this.playerDetail[2];
                    this.playerDetail[7] = this.playerDetail[7] + 1;
                    SDK().setItem({ 2: this.playerDetail[2] }, null);//同步钻石数量
                }.bind(this), this)
            ));
            reward.node.runAction(cc.sequence(
                cc.scaleTo(0.5, 2),
                cc.scaleTo(0.5, 0.2),
                cc.callFunc(function () {
                    reward.node.active = false;
                }.bind(this), this)
            ));
            reward.node.runAction(cc.sequence(
                cc.delayTime(0.5),
                cc.moveTo(0.5, this.topBars[2].position),
            ));
        }
        reward.tag = -30;
    },


    JumpAction(doll) {
        if (this.status == 0) {
            return;
        }
        if (doll == this.myDoll) {
            if (this.myStatus == 2) {
                return;
            }
            this.myStatus = 2
            if (this.gameModel == 1) {
                this.floor.runAction(cc.moveBy(0.5, cc.v2(0, -SpaceHeight)));
            }
        }
        this.lastPosY = this.myDoll.y;
        var score = parseInt(this.topNums[3].string) + 1;
        this.topNums[3].string = score;
        var highest = parseInt(this.topNums[1].string);
        if (score > highest) {
            this.topNums[1].node.runAction(
                cc.sequence(
                    cc.scaleTo(0, 1.2),
                    cc.callFunc(function () {
                        this.topNums[1].string = score;
                        SDK().setItem({ 5: score })
                    }.bind(this), this),
                    cc.scaleTo(0.1, 1))
            )
        }
        this.gameApplication.soundManager.playSound("jump");
        this.myDollAnim.playJump(this.myDollIdx, null);
        doll.runAction(cc.sequence(
            cc.moveBy(0.25, cc.v2(0, SpaceHeight + 40)).easing(cc.easeOut(3)),
            cc.moveBy(0.15, cc.v2(0, -40)).easing(cc.easeIn(3)),
            cc.callFunc(function () {
                if (this.myStatus != 3) {
                    this.myDollAnim.playRun(this.myDollIdx, null);
                    if (this.myStatus == 2) {
                        this.myStatus = 1;
                        if (!this.isBack) {
                            this.playerDetail[5] = this.playerDetail[5] + 1;
                        }
                        this.isBack = false;
                        this.myDoll.y = Math.ceil((this.myDoll.y - 20) / SpaceHeight) * SpaceHeight + 9;
                    }
                }
            }.bind(this), this)
        )
        );
    },


    bgColorChange(idx) {
        if (this.bg1.node.active == false) {
            this.bg1.fillStart = 1;
            this.bg1.node.active = true;
            this.bg0.spriteFrame = this.bg2.spriteFrame;
            this.bg2.node.active = false;
            this.bgStatus = 1;
            this.bg1.spriteFrame = this.commonAtlas.getSpriteFrame("bg_" + idx);
        } else if (this.bg2.node.active == false) {
            this.bg2.fillStart = 1;
            this.bg2.node.active = true;
            this.bg0.spriteFrame = this.bg1.spriteFrame;
            this.bg1.node.active = false;
            this.bgStatus = 2;
            this.bg2.spriteFrame = this.commonAtlas.getSpriteFrame("bg_" + idx);
        }
    },


    yellowAnim() {
        var idx = Math.ceil(cc.random0To1() * 7);
        this.yellowLable.string = yellowText[idx];
        this.yellowLable.node.active = true;
        this.yellowLable.node.scale = 1;
        this.yellowLable.node.opacity = 255;
        this.yellowLable.node.runAction(
            cc.scaleTo(2, 6),
        );
        this.yellowLable.node.runAction(
            cc.sequence(
                cc.fadeOut(2),
                cc.callFunc(function () {
                    this.yellowLable.node.active = false;
                }.bind(this), this)
            )
        );
    },

    //地图线路绘制
    roadPainting(mission) {
        var temp = (mission - 9) / 20;
        if ((mission - 9) % 20 == 0) {
            if (temp < 8) {
                this.bgColorChange(temp);
                if (temp > 0) {
                    this.yellowAnim();
                }
                moveVal = moveVal * 1.1;
                flashVal = flashVal * 1.1;
            } else {
                this.bgColorChange(7);
            }
        }
        var info = {};
        var lastIdx = (curListIdx - 1) == -1 ? 25 : (curListIdx - 1);
        if (curListIdx == 0) {
            info.left = 1;
            info.right = 1;
            this.mapLimit[0] = 0;
            this.mapLimit[1] = 0;
        } else if (this.floorNodes[lastIdx].left.active == false && this.floorNodes[lastIdx].right.active == false) {
            info.left = 1
            info.right = 1;
            this.mapLimit[0] = 0;
            this.mapLimit[1] = 0;
        } else if (this.floorNodes[lastIdx].left.active == false || this.floorNodes[lastIdx].right.active == false) {
            if (this.floorNodes[lastIdx].left.active == false) {
                var fix = cc.random0To1() * 100;
                if (fix < 60) {
                    info.left = 0;
                    info.right = 1;
                } else if (fix > 60 && fix < 80) {
                    info.left = 1;
                    info.right = 0;
                } else if (fix > 80 && fix < 90) {
                    info.left = 0;
                    info.right = 0;
                } else {
                    info.left = 1;
                    info.right = 1;
                }
                if (info.left == 1) {
                    this.mapLimit[0] = 0;
                } else {
                    this.mapLimit[0] = this.mapLimit[0] + 1;
                    if (this.mapLimit[0] >= 4) {
                        info.left = 1;
                    }
                }
                if (info.right == 1) {
                    this.mapLimit[1] = 0;
                } else {
                    this.mapLimit[1] = this.mapLimit[1] + 1;
                    if (this.mapLimit[1] >= 4) {
                        info.right = 1;
                    }
                }
            }
            if (this.floorNodes[lastIdx].right.active == false) {
                var fix = cc.random0To1() * 100;
                if (fix < 60) {
                    info.left = 1;
                    info.right = 0;
                } else if (fix > 60 && fix < 80) {
                    info.left = 0;
                    info.right = 1;
                } else if (fix > 80 && fix < 90) {
                    info.left = 0;
                    info.right = 0;
                } else {
                    info.left = 1;
                    info.right = 1;
                }
                if (info.left == 1) {
                    this.mapLimit[0] = 0;
                } else {
                    this.mapLimit[0] = this.mapLimit[0] + 1;
                    if (this.mapLimit[0] >= 4) {
                        info.left = 1;
                    }
                }
                if (info.right == 1) {
                    this.mapLimit[1] = 0;
                } else {
                    this.mapLimit[1] = this.mapLimit[1] + 1;
                    if (this.mapLimit[1] >= 4) {
                        info.right = 1;
                    }
                }
            }
        } else {
            var fix = cc.random0To1() * 100;
            if (fix < 15) {
                info.left = 0;
                info.right = 0;
            } else if (fix > 15 && fix < 85) {
                info.left = (cc.random0To1() * 100) < 50 ? 0 : 1;
                if (info.left == 0) {
                    info.right = 1;
                } else {
                    info.right = 0;
                }
            } else {
                info.left = 1;
                info.right = 1;
            }
            if (info.left == 1) {
                this.mapLimit[0] = 0;
            } else if (info.left == 0) {
                this.mapLimit[0] = this.mapLimit[0] + 1;
                if (this.mapLimit[0] >= 4) {
                    info.left = 1;
                }
            }
            if (info.right == 1) {
                this.mapLimit[1] = 0;
            } else {
                this.mapLimit[1] = this.mapLimit[1] + 1;
                if (this.mapLimit[1] >= 4) {
                    info.right = 1;
                }
            }
        }

        if (mission == 120) {
            this.curWidth = this.curWidth - 100;
        }
        info.width = this.curWidth;
        info.mission = mission;
        this.produceLinePart(info);
    },

    //生成地图
    produceLinePart(info) {
        var posY = info.mission * SpaceHeight;
        var newFloor = {};
        var newBottom;
        var newLeft;
        var newRight;
        if (this.floorNodes[curListIdx] != null) {
            newBottom = this.floorNodes[curListIdx].bottom;
            newLeft = this.floorNodes[curListIdx].left;
            newRight = this.floorNodes[curListIdx].right;
        } else {
            newBottom = cc.instantiate(this.floor_prefab);
            newBottom.getComponent(cc.Sprite).spriteFrame = this.gameAtlas.getSpriteFrame("floor");
            newLeft = cc.instantiate(this.floor_prefab);
            newLeft.getComponent(cc.Sprite).spriteFrame = this.gameAtlas.getSpriteFrame("floor");
            newRight = cc.instantiate(this.floor_prefab);
            newRight.getComponent(cc.Sprite).spriteFrame = this.gameAtlas.getSpriteFrame("floor");
        }
        //儲存樓梯底部
        newFloor.bottom = newBottom;
        //儲存樓梯左部
        newFloor.left = newLeft;
        //儲存樓梯右部
        newFloor.right = newRight;

        //楼底部
        newBottom.parent = this.floor;

        if (info.mission == 120) {
            newBottom.width = info.width + 100 + WallWidth * 2;
        } else {
            newBottom.width = info.width + WallWidth * 2;
        }
        newBottom.height = WallWidth;
        var box = newBottom.getComponent(cc.BoxCollider);
        if (box == null) {
            box = newBottom.addComponent(cc.BoxCollider);
        }
        box.size.width = newBottom.width;
        box.size.height = newBottom.height;
        box.offset = cc.v2(0, newBottom.height / 2);
        newBottom.anchorY = 0;
        newBottom.y = posY;
        newBottom.x = 0;
        box.tag = 100;
        if (info.left == 1 && info.right == 1) {
            box.tag = 110;
        }

        //安全区
        if (info.mission == 0) {
            this.safeBottom = newBottom;
        }

        //楼左部
        newLeft.parent = this.floor;
        newLeft.width = WallWidth;
        newLeft.height = SpaceHeight;
        var box = newLeft.getComponent(cc.BoxCollider);
        if (box == null) {
            box = newLeft.addComponent(cc.BoxCollider);
        }
        box.size.width = newLeft.width;
        box.size.height = newLeft.height / 2;
        box.offset = cc.v2(newLeft.width / -2, newLeft.height / 4);
        box.tag = 11;
        newLeft.anchorX = 1;
        newLeft.anchorY = 0;
        newLeft.x = info.width / -2;
        newLeft.y = posY;

        if (info.left != 1) {
            newLeft.active = false;
            box.tag = 10;
        } else if (info.left == 1) {
            newLeft.active = true;
            box.tag = 11;
        }


        //楼右部
        newRight.parent = this.floor;
        newRight.width = WallWidth;
        newRight.height = SpaceHeight;
        var box = newRight.getComponent(cc.BoxCollider);
        if (box == null) {
            box = newRight.addComponent(cc.BoxCollider);
        }
        box.size.width = newRight.width;
        box.size.height = newRight.height / 2;
        box.offset = cc.v2(newRight.width / 2, newRight.height / 4);
        box.tag = 21;
        newRight.anchorX = 0;
        newRight.anchorY = 0;
        newRight.x = info.width / 2;
        newRight.y = posY;

        if (info.right != 1) {
            newRight.active = false;
            box.tag = 20;
        } else if (info.right == 1) {
            box.tag = 21;
            newRight.active = true;
        }

        this.floorNodes[curListIdx] = newFloor;
        curListIdx = curListIdx + 1;

        //道具处理
        if (RewardInterval == 0) {
            RewardInterval = 12;
            var reward;
            var box;
            if (this.rewardNodes == null) {
                reward = cc.instantiate(this.floor_prefab);
                box = reward.addComponent(cc.BoxCollider);
                this.rewardNodes = reward;
            } else {
                reward = this.rewardNodes;
                box = reward.getComponent(cc.BoxCollider);
            }
            reward.parent = this.floor;
            var which = (cc.random0To1() * 100) > 90 ? 1 : 0;
            if (which == 1) {
                var sp = reward.getComponent(cc.Sprite);
                sp.spriteFrame = this.commonAtlas.getSpriteFrame("redHeart");
                box.tag = 3;
            } else {
                var sp = reward.getComponent(cc.Sprite);
                sp.spriteFrame = this.commonAtlas.getSpriteFrame("redDiamond");
                box.tag = 4;
            }
            reward.scale = 1;
            box.size.width = reward.width;
            box.size.height = reward.height;
            reward.y = posY + 40;
            reward.x = cc.randomMinus1To1() * this.curWidth / 2;
            reward.active = true;
        } else {
            RewardInterval = RewardInterval - 1;
        }

        if (curListIdx == 26) {
            curListIdx = 0;
        }

        this.myCell = info.mission;
    },



    start() {
        this.LoadGame();
        for (var i = 0; i < this.vidioBtn.length; i = i + 1) {
            this.vidioBtn[i].runAction(cc.repeatForever(
                cc.sequence(
                    cc.rotateTo(0.2, -3),
                    cc.rotateTo(0.4, 3),
                    cc.rotateTo(0.4, -3),
                    cc.rotateTo(0.2, 0),
                    cc.delayTime(1),
                )
            ));
        }
    },

    update(dt) {
        if (null != this.moveProgress && this.moveProgress) {
            //解锁完成
            if (CurUnlockIdx > 5) {
                this.playerDetail[5] = 0;
                SDK().setItem({ 5: this.playerDetail[5] });
                this.overNums[6].string = "";
                this.unLockProgress.progress = 1;
                this.countVal = this.countVal + this.playerDetail[5] * (dt / 1.5);
            }
            //解锁角色的处理以及解锁进度的处理
            else if (this.countVal < this.playerDetail[5]) {
                this.overNums[3].string = UnLockNeed[CurUnlockIdx];
                this.countVal = this.countVal + this.playerDetail[5] * (dt / 1.5);
                if (this.countVal > UnLockNeed[CurUnlockIdx]) {
                    this.countVal = this.countVal - UnLockNeed[CurUnlockIdx];
                    //解锁对应的角色并保存
                    this.playerDetail[3][CurUnlockIdx] = 1;
                    var setup = "";
                    for (var i = 0; i < this.dollsPick.length; i = i + 1) {
                        setup = setup + this.playerDetail[3][i];
                    }
                    SDK().setItem({ 3: parseInt(setup) });

                    //消耗累积楼层并将解锁进度调至下个角色
                    this.playerDetail[5] = this.playerDetail[5] - UnLockNeed[CurUnlockIdx];
                    SDK().setItem({ 5: this.playerDetail[5] });
                    CurUnlockIdx = CurUnlockIdx + 1;
                    this.overNums[3].string = UnLockNeed[CurUnlockIdx];

                    this.topBars[0].active = false;//隐藏上面的道具栏
                    this.topBars[1].active = false;//隐藏上面的道具栏
                    this.dollsPick[CurUnlockIdx - 1].color = cc.color(255, 255, 255);//显示解锁人物的颜色
                    this.dollsMain.x = (CurUnlockIdx - 1) * -300;//跳到解锁了的人物
                    this.dTypeChange();
                    this.LoadGame();
                    this.viewManager.showView(this.gameApplication.dollsView, 0.3, true);
                }
                this.overNums[6].string = Math.ceil(this.countVal) + "/" + UnLockNeed[CurUnlockIdx];
                this.unLockProgress.progress = Math.ceil(this.countVal) / UnLockNeed[CurUnlockIdx];
            } else {
                this.moveProgress = false;
            }
        }
        //复活时间计算
        if (this.isReviveCount) {
            if (this.reviveTimeVal > 0) {
                this.reviveTime.string = "0" + (Math.ceil(this.reviveTimeVal) - 1);
                this.reviveTimeVal = this.reviveTimeVal - dt;
            } else {
                this.isReviveCount = false;
                this.reviveTime.string = "00";
                //显示结束页面
                this.initOverData();
                this.viewManager.showView(this.gameApplication.overView, 0.3, true, true, 1.5);
                this.playTimes++;
            }
        }
        //背景色变换
        if (this.bgStatus != 0) {
            if (this.bgStatus == 1) {
                if (this.bg1.fillStart > 0) {
                    //cc.log(this.bg1.fillStart);
                    this.bg1.fillStart = this.bg1.fillStart - dt;
                } else {
                    this.bg1.fillStart = 0;
                    this.bg2.node.active = false;
                    this.bgStatus = 0;
                }
            } else if (this.bgStatus == 2) {
                if (this.bg2.fillStart > 0) {
                    //cc.log(this.bg2.fillStart);
                    this.bg2.fillStart = this.bg2.fillStart - dt;
                } else {
                    this.bg2.fillStart = 0;
                    this.bg1.node.active = false;
                    this.bgStatus = 0;
                }
            }
        }
        if (this.myStatus == 3) {
            this.status = 0;

        } else if (this.status == 1 && Math.abs(this.myDoll.x) > this.curFloorBottom.width / 2) {//跳跃状态
            this.myStatus = 3
            this.deadAnim();
        }
        //闪电模式处理
        if (this.gameModel == 2 && this.status == 1) {
            //触底
            if ((Math.abs(this.floor.y)) - this.myDoll.y > 568) {
                this.status = 3;
                this.deadAnim();
            }
            //移动
            this.floor.runAction(cc.moveBy(dt, cc.v2(0, -flashVal * dt)));
        }
        if (this.myStatus != 0 && this.status == 1) {
            if (this.myDoll.scaleX > 0) {
                this.myDoll.runAction(cc.moveBy(dt, cc.v2(moveVal * dt, 0)));
            } else {
                this.myDoll.runAction(cc.moveBy(dt, cc.v2(-moveVal * dt, 0)));
            }
        }
        if (this.status == 0 && (Math.abs(this.floor.y)) - this.myDoll.y < 568) {
            this.myDoll.runAction(cc.moveBy(dt, cc.v2(0, -moveVal * dt)));
        }
    },
});


