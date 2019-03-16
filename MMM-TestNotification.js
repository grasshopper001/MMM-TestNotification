


Module.register("MMM-TestNotifications",{
    defaults:{
        //to be used
        showSchedule:false
    },
    start:function(){
        //60s counter
        this.count=0;
        //saved for receiving other notificaiton
        this.info=0;
    },
    
    getDom:function(){
        var wrapper=document.createElement("div");
        return wrapper;
    },
    
    
    
    notificationReceived:function(notification,payload,sender){
        var self=this;
        switch(notification){
            case "DOM_OBJECTS_CREATED":
                this.backToIndex();
                 setInterval(()=>{
                     if(this.count>0){this.count--;}
                     if(this.showSchedule===true){
                         self.shutOtherModule();
                         this.count=60;
                         this.showSchedule=false;
                         this.updateDom();
                     }
                     if(this.count===0){
                         self.backToIndex();
                         this.updateDom();
                     }
                 },1000) 
                  break;
            case "TEST_NOTI":
                 this.info=payload;
                 break;
            case "showSchedule":
                 this.showSchedule=payload;
            default:
                break;
            }
    },
    shutOtherModule:function(){
        MM.getModules().exceptModule(this).enumerate(function(module){
            if(module.name!=="MMM-aliImage"){
                module.hide();
            }
            else{
                module.show();
            }
        })
    }, 
    backToIndex:function(){
        MM.getModules().exceptModule(this).enumerate(function(module){
            if(module.name!=="MMM-aliImage"&&module.name!=="MMM-MQTT"){
                module.show();
            }
            else{
                module.hide();
            }
        })
    }, 
})   
