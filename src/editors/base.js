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
        model._editor=this;
        this.viewVue=new Vue({
            data:model,
            methods:this.methods,
            template:this.view
        });
        this.viewVue.$mount();
        return $(this.viewVue.$el).addClass("preview")[0];
    }
    module.exports = baseEditor;
})