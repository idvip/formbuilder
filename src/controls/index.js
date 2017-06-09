/**
 * Created by jun on 2017/6/8.
 */
define(function(require,exports,module){
    var textInput=require('./c_input');
    var label=require('./c_label');
    var checkboxList=require('./c_checkbox');
    var radioList=require('./c_radio');
    //工具箱生成组件
    var controls={
        //所有可用组件列表
        list:[textInput,label,checkboxList,radioList],
        loadToolsBox:function($panel,bud){
            var $tools = $("<div class='controls'><p class='ctitle'>&nbsp;控件库</p></div>").appendTo($panel);
            var onClick=function(){
                this.builder.addControl(new this());
            }
            controls.list.each(function(){
                //console.log(controls.list.toString());
                this.builder=bud;
                this.on("click",onClick);
                $tools.append(this.preView);
            })
            bud.$tools=$tools;
        }
    }
    module.exports=controls;
})