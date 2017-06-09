/**
 * Created by jun on 2017/6/8.
 */
define(function(require,exports,module){
    var controls = require("./controls/index");
    //表单生成组件
    var builder=function(id){
        this.init($(id));
        this.forms=[];
    }
    builder.prototype.addControl=function(ctrl){
        this.$content.append(ctrl.view);
        var self = this;
        ctrl.on("click",function(){
            var view = this.editor.render(this.model);
            self.$editor.html('');
            self.$editor.append(view);
        })
        this.forms.push(ctrl);
    }
    builder.prototype.getData=function(){
        return this.forms.select("{key:this.key,data:this.model}");
    }
    builder.prototype.init=function ($dom) {
        var $row=$('<div class="row">').appendTo($dom.addClass("container-fluid"));
        var $toolBox=$('<div class="col-md-3">').appendTo($row);
        this.$content=$('<div class="col-md-6 content"><p  class="ctitle">&nbsp;表单编辑区</p></div>').appendTo($row);
        this.$editor=$('<div class="col-md-3 editor"><p  class="ctitle">&nbsp;属性</p></div>').appendTo($row);
        controls.loadToolsBox($toolBox,this)
    }
    module.exports=builder;
})