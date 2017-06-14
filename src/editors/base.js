/**
 * Created by jun on 2017/6/8.
 */
define(function (require, exports, module) {
    //编辑器base
    var baseEditor=function(){

    }
    baseEditor.inherit=function(fun){
        fun.prototype =$.extend(new baseEditor(),fun.prototype);
    }
    baseEditor.prototype.render=function(model){
        this.viewVue=new Vue({
            data:model,
            methods:this.methods,
            template:this.view
        });
        this.viewVue.$mount();
        //保存编辑器对象到vue对象，方便在绑定的方法里访问编辑器对象
        this.viewVue._editor=this;
        return $(this.viewVue.$el).addClass("preview")[0];
    }
    module.exports = baseEditor;
})