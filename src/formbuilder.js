/**
 * Created by jun on 2017/6/8.
 */
define(function(require,exports,module){
    var controls = require("./controls/index");
    //表单生成组件
    var builder=function(id){
        this.init($(id));
        this.ctrls=[];
    }
    //显示编辑器（点击控件时）
    var onShowEditor=function(){
        var view = null;
        //渲染多编辑器
        if(this.editor instanceof Array){
            view = document.createElement("div");
            var that=this;
            this.editor.each(function(){
                view.appendChild(this.render(that.model));
            });
        }
        else{
            //单编辑器
            view = this.editor.render(this.model);
        }
        this._form.$editor.html('');
        this._form.$editor.append(view);
    }
    builder.prototype.addControl=function(ctrl){
        ctrl._form=this;
        ctrl.on("click",onShowEditor);
        this.ctrls.push(ctrl);
        this.render(ctrl);
    }
    builder.prototype.render=function (ctrl) {
        //渲染表单，如果传递控件对象，则append 否则重新渲染所有控件（刷新）
        if(ctrl){
            this.$content.append(ctrl.view);
        }
        else{
            this.$content.html('');
            var self = this;
            this.ctrls.each(function () {
                self.$content.append(this.view);
            })
        }
    }
    builder.prototype.getData=function(){
        return this.ctrls.select("{key:this.key,data:this.model}");
    }
    builder.prototype.setData=function (data) {
        if(!data){
            return ;
        }
        if(typeof data =='string'){
            data = JSON.parse(data);
        }
        this.ctrls=[];
        var self = this;
        data.each(function () {
            var cont = controls.getByKey(this.key);
            if(cont){
                self.addControl(new cont(this.data));
            }
        });
    }
    builder.prototype.init=function ($dom) {
        var $row=$('<div class="row">').appendTo($dom.addClass("container-fluid"));
        var $toolBox=$('<div class="col-md-3">').appendTo($row);
        this.$content=$('<div class="col-md-6 content"><p  class="ctitle">&nbsp;表单编辑区</p></div>').appendTo($row);
        this.$editor=$('<div class="col-md-3 editor"><p  class="ctitle">&nbsp;属性</p></div>').appendTo($row);
        controls.loadToolsBox($toolBox,this)
    }
    //渲染表单对象
    var form = function (datas) {

    }

    //渲染表单
    builder.render=function(datasOrBuilder){
        if(datasOrBuilder instanceof builder){
            datasOrBuilder=datasOrBuilder.getData();
        }
        return new form();
    }
    module.exports=builder;
})