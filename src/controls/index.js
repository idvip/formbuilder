/**
 * Created by jun on 2017/6/8.
 */
define(function(require,exports,module){
    //导入所有可用组件列表
    var list=[
        require('./c_input'),
        require('./c_areaInput'),
        require('./c_label'),
        require('./c_description'),
        require('./c_checkbox'),
        require('./c_radio')
    ];
    //工具箱生成组件
    var controls={
        list:list,
        loadToolsBox:function($panel,bud){
            var $tools = $("<div class='controls'><p class='ctitle'>&nbsp;控件库</p></div>").appendTo($panel);
            var onClick=function(){
                this.builder.addControl(new this());
            }
            list.each(function(){
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