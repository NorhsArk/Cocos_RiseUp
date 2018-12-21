cc.Class({
    extends: cc.Component,

    properties: {
        isPlay: false,
        loop: true,
        sprite: {
            default: null,
            type: cc.Sprite,
        },
        shadow: {
            default: null,
            type: cc.Sprite,
        },
        itemId: {    //缓存目标的id，如果发生变化，重新init
            default: -1,
            type: cc.Integer,
        },
        animCount: {
            default: 0,
            type: cc.Integer,
        },
        sprites: {
            default: [],
            type: [cc.SpriteFrame],
        },
        fps: {
            default: 5,
            type: cc.Integer,
        },
        delta: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        index: {
            default: 0,
            type: cc.Integer,
        },
        wait: {
            default: 0,
            type: cc.Integer,
        },
        waitDelta: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        dollsAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        },
        isInited: false,
        isRotat: true,
        oPoint: {
            default: cc.v2(0, 0),
        },
        callback: {
            default: null,
        },
    },

    /**
     * 播放跑
    */
    playRun(dollId, cb) {
        // cc.log("播放子弹发射炮筒动画");
        this.animCount = 8;//帧动画数量
        this.fps = 10;
        this.wait = 0;
        this.waitDelta = 0;
        this.loop = true;
        this.isRotat = false;

        if (this.isInited && this.itemId == dollId) {
            this.play();
        } else {
            // cc.log("init播放")
            this.itemId = dollId;
            var self = this;
            self.sprites = [];
            for (var i = 7; i >= 0; i = i - 1) {
                var frame = this.dollsAtlas.getSpriteFrame("doll_" + this.itemId + "Run_" + i);
                self.sprites.push(frame);
            }
            self.isInited = true;
            self.play();
        }
    },

    /**
    * 播放跳
    */
    playJump(dollId, cb) {
        this.sprite.spriteFrame = this.sprites[1];
        this.isPlay = false;
    },

    /**
    * 播放死亡
    */
    playDead(dollId, cb) {
        this.sprite.spriteFrame = this.dollsAtlas.getSpriteFrame("doll_"+dollId+"Dead");
        this.isPlay = false;
    },

    play(cb) {
        this.isPlay = true;
        this.node.active = true;

        if (this.shadow != null) {
            this.shadow.node.active = true;
        }

        if (cb != null) {
            this.callback = cb;
        }
    },

    reSet() {

        this.index = 0;
        if (this.sprite != null) {
            this.sprite.spriteFrame = this.sprites[this.index];
        }

        this.isPlay = false;
        this.node.active = false;
        this.node.setRotation(0);

        if (this.shadow != null) {
            this.shadow.node.active = false;
            this.shadow.node.setRotation(0);
        }

        if (this.callback != null) {
            this.callback();
        }
    },

    update(dt) {
        //更新shadow位置
        if (this.shadow != null) {
            var shadow_v2 = this.shadow.node.position;
            var node_v2 = cc.v2(this.node.position.x + 10, this.node.position.y - 10)
            if (shadow_v2 != node_v2) {
                // cc.log("node_v2:",node_v2);
                this.shadow.node.position = node_v2;
            }
        }

        if (this.wait > 0 && this.waitDelta < this.wait) {
            this.waitDelta += dt;
            return;
        }

        if (this.isPlay && this.fps > 0 && this.sprites.length > 0) {

            this.delta += dt;

            var rate = 1 / this.fps;
            if (rate < this.delta) {
                this.delta = rate > 0 ? this.delta - rate : 0;

                this.sprite.spriteFrame = this.sprites[this.index];
                if (this.shadow != null) {
                    this.shadow.spriteFrame = this.sprites[this.index];
                }

                if (this.index + 1 == this.sprites.length) {
                    this.waitDelta = 0;

                    //isLoop
                    if (!this.loop) {
                        this.reSet();
                    }
                }

                this.index = this.index + 1 >= this.sprites.length ? 0 : this.index + 1;
            }
        }
    },
});
