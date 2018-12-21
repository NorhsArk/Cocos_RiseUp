cc.Class({
    extends: cc.Component,

    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
        dead: {
            url: cc.AudioClip,
            default: null
        },
        girlDead: {
            url: cc.AudioClip,
            default: null
        },
        reward: {
            url: cc.AudioClip,
            default: null
        },
        jump: {
            url: cc.AudioClip,
            default: null
        },
        progress: {
            url: cc.AudioClip,
            default: null
        },
        isOpen:true,
        isVoiceOpen:true,
    },

    // LIFE-CYCLE CALLBACKS:

    playSound:function(soundtype)
    {
        if(this.isOpen){
            switch(soundtype){
                case "dead":
                    cc.audioEngine.play(this.dead, false, 1);
                    break;
                case "reward":
                    cc.audioEngine.play(this.reward, false, 1);
                    break;
                case "jump":
                    cc.audioEngine.play(this.jump, false, 1);
                    break;
                case "girlDead":
                    cc.audioEngine.play(this.girlDead, false, 1);
                    break;
                case "progress":
                    cc.audioEngine.play(this.progress, false, 1);
                    break;
            }
        }
    },

    playBg:function()
    {
        if(this.isOpen){
            this.audioSource.play();
        }
    },

    setVoiceIsOpen:function(isOpen){
        this.isVoiceOpen = isOpen;
        if(isOpen){
            try{
                if(str != null){
                    HiboGameJs.enableMic(0)
                }
            }catch(e){
                
            }
        }else{
            try{
                if(str != null){
                    HiboGameJs.enableMic(1)
                }
            }catch(e){
                
            }
        }

    },

    setIsOpen:function(isOpen){
        this.isOpen = isOpen;
        if(this.isOpen){
            this.playBg();
            try{
                if(str != null){
                    HiboGameJs.mute(0)
                }
            }catch(e){
                
            }
            
        }else{
            this.audioSource.pause();
            try{
                if(str != null){
                    HiboGameJs.mute(1)
                }
            }catch(e){
                
            }
        }
    },
});
