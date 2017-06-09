/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    //自定义事件监听器
    module.exports=function(){
        var eventList=[];
        return function(name,func){
            //事件处理
            //目前可用事件：total(总金额更新）
            var evt = eventList[name];
            if(typeof func =='function'){
                if(evt){
                    evt.push(func);
                }
                else{
                    eventList[name]=[func];
                }
            }
            else{
                if(evt){
                    for(var i=0,ci;ci=evt[i];i++){
                        ci.call(this,func);
                    }
                }
            }
        }
    }
})